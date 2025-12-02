import React from "react";
import { Save, RotateCcw, Building2, Receipt, Shield } from "lucide-react";
import { Card, TextField, SelectField, Button } from "../components/ui";
import { restaurantSettings } from "../data/settings.js";

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Configuration
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Restaurant settings
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Core details used across receipts, waiter apps, and analytics.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="General info" icon={Building2}>
          <form className="space-y-4">
            <TextField
              label="Restaurant name"
              defaultValue={restaurantSettings.name}
            />
            <TextField
              label="Location"
              defaultValue={restaurantSettings.location}
            />
            <TextField
              label="Opening hours"
              defaultValue={restaurantSettings.openingHours}
            />
          </form>
        </Card>

        <Card title="Fiscal & service settings" icon={Receipt}>
          <form className="space-y-4">
            <SelectField
              label="Currency"
              defaultValue={restaurantSettings.currency}
              options={[
                { value: "USD", label: "USD – US Dollar" },
                { value: "EUR", label: "EUR – Euro" },
                { value: "GBP", label: "GBP – British Pound" },
              ]}
            />
            <TextField
              label="Service charge %"
              type="number"
              min="0"
              max="25"
              defaultValue={restaurantSettings.serviceCharge}
            />
            <TextField
              label="Tax rate %"
              type="number"
              min="0"
              max="30"
              defaultValue={restaurantSettings.taxRate}
            />
          </form>
        </Card>
      </div>

      <Card
        title="Session & safety"
        description="High-signal options for live operation."
        icon={Shield}
      >
        <form className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Auto logout after"
            defaultValue="30"
            options={[
              { value: "15", label: "15 minutes of inactivity" },
              { value: "30", label: "30 minutes of inactivity" },
              { value: "60", label: "60 minutes of inactivity" },
            ]}
          />
          <SelectField
            label="Allow waiter PIN reuse"
            defaultValue="no"
            options={[
              { value: "no", label: "No – enforce unique PINs" },
              { value: "yes", label: "Yes – allow duplicates" },
            ]}
          />

          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" type="button">
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Reset changes
            </Button>
            <Button size="sm" type="submit">
              <Save className="mr-1.5 h-3.5 w-3.5" />
              Save configuration
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SettingsPage;
