import { useState } from "react";
const Tabs = () => {
      const [activeTab, setActiveTab] = useState("Inventory");

      return (
            <div className="tabs">
                  <button
                        className={activeTab === "Inventory" ? "active" : ""}
                        onClick={() => setActiveTab("Inventory")}
                  >
                        Inventory
                  </button>
                  <button className={activeTab === "Reviews" ? "active" : ""} onClick={() => setActiveTab("Reviews")}>
                        Reviews
                  </button>
            </div>
      );
};

export default Tabs;
