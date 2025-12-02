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
import { menuItems, menuCategories } from "../data/menu.js";

function MenuItemFormPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "edit";
  const item = isEdit ? menuItems.find((m) => m.id === id) : null;
  const { showToast } = useToast();
  const [imageData, setImageData] = useState(item?.image || null);

  const handleImageChange = (dataUrl) => {
    setImageData(dataUrl);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            onClick={() => navigate("/menu")}
            className="mb-2 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Menu
          </button>
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
            navigate("/menu");
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
            <ImageUpload
              label="Item Image"
              hint="Upload a photo of the dish. This will be shown in the digital menu."
              value={imageData}
              onChange={handleImageChange}
            />
          </div>

          <div className="sm:col-span-2">
            <TextField
              label="Description"
              placeholder="Short friendly description that guests will see."
            />
          </div>

          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => navigate("/menu")}
            >
              <X className="mr-1.5 h-3.5 w-3.5" />
              Cancel
            </Button>
            <Button size="sm" type="submit">
              <Save className="mr-1.5 h-3.5 w-3.5" />
              {isEdit ? "Save changes" : "Add item to menu"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default MenuItemFormPage;
