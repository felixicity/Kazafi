import PDFDocument from "pdfkit";
import axios from "axios";

const drawTable = async ({ doc, startX, startY, rowHeight, imgSize, columnWidths, headers, rows }) => {
      let y = startY;
      const tableWidth = columnWidths.reduce((a, b) => a + b, 0);

      // Header
      doc.font("fonts/Roboto-VariableFont_wdth,wght.ttf").fontSize(11).fillColor("#374151");

      headers.forEach((header, i) => {
            const x = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);
            doc.text(header, x + 6, y + 7, {
                  width: columnWidths[i] - 12,
                  align: i === 0 ? "left" : "right", // Align header same as content
            });
      });

      y += rowHeight;

      // Header underline
      doc.strokeColor("#e5e7eb")
            .lineWidth(1)
            .moveTo(startX, y)
            .lineTo(startX + tableWidth, y)
            .stroke();

      // Rows
      doc.font("fonts/Roboto-VariableFont_wdth,wght.ttf").fontSize(10).fillColor("#111827");

      // Use for...of for ASYNC support
      for (const row of rows) {
            // Page break check
            if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
                  doc.addPage();
                  y = doc.page.margins.top;
            }

            // Iterate through columns
            for (let i = 0; i < row.length; i++) {
                  const cell = row[i];
                  const x = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);

                  if (i === 0 && typeof cell === "object") {
                        // COLUMN 1: IMAGE + TEXT
                        if (cell.image) {
                              try {
                                    const response = await axios.get(cell.image, { responseType: "arraybuffer" });
                                    doc.image(Buffer.from(response.data), x + 6, y + 5, { fit: [imgSize, imgSize] });
                              } catch (e) {
                                    console.error("Image load failed", e);
                              }
                        }

                        // Offset text so it doesn't overlap image
                        const textX = cell.image ? x + imgSize + 12 : x + 6;
                        doc.text(cell.text, textX, y + 15, {
                              width: columnWidths[i] - (cell.image ? imgSize + 18 : 12),
                              align: "left",
                        });
                  } else {
                        // OTHER COLUMNS: REGULAR TEXT
                        doc.text(String(cell), x + 6, y + 15, {
                              width: columnWidths[i] - 12,
                              align: i === 1 ? "center" : "right",
                        });
                  }
            }

            y += rowHeight;

            // Row separator
            doc.strokeColor("#f3f4f6")
                  .lineWidth(1)
                  .moveTo(startX, y)
                  .lineTo(startX + tableWidth, y)
                  .stroke();
      }

      return y;
};

export const generateReceiptPDF = async (order, payment) => {
      // 1. Add 'async' here --------------------v
      return new Promise(async (resolve, reject) => {
            try {
                  const doc = new PDFDocument({ size: "A4", margin: 40 });
                  const buffers = [];

                  doc.on("data", (chunk) => buffers.push(chunk));
                  doc.on("end", () => resolve(Buffer.concat(buffers)));
                  doc.on("error", (err) => reject(err));

                  // Header
                  const startY = doc.y; // Save the "top" of your flex container
                  const midPoint = 300; // Where the second column starts

                  // Left Item
                  doc.fontSize(24).fillColor("#121212").text("KAZAFI", 40, startY, {
                        width: 250,
                        align: "left",
                  });
                  doc.fontSize(10).fillColor("#6b7280").text("17 Ikorodu Road, Lagos");

                  // Right Item
                  // We manually set the x to midPoint and y back to startY
                  doc.fontSize(16).fillColor("#121212").text("RECEIPT", midPoint, startY, {
                        width: 250,
                        align: "right",
                  });
                  doc.fontSize(12)
                        .fillColor("#1b1b1b")
                        .text(`Order ID: PO-${order._id.toString()}`, { align: "right" });
                  doc.fillColor("#1b1b1b").text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, {
                        align: "right",
                  });

                  // IMPORTANT: Move doc.y to the bottom of the tallest element
                  // so the next line of text doesn't overlap
                  doc.y = Math.max(doc.y, startY + 20);
                  doc.x = 40;

                  doc.moveDown(2);
                  doc.font("fonts/Roboto-VariableFont_wdth,wght.ttf").fontSize(8).fillColor("#6b7280").text("BILL TO:");

                  doc.font("fonts/Roboto-VariableFont_wdth,wght.ttf").fontSize(12).fillColor("#000");
                  const address =
                        typeof order.shippingAddress === "string"
                              ? order.shippingAddress
                              : order.shippingAddress?.address || "Customer";

                  doc.text(`Shipping Address: ${address}`);
                  doc.text(`Payment: ${payment.channel}`);

                  doc.moveDown(2);

                  // Table
                  // Map your data so the first column is an object
                  const tableRows = order.items.map((item) => [
                        { text: item.productId.name, image: item.product.imageURLs[0] }, // Object for first column
                        item.quantity,
                        `${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(item.product.price)}`,
                        `${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(item.product.price * item.quantity)}`,
                  ]);

                  // Call it with await
                  const tableEndY = await drawTable({
                        doc,
                        startX: 40,
                        startY: doc.y,
                        rowHeight: 45, // Increased slightly for image padding
                        imgSize: 30,
                        columnWidths: [180, 80, 120, 120],
                        headers: ["Item", "Qty", "Price", "Total"],
                        rows: tableRows,
                  });

                  // Totals
                  // ... after tableEndY ...
                  doc.y = tableEndY + 20;

                  // 1. FORCE the cursor back to the left margin
                  doc.x = 40;

                  doc.font("fonts/Roboto-VariableFont_wdth,wght.ttf").fontSize(12);

                  const fullWidth = doc.page.width - 80;

                  doc.text(
                        `Shipping: ${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(order.shippingFee)}`,
                        { align: "right", width: fullWidth }, // Explicitly set width
                  );

                  const startX = doc.page.margins.left;
                  const endX = doc.page.width - doc.page.margins.right;

                  doc.moveDown();
                  doc.strokeColor("#e5e7eb")
                        .lineWidth(1)
                        .moveTo(startX + 300, doc.y)
                        .lineTo(endX, doc.y)
                        .stroke();
                  doc.moveDown();
                  doc.fontSize(20)
                        .fillColor("#121212")
                        .text(
                              `Grand Total: ${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(order.totalAmount)}`,
                              { align: "right", width: fullWidth },
                        );

                  // Footer divider
                  doc.moveDown(4);

                  doc.strokeColor("#e5e7eb").lineWidth(1).moveTo(startX, doc.y).lineTo(endX, doc.y).stroke();

                  doc.moveDown(1.5);

                  doc.font("fonts/Roboto-Italic-VariableFont_wdth,wght.ttf")
                        .fontSize(10)
                        .fillColor("#9ca3af")
                        .text("Thank you for shopping with us! If you have any questions, contact support@kazafi.com", {
                              align: "center",
                        });

                  doc.end();
            } catch (err) {
                  reject(err);
            }
      });
};
