import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table, Badge, Modal, useToast } from "../components/ui";
import { menuItems as initialMenuItems } from "../data/menu.js";

function MenuListPage() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [itemToDisable, setItemToDisable] = useState(null);
  const { showToast } = useToast();

  const columns = [
    { key: "name", header: "Item" },
    { key: "category", header: "Category" },
    {
      key: "price",
      header: "Price",
      render: (row) => <span>${row.price.toFixed(2)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge color={row.status === "available" ? "green" : "red"}>
          {row.status === "available" ? "Online" : "Hidden"}
        </Badge>
      ),
    },
    {
      key: "popularity",
      header: "Popularity",
      render: (row) => (
        <span className="text-xs text-slate-500">{row.popularity}%</span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <div className="flex justify-end gap-2 text-xs">
          <Link
            to={`/menu/${row.id}`}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand-500 hover:text-brand-600"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => setItemToDisable(row)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 hover:border-rose-400 hover:text-rose-500"
          >
            {row.status === "available" ? "Hide" : "Show"}
          </button>
        </div>
      ),
    },
  ];

  const toggleStatus = () => {
    if (!itemToDisable) return;
    setMenuItems((current) =>
      current.map((item) =>
        item.id === itemToDisable.id
          ? {
              ...item,
              status:
                item.status === "available" ? "out-of-stock" : "available",
            }
          : item
      )
    );
    setItemToDisable(null);
    showToast("Menu item visibility changed (mock only).", {
      type: "success",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Menu Management
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Menu Items
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Control which dishes are visible to guests and waiters.
          </p>
        </div>
        <div className="flex gap-2">
          <Button as={Link} to="/menu/add" size="sm">
            Add menu item
          </Button>
        </div>
      </div>

      <Card
        title="Digital Menu"
        description="Use status toggles to temporarily hide sold out items."
      >
        <Table columns={columns} data={menuItems} />
      </Card>

      <Modal
        open={!!itemToDisable}
        onClose={() => setItemToDisable(null)}
        title={
          itemToDisable?.status === "available"
            ? "Hide this menu item?"
            : "Show this menu item again?"
        }
        description="This only affects visibility, not historical reporting."
        primaryAction={
          <Button size="sm" onClick={toggleStatus}>
            Confirm
          </Button>
        }
      >
        <p>
          {itemToDisable?.status === "available"
            ? "Guests and waiters will no longer see this item in the menu."
            : "Guests and waiters will see this item again in the menu."}
        </p>
      </Modal>
    </div>
  );
}

export default MenuListPage;
