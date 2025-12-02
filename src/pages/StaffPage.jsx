import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Users, ChefHat } from "lucide-react";
import { Button, Card, Modal, useToast } from "../components/ui";
import StaffRoster from "../components/staff/StaffRoster.jsx";
import { waiters as initialWaiters } from "../data/waiters.js";
import { kitchenStaff as initialKitchenStaff } from "../data/kitchen.js";

function StaffPage() {
  // State for waiters
  const [waiters, setWaiters] = useState(initialWaiters);
  const [selectedWaiter, setSelectedWaiter] = useState(null);

  // State for kitchen staff
  const [kitchenStaff, setKitchenStaff] = useState(initialKitchenStaff);
  const [selectedKitchenStaff, setSelectedKitchenStaff] = useState(null);

  const { showToast } = useToast();

  // Remove waiter handler
  const removeWaiter = () => {
    if (!selectedWaiter) return;
    setWaiters((current) => current.filter((w) => w.id !== selectedWaiter.id));
    setSelectedWaiter(null);
    showToast("Waiter account removed for this session only.", {
      type: "success",
    });
  };

  // Remove kitchen staff handler
  const removeKitchenStaff = () => {
    if (!selectedKitchenStaff) return;
    setKitchenStaff((current) =>
      current.filter((k) => k.id !== selectedKitchenStaff.id)
    );
    setSelectedKitchenStaff(null);
    showToast("Kitchen staff account removed for this session only.", {
      type: "success",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Team
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Staff
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Manage waiter and kitchen staff accounts, shift activity, and access
            pins.
          </p>
        </div>
      </div>

      {/* Two-column layout for staff sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: Waiter Staff */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10">
                <Users className="h-4 w-4 text-brand-600" />
              </div>
              <h2 className="text-sm font-semibold text-slate-800">
                Waiter Staff
              </h2>
            </div>
            <Button as={Link} to="/staff/waiters/add" size="sm">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Waiter
            </Button>
          </div>

          <Card
            title="Waiter roster"
            description="PINs are used for quick login at waiter terminals."
          >
            <StaffRoster
              staff={waiters}
              staffType="waiter"
              editBasePath="/staff/waiters"
              onRemove={setSelectedWaiter}
              pinLabel="PIN"
            />
          </Card>
        </div>

        {/* Right Column: Kitchen Staff */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
                <ChefHat className="h-4 w-4 text-orange-600" />
              </div>
              <h2 className="text-sm font-semibold text-slate-800">
                Kitchen Staff
              </h2>
            </div>
            <Button as={Link} to="/staff/kitchen/add" size="sm">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Kitchen Staff
            </Button>
          </div>

          <Card
            title="Kitchen roster"
            description="PINs are used for kitchen display system access."
          >
            <StaffRoster
              staff={kitchenStaff}
              staffType="kitchen"
              editBasePath="/staff/kitchen"
              onRemove={setSelectedKitchenStaff}
              pinLabel="PIN"
            />
          </Card>
        </div>
      </div>

      {/* Remove Waiter Modal */}
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

      {/* Remove Kitchen Staff Modal */}
      <Modal
        open={!!selectedKitchenStaff}
        onClose={() => setSelectedKitchenStaff(null)}
        title="Remove kitchen staff account?"
        description="This revokes access immediately. You can always recreate the account later."
        primaryAction={
          <Button size="sm" onClick={removeKitchenStaff}>
            Confirm removal
          </Button>
        }
      >
        <p>
          {selectedKitchenStaff && (
            <>
              The account for <strong>{selectedKitchenStaff.name}</strong> will
              no longer be able to sign in using PIN{" "}
              <strong>{selectedKitchenStaff.pin}</strong>.
            </>
          )}
        </p>
      </Modal>
    </div>
  );
}

export default StaffPage;
