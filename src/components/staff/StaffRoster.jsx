import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { Table, Badge } from "../ui";

/**
 * Reusable StaffRoster component for displaying staff members
 * Used by both Waiter and Kitchen staff sections
 */
function StaffRoster({
  staff,
  staffType,
  editBasePath,
  onRemove,
  pinLabel = "PIN",
}) {
  const columns = [
    {
      key: "name",
      header: staffType === "waiter" ? "Waiter" : "Kitchen Staff",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={row.name}
            className="h-10 w-10 rounded-full object-cover border border-slate-200"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                row.name
              )}&background=f97316&color=fff`;
            }}
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
      header: pinLabel,
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
            to={`${editBasePath}/${row.id}`}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand-500 hover:text-brand-600 transition-colors"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onRemove(row)}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 hover:border-rose-400 hover:text-rose-500 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
            Remove
          </button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={staff} />;
}

export default StaffRoster;
