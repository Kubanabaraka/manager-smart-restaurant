import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  TextField,
  SelectField,
  Badge,
  useToast,
} from "../components/ui";
import { menuItems, menuCategories } from "../data/menu.js";

function MenuItemFormPage({ mode }) {
  const { id } = useParams();
  const isEdit = mode === "edit";
  const item = isEdit ? menuItems.find((m) => m.id === id) : null;
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Menu Management
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {isEdit ? "Edit menu item" : "Add menu item"}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Configure pricing, category, and visibility before publishing.
          </p>
        </div>
        {isEdit && item && (
          <Badge color={item.status === "available" ? "green" : "red"}>
            {item.status === "available"
              ? "Visible in menu"
              : "Hidden from menu"}
          </Badge>
        )}
      </div>

      <Card>
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            showToast(
              isEdit
                ? "Menu item updated for this session only."
                : "Menu item added (mock only, no backend).",
              { type: "success" }
            );
          }}
        >
          <TextField
            label="Item name"
            placeholder="E.g. Spicy Chicken Burger"
            defaultValue={item?.name}
          />
          <TextField
            label="Internal code (optional)"
            placeholder="E.g. BGR-01"
          />

          <SelectField
            label="Category"
            defaultValue={item?.category || menuCategories[0]}
            options={menuCategories.map((c) => ({ value: c, label: c }))}
          />
          <TextField
            label="Price"
            type="number"
            min="0"
            step="0.1"
            defaultValue={item?.price ?? ""}
            hint="Tax and service will be added on top."
          />

          <TextField
            label="Preparation time (min)"
            type="number"
            min="0"
            defaultValue={item?.prepTime ?? 10}
          />
          <SelectField
            label="Visibility"
            defaultValue={item?.status || "available"}
            options={[
              { value: "available", label: "Visible in digital menu" },
              { value: "out-of-stock", label: "Hidden – out of stock" },
            ]}
          />

          <div className="sm:col-span-2">
            <TextField
              label="Description"
              placeholder="Short friendly description that guests will see."
            />
          </div>

          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" type="button">
              Cancel
            </Button>
            <Button size="sm" type="submit">
              {isEdit ? "Save changes" : "Add item to menu"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default MenuItemFormPage;
