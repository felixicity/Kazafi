import StatsCard from "./StatsCard";

const stats = [
      { title: "Total Sales", value: "₦2.3M", change: "+12%", color: "green" },
      { title: "New Orders", value: "86", change: "+5%", color: "blue" },
      { title: "Customers", value: "450", change: "+2%", color: "indigo" },
];

const StatsGrid = () => (
      <div className="stats-grid">
            {stats.map((stat) => (
                  <StatsCard key={stat.title} stat={stat} />
            ))}
      </div>
);

export default StatsGrid;
