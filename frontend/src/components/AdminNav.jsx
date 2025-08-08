import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
      FiMenu,
      FiHome,
      FiCreditCard,
      FiUser,
      FiLogOut,
      FiCompass,
      FiTable,
      FiPenTool,
      FiPercent,
      FiMessageSquare,
      FiLock,
} from "react-icons/fi";

const AdminNav = () => {
      const [collapsed, setCollapsed] = useState(false);
      const [activeNav, setActiveNav] = useState("Dashboard");

      const navigate = useNavigate();

      const navItems = [
            { name: "Dashboard", icon: <FiHome /> },
            { name: "Products", icon: <FiTable /> },
            { name: "Customers", icon: <FiUser /> },
            { name: "Orders", icon: <FiPenTool /> },
            { name: "Payments", icon: <FiCreditCard /> },
            { name: "Analytics and Reports", icon: <FiCompass /> },
            { name: "Promotions and Coupons", icon: <FiPercent /> },
            { name: "Messages and Requests", icon: <FiMessageSquare /> },
            { name: "Permissions", icon: <FiLock /> },
      ];

      const handleClick = (name) => {
            setActiveNav(name);
            if (name.toLowerCase() !== "dashboard") {
                  navigate(`./${name.split(" ")[0].toLowerCase()}`);
            } else {
                  navigate("/admin");
            }
      };

      return (
            <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                  <div>
                        <div className="sidebar-header">
                              <h1 className={`store-title ${collapsed ? "hidden" : ""}`}>Kazafi</h1>
                              <button onClick={() => setCollapsed(!collapsed)} className="menu-button">
                                    <FiMenu />
                              </button>
                        </div>
                        <nav className="nav-links">
                              {navItems.map((item) => (
                                    <a
                                          key={item.name}
                                          className={`nav-link ${activeNav === item.name ? "active" : ""}`}
                                          onClick={() => handleClick(item.name)}
                                    >
                                          {item.icon}
                                          {!collapsed && <span className="nav-text">{item.name}</span>}
                                    </a>
                              ))}
                        </nav>
                  </div>
                  <div className="admin-logout">
                        <a>
                              <FiLogOut />
                              {!collapsed && <span className="nav-text">Logout</span>}
                        </a>
                  </div>
            </div>
      );
};

export default AdminNav;
