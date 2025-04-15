import AdminHeader from "../../components/AdminHeader";
import AdminNav from "../../components/adminNav";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
      return (
            <div className="admin-dashboard">
                  <AdminNav />
                  <div className="admin-main">
                        <AdminHeader />
                        <Outlet />
                  </div>
            </div>
      );
};

export default AdminPage;
