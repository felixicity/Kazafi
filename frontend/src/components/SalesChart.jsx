import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
      { name: "Jan", sales: 4000 },
      { name: "Feb", sales: 3000 },
      { name: "Mar", sales: 5000 },
      { name: "Apr", sales: 300 },
      { name: "May", sales: 50 },
      { name: "Jun", sales: 10000 },
      { name: "Jul", sales: 8000 },
];

const SalesChart = () => (
      <div className="chart-card">
            <h2 className="chart-title">Monthly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke="#4f46e5" />
                  </LineChart>
            </ResponsiveContainer>
      </div>
);

export default SalesChart;
