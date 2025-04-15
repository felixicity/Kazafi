import { Link } from "react-router-dom";

const AdminNav = () => {
      return (
            <div className="admin-navigation">
                  <Link>
                        <li>Home</li>
                  </Link>
                  <Link>
                        <li>Products</li>
                  </Link>
                  <Link>
                        <li>Customers</li>
                  </Link>
                  <Link>
                        <li>Orders</li>
                  </Link>
                  <Link>
                        <li>Payments</li>
                  </Link>
                  <Link>
                        <li>Sales and Analytics</li>
                  </Link>
                  <Link>
                        <li>Promotions and Coupons</li>
                  </Link>
                  <Link>
                        <li>Inventory</li>
                  </Link>
            </div>
      );
};

export default AdminNav;
