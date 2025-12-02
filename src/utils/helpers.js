/**
 * Utility helpers for download, print, and export functionality
 */

/**
 * Export data as CSV file
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Name of the file to download
 */
export function exportToCSV(data, filename = "export.csv") {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download an element as PNG image
 * @param {HTMLElement} element - The DOM element to capture
 * @param {string} filename - Name of the file to download
 */
export async function downloadAsPNG(element, filename = "download.png") {
  if (!element) {
    console.warn("No element provided for PNG download");
    return;
  }

  try {
    // Find SVG in element (for QR codes)
    const svg = element.querySelector("svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      return new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width * 2;
          canvas.height = img.height * 2;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const url = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          link.click();
          resolve();
        };

        img.src =
          "data:image/svg+xml;base64," +
          btoa(unescape(encodeURIComponent(svgData)));
      });
    } else {
      // Fallback: create a simple card representation
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 400;
      canvas.height = 400;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 16px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("Table Card", canvas.width / 2, 50);
      ctx.font = "12px system-ui";
      ctx.fillText(
        "Scan QR code to access menu",
        canvas.width / 2,
        canvas.height - 50
      );

      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
    }
  } catch (error) {
    console.error("Error downloading PNG:", error);
  }
}

/**
 * Print a specific element (not the whole page)
 * @param {HTMLElement} element - The DOM element to print
 * @param {string} title - Title for the print window
 */
export function printElement(element, title = "Print") {
  if (!element) {
    console.warn("No element provided for printing");
    return;
  }

  const printWindow = window.open("", "_blank", "width=600,height=600");
  if (!printWindow) {
    console.warn("Popup blocked. Please allow popups for printing.");
    return;
  }

  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          ${styles}
          body { 
            margin: 20px; 
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  // Wait for content to load then print
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

/**
 * Generate shift report data for export
 * @param {Object} options - Report options
 * @returns {Array} Report data ready for CSV export
 */
export function generateShiftReport(orders, topItems, revenue) {
  const timestamp = new Date().toISOString();
  const reportData = [
    {
      Section: "Summary",
      Metric: "Total Revenue",
      Value: `$${revenue.toFixed(2)}`,
      Timestamp: timestamp,
    },
    {
      Section: "Summary",
      Metric: "Total Orders",
      Value: orders.length,
      Timestamp: timestamp,
    },
    {
      Section: "Summary",
      Metric: "Served Orders",
      Value: orders.filter((o) => o.status === "served").length,
      Timestamp: timestamp,
    },
    {
      Section: "Summary",
      Metric: "Pending Orders",
      Value: orders.filter((o) => o.status === "pending").length,
      Timestamp: timestamp,
    },
    ...orders.map((order) => ({
      Section: "Orders",
      Metric: order.id,
      Value: `${order.table} - ${order.items} items - $${order.value.toFixed(
        2
      )} - ${order.status}`,
      Timestamp: timestamp,
    })),
    ...topItems.map((item) => ({
      Section: "Top Items",
      Metric: item.name,
      Value: `${item.sold} sold - $${item.revenue.toFixed(2)}`,
      Timestamp: timestamp,
    })),
  ];

  return reportData;
}
