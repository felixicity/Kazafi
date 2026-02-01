import puppeteer from "puppeteer";

export const generateReceiptPDF = async (order) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // The Tailwind Template
      const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <div class="p-10 bg-white font-sans text-gray-800">
        <div class="flex justify-between items-center border-b-2 border-gray-100 pb-8">
          <div>
            <h1 class="text-4xl font-bold text-blue-600">KAZAFI</h1>
            <p class="text-sm text-gray-500">17 Ikorodu Road, Lagos</p>
          </div>
          <div class="text-right">
            <h2 class="text-2xl font-semibold uppercase">Receipt</h2>
            <p class="text-sm text-gray-500">Order ID:${order._id.toString().slice(-6)}</p>
            <p class="text-sm text-gray-500">Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div class="mt-10 mb-8">
          <h3 class="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Bill To:</h3>
          <p class="font-bold text-lg">Shipping Address:${order.shippingAddress || "Customer"}</p>
          <p class="text-gray-600">Payment: ${order.paymentStatus}</p>
        </div>

        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b-2 border-gray-100">
              <th class="py-4 font-bold uppercase text-sm text-gray-400">Item</th>
              <th class="py-4 font-bold uppercase text-sm text-gray-400 text-center">Qty</th>
              <th class="py-4 font-bold uppercase text-sm text-gray-400 text-right">Price</th>
              <th class="py-4 font-bold uppercase text-sm text-gray-400 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
                  .map(
                        (item) => `
              <tr class="border-b border-gray-50">
                <td class="py-4">
                  <p class="font-bold text-gray-700">${item.productId.name || "Product"}</p>
                </td>
                <td class="py-4 text-center">${item.quantity}</td>
                <td class="py-4 text-right">${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(item.product.price)}</td>
                <td class="py-4 text-right font-semibold">${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(item.quantity * item.product.price)}</td>
              </tr>
            `,
                  )
                  .join("")}
          </tbody>
        </table>

        <div class="mt-10 flex justify-end">
          <div class="w-64">
            <div class="flex justify-between py-2">
              <span class="text-gray-500">Shipping</span>
              <span class="font-semibold">${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(order.shippingFee)}</span>
            </div>
            <div class="flex justify-between py-4 border-t-2 border-gray-100">
              <span class="text-xl font-bold text-gray-800">Total Paid</span>
              <span class="text-xl font-bold text-blue-600">${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        <div class="mt-20 text-center border-t border-gray-100 pt-8">
          <p class="text-gray-400 text-sm italic">Thank you for shopping with us! If you have any questions, contact support@kazafi.com</p>
        </div>
      </div>
    </body>
  </html>
  `;

      await page.setContent(htmlContent, { waitUntil: "networkidle0" });
      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

      await browser.close();
      return pdfBuffer;
};
