import { useState } from "react";
import Tabs from "../../../components/Tabs";
import StatsCard from "../../../components/StatsCard";

const stats = [
      { title: "Revenue overtime", value: "₦2.3M", change: "+12%", color: "green" },
      { title: "Bestselling products", value: "4", change: "+5%", color: "blue" },
];

const AnalyticsDashboard = () => {
      const tabs = ["sales", "customers", "inventory"];

      const [activeTab, setActiveTab] = useState(tabs[0]);

      return (
            <div>
                  <h2>All Analytics</h2>
                  <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

                  {activeTab == tabs[0] && (
                        <div className="sales-report">
                              <h4>Sales report</h4>
                              <div className="stats-grid">
                                    {stats.map((stat) => (
                                          <StatsCard key={stat.title} stat={stat} />
                                    ))}
                              </div>
                        </div>
                  )}
                  {activeTab == tabs[1] && (
                        <div className="customer-report">
                              <h4>Customer report</h4>
                        </div>
                  )}

                  {activeTab == tabs[2] && (
                        <div className="inventory-report">
                              <h4>Inventory report</h4>
                        </div>
                  )}
            </div>
      );
};

export default AnalyticsDashboard;
