import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportPDFOptions {
  title: string;
  subtitle?: string;
  filename?: string;
  headers: string[];
  rows: (string | number)[][];
}

export function exportToPDF({
  title,
  subtitle,
  filename,
  headers,
  rows,
}: ExportPDFOptions) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // JCB Yellow & Dark Industrial Colors
  const primaryColor = [255, 204, 0]; // #FFCC00
  const darkColor = [17, 17, 17];     // #111111

  // Header Banner
  doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.rect(0, 0, 210, 28, "F");

  // Yellow accent line
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 28, 210, 3, "F");

  // Title text in header
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("FLEETFORCE ENTERPRISE", 14, 15);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 204, 0);
  doc.text("INDUSTRIAL FLEET MANAGEMENT REPORT", 14, 21);

  // Subtitle / Date right-aligned
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 196, 18, { align: "right" });

  // Main Report Title
  doc.setTextColor(17, 17, 17);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(title, 14, 40);

  if (subtitle) {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(subtitle, 14, 46);
  }

  const startY = subtitle ? 52 : 46;

  // AutoTable
  autoTable(doc, {
    startY,
    head: [headers],
    body: rows,
    theme: "grid",
    headStyles: {
      fillColor: [17, 17, 17],
      textColor: [255, 204, 0],
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [30, 30, 30],
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
    margin: { left: 14, right: 14 },
  });

  // Footer page number
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `FleetForce Operations Report • Page ${i} of ${pageCount}`,
      105,
      287,
      { align: "center" }
    );
  }

  const outputName = filename || `${title.toLowerCase().replace(/\s+/g, "_")}_report.pdf`;
  doc.save(outputName);
}
