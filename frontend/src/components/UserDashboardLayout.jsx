import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { FiMenu, FiHome, FiUser, FiSettings, FiMessageSquare, FiLogOut, FiShoppingBag } from "react-icons/fi";

const UserDashboardLayout = () => {
      const [collapsed, setCollapsed] = useState(false);

      const navItems = [
            { name: "Dashboard", icon: <FiHome />, path: "#" },
            { name: "Orders", icon: <FiShoppingBag />, path: "#" },
            { name: "Profile", icon: <FiUser />, path: "#" },
            { name: "Messages", icon: <FiMessageSquare />, path: "#" },
            { name: "Preferences", icon: <FiSettings />, path: "#" },
            { name: "Logout", icon: <FiLogOut />, path: "#" },
      ];

      return (
            <>
                  <div className="dashboard-container">
                        {/* Sidebar */}
                        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                              <div className="sidebar-header">
                                    <h1 className={`store-title ${collapsed ? "hidden" : ""}`}>Kazafi</h1>
                                    <button onClick={() => setCollapsed(!collapsed)} className="menu-button">
                                          <FiMenu />
                                    </button>
                              </div>
                              <nav className="nav-links">
                                    {navItems.map((item) => (
                                          <a key={item.name} href={item.path} className="nav-link">
                                                {item.icon}
                                                {!collapsed && <span className="nav-text">{item.name}</span>}
                                          </a>
                                    ))}
                              </nav>
                        </div>

                        {/* Main Content */}
                        <Outlet />
                  </div>
                  <Footer />
            </>
      );
};

export default UserDashboardLayout;
