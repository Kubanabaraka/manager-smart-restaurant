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
import { waiters } from "../data/waiters.js";

function WaiterFormPage({ mode }) {
  const { id } = useParams();
  const isEdit = mode === "edit";
  const waiter = isEdit ? waiters.find((w) => w.id === id) : null;
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Team
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {isEdit ? "Edit waiter account" : "Add waiter account"}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Basic profile details and a secure 4-digit PIN.
          </p>
        </div>
        {isEdit && waiter && (
          <Badge color={waiter.status === "active" ? "green" : "red"}>
            {waiter.status === "active" ? "On shift" : "Off shift"}
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
                ? "Waiter account updated for this session only."
                : "Waiter account created (mock only).",
              { type: "success" }
            );
          }}
        >
          <TextField
            label="Full name"
            placeholder="E.g. Emma Wilson"
            defaultValue={waiter?.name}
          />
          <TextField
            label="Email"
            type="email"
            placeholder="E.g. emma@example.com"
            defaultValue={waiter?.email}
          />

          <TextField
            label="4-digit PIN"
            type="number"
            placeholder="E.g. 1234"
            defaultValue={waiter?.pin}
            hint="Used by the waiter to log in on their terminal."
          />
          <SelectField
            label="Status"
            defaultValue={waiter?.status || "active"}
            options={[
              { value: "active", label: "Active – can log in" },
              { value: "inactive", label: "Inactive – access disabled" },
            ]}
          />

          <div className="sm:col-span-2">
            <TextField
              label="Notes (optional)"
              placeholder="Shift preferences, languages spoken, etc."
            />
          </div>

          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" type="button">
              Cancel
            </Button>
            <Button size="sm" type="submit">
              {isEdit ? "Save changes" : "Create account"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default WaiterFormPage;
