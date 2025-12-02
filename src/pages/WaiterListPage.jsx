import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button, Card, Table, Badge, Modal, useToast } from "../components/ui";
import { waiters as initialWaiters } from "../data/waiters.js";

function WaiterListPage() {
  const [waiters, setWaiters] = useState(initialWaiters);
  const [selectedWaiter, setSelectedWaiter] = useState(null);
  const { showToast } = useToast();

  const columns = [
    {
      key: "name",
      header: "Waiter",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={row.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-xs font-medium text-slate-900">{row.name}</p>
            <p className="text-[11px] text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "pin",
      header: "PIN",
      render: (row) => <span className="font-mono text-xs">{row.pin}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge color={row.status === "active" ? "green" : "red"}>
          {row.status === "active" ? "On shift" : "Off shift"}
        </Badge>
      ),
    },
    {
      key: "lastActive",
      header: "Last activity",
      render: (row) => (
        <span className="text-xs text-slate-400">{row.lastActive}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <div className="flex justify-end gap-2 text-xs">
          <Link
            to={`/waiters/${row.id}`}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand-500 hover:text-brand-600 transition-colors"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </Link>
          <button
            type="button"
            onClick={() => setSelectedWaiter(row)}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 hover:border-rose-400 hover:text-rose-500 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
            Remove
          </button>
        </div>
      ),
    },
  ];

  const removeWaiter = () => {
    if (!selectedWaiter) return;
    setWaiters((current) => current.filter((w) => w.id !== selectedWaiter.id));
    setSelectedWaiter(null);
    showToast("Waiter account removed for this session only.", {
      type: "success",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Team
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Waiter accounts
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Manage access pins, activity, and shift readiness.
          </p>
        </div>
        <Button as={Link} to="/waiters/add" size="sm">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add waiter account
        </Button>
      </div>

      <Card
        title="Waiter roster"
        description="Pins are used for quick login at waiter terminals."
      >
        <Table columns={columns} data={waiters} />
      </Card>

      <Modal
        open={!!selectedWaiter}
        onClose={() => setSelectedWaiter(null)}
        title="Remove waiter account?"
        description="This revokes access immediately. You can always recreate the account later."
        primaryAction={
          <Button size="sm" onClick={removeWaiter}>
            Confirm removal
          </Button>
        }
      >
        <p>
          {selectedWaiter && (
            <>
              The account for <strong>{selectedWaiter.name}</strong> will no
              longer be able to sign in using PIN{" "}
              <strong>{selectedWaiter.pin}</strong>.
            </>
          )}
        </p>
      </Modal>
    </div>
  );
}

export default WaiterListPage;
