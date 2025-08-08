import { FiBell, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminHeader = () => {
      return (
            <div className="dashboard-header">
                  <Link>
                        <FiBell color="black" size={24} />
                  </Link>
                  <Link>
                        <FiSettings color="black" size={24} />
                  </Link>
            </div>
      );
};

export default AdminHeader;
