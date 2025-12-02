import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import {
  Button,
  Card,
  TextField,
  SelectField,
  Badge,
  ImageUpload,
  useToast,
} from "../components/ui";
import { kitchenStaff } from "../data/kitchen.js";

function KitchenStaffFormPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "edit";
  const staff = isEdit ? kitchenStaff.find((k) => k.id === id) : null;
  const { showToast } = useToast();
  const [imageData, setImageData] = useState(staff?.image || null);

  const handleImageChange = (dataUrl) => {
    setImageData(dataUrl);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            onClick={() => navigate("/staff")}
            className="mb-2 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Staff
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Team
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {isEdit
              ? "Edit kitchen staff account"
              : "Add kitchen staff account"}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Basic profile details and a secure 4-digit PIN.
          </p>
        </div>
        {isEdit && staff && (
          <Badge color={staff.status === "active" ? "green" : "red"}>
            {staff.status === "active" ? "On shift" : "Off shift"}
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
                ? "Kitchen staff account updated for this session only."
                : "Kitchen staff account created (mock only).",
              { type: "success" }
            );
            navigate("/staff");
          }}
        >
          <div className="sm:col-span-2">
            <ImageUpload
              label="Profile Photo"
              hint="Upload a photo of the staff member for easy identification."
              value={imageData}
              onChange={handleImageChange}
            />
          </div>

          <TextField
            label="Full name"
            placeholder="E.g. Marcus Chen"
            defaultValue={staff?.name}
            required
          />
          <TextField
            label="Email"
            type="email"
            placeholder="E.g. marcus@example.com"
            defaultValue={staff?.email}
            required
          />

          <TextField
            label="4-digit PIN"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            placeholder="E.g. 1234"
            defaultValue={staff?.pin}
            hint="Used by staff to log in on kitchen display systems."
            required
          />
          <SelectField
            label="Role"
            defaultValue={staff?.role || "Line Cook"}
            options={[
              { value: "Head Chef", label: "Head Chef" },
              { value: "Sous Chef", label: "Sous Chef" },
              { value: "Line Cook", label: "Line Cook" },
              { value: "Prep Cook", label: "Prep Cook" },
              { value: "Pastry Chef", label: "Pastry Chef" },
              { value: "Dishwasher", label: "Dishwasher" },
            ]}
          />

          <SelectField
            label="Status"
            defaultValue={staff?.status || "active"}
            options={[
              { value: "active", label: "Active – can log in" },
              { value: "inactive", label: "Inactive – access disabled" },
            ]}
          />

          <TextField
            label="Notes (optional)"
            placeholder="Specializations, shift preferences, etc."
          />

          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => navigate("/staff")}
            >
              <X className="mr-1.5 h-3.5 w-3.5" />
              Cancel
            </Button>
            <Button size="sm" type="submit">
              <Save className="mr-1.5 h-3.5 w-3.5" />
              {isEdit ? "Save changes" : "Create account"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default KitchenStaffFormPage;
