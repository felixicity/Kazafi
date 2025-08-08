const Tabs = ({ activeTab, setActiveTab, tabs }) => {
      return (
            <div className="tabs">
                  <span className={activeTab == tabs[0] ? "active" : ""} onClick={() => setActiveTab(tabs[0])}>
                        {tabs[0]}
                  </span>
                  <span className={activeTab == tabs[1] ? "active" : ""} onClick={() => setActiveTab(tabs[1])}>
                        {tabs[1]}
                  </span>
                  <span className={activeTab == tabs[2] ? "active" : ""} onClick={() => setActiveTab(tabs[2])}>
                        {tabs[2]}
                  </span>
            </div>
      );
};

export default Tabs;
