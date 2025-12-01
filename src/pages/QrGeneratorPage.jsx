import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, Button, TextField, SelectField } from "../components/ui";

function QrGeneratorPage() {
  const [tableNumber, setTableNumber] = useState("T01");
  const [mode, setMode] = useState("menu");

  const fakeQrValue = `https://example-restaurant.com/${mode}?table=${tableNumber}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            QR Tools
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Table QR generator
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Generate printable QR codes that link guests to your digital menu or
            feedback form.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Configure QR" className="lg:col-span-2">
          <form className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Table identifier"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              hint="Use the same label as on the physical table."
            />
            <SelectField
              label="Destination"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              options={[
                { value: "menu", label: "Digital menu" },
                { value: "feedback", label: "Feedback form" },
              ]}
            />

            <div className="sm:col-span-2">
              <TextField
                label="Generated URL (preview)"
                value={fakeQrValue}
                readOnly
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" type="button">
                Download PNG
              </Button>
              <Button size="sm" type="button">
                Print table card
              </Button>
            </div>
          </form>
        </Card>

        <Card title="Preview" description="This is a mocked QR representation.">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-slate-900">
              <QRCodeSVG
                value={fakeQrValue}
                size={160}
                level="M"
                includeMargin
                aria-label="Table QR code preview"
              />
            </div>
            <p className="text-xs text-center text-slate-500">
              This QR code encodes the generated URL above. Guests can scan it
              to open the digital menu or feedback form.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default QrGeneratorPage;
