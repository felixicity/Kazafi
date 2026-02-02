import PDFDocument from "pdfkit";

const drawTable = ({ doc, startX, startY, rowHeight, columnWidths, headers, rows }) => {
      let y = startY;
      const tableWidth = columnWidths.reduce((a, b) => a + b, 0);

      // Header
      doc.font("fonts/Roboto-VariableFont_wdth,wght.ttf").fontSize(11).fillColor("#374151");

      headers.forEach((header, i) => {
            const x = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);

            doc.text(header, x + 6, y + 7, {
                  width: columnWidths[i] - 12,
                  align: "left",
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

      rows.forEach((row) => {
            // Page break check
            if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
                  doc.addPage();
                  y = doc.page.margins.top;
            }

            row.forEach((cell, i) => {
                  const x = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);

                  doc.text(String(cell), x + 6, y + 7, {
                        width: columnWidths[i] - 12,
                        align: i === 1 ? "center" : "left",
                  });
            });

            y += rowHeight;

            // Row separator
            doc.strokeColor("#f3f4f6")
                  .moveTo(startX, y)
                  .lineTo(startX + tableWidth, y)
                  .stroke();
      });

      return y;
};

export const generateReceiptPDF = async (order) => {
      return new Promise((resolve, reject) => {
            try {
                  const doc = new PDFDocument({ size: "A4", margin: 40 });
                  const buffers = [];

                  doc.on("data", buffers.push.bind(buffers));
                  doc.on("end", () => resolve(Buffer.concat(buffers)));

                  // Header
                  doc.fontSize(24).fillColor("#2563eb").text("KAZAFI");
                  doc.fontSize(10).fillColor("#6b7280").text("17 Ikorodu Road, Lagos");

                  doc.fontSize(16).fillColor("#000").text("RECEIPT", { align: "right" });
                  doc.fontSize(12)
                        .fillColor("#1b1b1b")
                        .text(`Order ID: #PO-${order._id.toString()}`, { align: "right" });
                  doc.fillColor("#1b1b1b").text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, {
                        align: "right",
                  });

                  doc.moveDown();

                  doc.font("fonts/Roboto-VariableFont_wdth,wght.ttf").fontSize(8).fillColor("#6b7280").text("BILL TO:");

                  doc.font("fonts/Roboto-VariableFont_wdth,wght.ttf").fontSize(12).fillColor("#000");
                  const address =
                        typeof order.shippingAddress === "string"
                              ? order.shippingAddress
                              : order.shippingAddress?.address || "Customer";

                  doc.text(`Shipping Address: ${address}`);
                  doc.text(`Payment: ${order.status}`);

                  doc.moveDown(2);

                  // Table
                  const tableEndY = drawTable({
                        doc,
                        startX: 40,
                        startY: doc.y,
                        rowHeight: 25,
                        columnWidths: [240, 80, 120, 120],
                        headers: ["Item", "Qty", "Price", "Total"],
                        rows: order.items.map((item) => [
                              item.productId.name,
                              item.quantity,
                              `${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(item.product.price)}`,
                              `${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(item.product.price * item.quantity)}`,
                        ]),
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
                        .fillColor("#2563eb")
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

// import puppeteer from "puppeteer";

// export const generateReceiptPDF = async (order) => {
//       const browser = await puppeteer.launch({
//             args: ["--no-sandbox", "--disable-setuid-sandbox"],
//             headless: "new",
//       });
//       const page = await browser.newPage();

//       // The Tailwind Template
//       const htmlContent = `
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <script src="https://cdn.tailwindcss.com"></script>
//     </head>
//     <body>
//       <div class="p-10 bg-white font-sans text-gray-800">
//         <div class="flex justify-between items-center border-b-2 border-gray-100 pb-8">
//           <div>
//             <h1 class="text-4xl font-bold text-blue-600">KAZAFI</h1>
//             <p class="text-sm text-gray-500">17 Ikorodu Road, Lagos</p>
//           </div>
//           <div class="text-right">
//             <h2 class="text-2xl font-semibold uppercase">Receipt</h2>
//             <p class="text-sm text-gray-500">Order ID:${order._id.toString().slice(-6)}</p>
//             <p class="text-sm text-gray-500">Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
//           </div>
//         </div>

//         <div class="mt-10 mb-8">
//           <h3 class="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Bill To:</h3>
//           <p class="font-bold text-lg">Shipping Address:${order.shippingAddress || "Customer"}</p>
//           <p class="text-gray-600">Payment: ${order.paymentStatus}</p>
//         </div>

//         <table class="w-full text-left border-collapse">
//           <thead>
//             <tr class="border-b-2 border-gray-100">
//               <th class="py-4 font-bold uppercase text-sm text-gray-400">Item</th>
//               <th class="py-4 font-bold uppercase text-sm text-gray-400 text-center">Qty</th>
//               <th class="py-4 font-bold uppercase text-sm text-gray-400 text-right">Price</th>
//               <th class="py-4 font-bold uppercase text-sm text-gray-400 text-right">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${order.items
//                   .map(
//                         (item) => `
//               <tr class="border-b border-gray-50">
//                 <td class="py-4">
//                   <p class="font-bold text-gray-700">${item.productId.name || "Product"}</p>
//                 </td>
//                 <td class="py-4 text-center">${item.quantity}</td>
//                 <td class="py-4 text-right">${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(item.product.price)}</td>
//                 <td class="py-4 text-right font-semibold">${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(item.quantity * item.product.price)}</td>
//               </tr>
//             `,
//                   )
//                   .join("")}
//           </tbody>
//         </table>

//         <div class="mt-10 flex justify-end">
//           <div class="w-64">
//             <div class="flex justify-between py-2">
//               <span class="text-gray-500">Shipping</span>
//               <span class="font-semibold">${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(order.shippingFee)}</span>
//             </div>
//             <div class="flex justify-between py-4 border-t-2 border-gray-100">
//               <span class="text-xl font-bold text-gray-800">Total Paid</span>
//               <span class="text-xl font-bold text-blue-600">${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(order.totalAmount)}</span>
//             </div>
//           </div>
//         </div>

//         <div class="mt-20 text-center border-t border-gray-100 pt-8">
//           <p class="text-gray-400 text-sm italic">Thank you for shopping with us! If you have any questions, contact support@kazafi.com</p>
//         </div>
//       </div>
//     </body>
//   </html>
//   `;

//       await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
//       const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

//       await browser.close();
//       return pdfBuffer;
// };
