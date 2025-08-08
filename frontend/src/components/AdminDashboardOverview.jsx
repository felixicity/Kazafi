import AdminGreeting from "./AdminGreeting";
import StatsGrid from "./StatsGrid";
import SalesChart from "./SalesChart";
import RecentOrdersTable from "./RecentOrdersTable";
import NotificationsCard from "./NotificationsCard";

const AdminDashboardOverview = () => {
      return (
            <div className="dashboard-overview">
                  <AdminGreeting />
                  <div className="dashboard-summary">
                        <StatsGrid />
                        <SalesChart />
                        <RecentOrdersTable />
                        <NotificationsCard />
                  </div>
            </div>
      );
};

export default AdminDashboardOverview;
