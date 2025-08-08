import { useState } from "react";
import UserTable from "./UserTable";
import { FaEnvelope, FaPlus } from "react-icons/fa";
import RoundedBorderBtn from "../../../components/RoundedBorderBtn";
import data from "../../../utilities/userData";
import UserDetails from "./UserDetails";

const UserDashboard = () => {
      const [showUserDetails, setShowUserDetails] = useState(false);
      const [userData, setUserData] = useState(null);

      const handleClick = (userId) => {
            setUserData(data.filter((user) => user.id == userId));
            setShowUserDetails(true);
      };

      return (
            <div>
                  <h2>All customers</h2>
                  <div className="admin-actions">
                        <RoundedBorderBtn icon={<FaPlus />} text="Add user" />
                        <RoundedBorderBtn icon={<FaEnvelope />} text="Email all" />
                  </div>
                  <div className="filters"></div>
                  <UserTable handleClick={handleClick} />
                  {showUserDetails && <UserDetails userData={userData} setShowUserDetails={setShowUserDetails} />}
            </div>
      );
};

export default UserDashboard;
