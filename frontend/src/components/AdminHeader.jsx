import { Link } from "react-router-dom";

const AdminHeader = () => {
      return (
            <div className="dashboard-header">
                  <Link>
                        <li>Notifications icon</li>
                  </Link>
                  <Link>
                        <li>Settings icon</li>
                  </Link>
            </div>
      );
};

export default AdminHeader;
