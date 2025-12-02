import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer, QrCode, Link as LinkIcon } from "lucide-react";
import {
  Card,
  Button,
  TextField,
  SelectField,
  useToast,
} from "../components/ui";
import { downloadAsPNG, printElement } from "../utils/helpers.js";

function QrGeneratorPage() {
  const [tableNumber, setTableNumber] = useState("T01");
  const [mode, setMode] = useState("menu");
  const qrCardRef = useRef(null);
  const { showToast } = useToast();

  const fakeQrValue = `https://smartqrrestaurant.netlify.app`;

  const handleDownloadPNG = async () => {
    if (qrCardRef.current) {
      await downloadAsPNG(qrCardRef.current, `qr-${tableNumber}-${mode}.png`);
      showToast("QR code downloaded as PNG!", { type: "success" });
    }
  };

  const handlePrintCard = () => {
    if (qrCardRef.current) {
      printElement(qrCardRef.current, `Table ${tableNumber} QR Code`);
      showToast("Print dialog opened!", { type: "success" });
    }
  };

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
              icon={QrCode}
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
                icon={LinkIcon}
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={handleDownloadPNG}
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download PNG
              </Button>
              <Button size="sm" type="button" onClick={handlePrintCard}>
                <Printer className="mr-1.5 h-3.5 w-3.5" />
                Print table card
              </Button>
            </div>
          </form>
        </Card>

        <Card title="Preview" description="This is a mocked QR representation.">
          <div
            ref={qrCardRef}
            className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white p-4"
          >
            <p className="text-sm font-semibold text-slate-900">
              Table {tableNumber}
            </p>
            <div className="flex h-44 w-44 items-center justify-center rounded-2xl bg-slate-900 p-2">
              <QRCodeSVG
                value={fakeQrValue}
                size={160}
                level="M"
                includeMargin
                aria-label="Table QR code preview"
              />
            </div>
            <p className="text-xs text-center text-slate-500">
              Scan to access{" "}
              {mode === "menu" ? "digital menu" : "feedback form"}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default QrGeneratorPage;
