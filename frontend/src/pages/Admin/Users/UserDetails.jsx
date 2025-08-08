import { FiCopy, FiEdit3, FiPower } from "react-icons/fi";
import RoundedBorderBtn from "../../../components/RoundedBorderBtn";
import { FaTimes, FaUserCheck, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const UserDetails = ({ userData, setShowUserDetails }) => {
      return (
            <div className="user-details">
                  <div className="user-details-header">
                        <FaTimes onClick={() => setShowUserDetails(false)} />
                        <RoundedBorderBtn icon={<FiEdit3 />} text="Edit user" />
                  </div>
                  <hr />
                  <div className="section">
                        <div className="user-info">
                              <div className="username">
                                    <h3>{userData[0].name}</h3> <FiCopy />
                              </div>
                              <div className="role">
                                    <FaUserCheck />
                                    <span>Customer</span>
                              </div>
                        </div>
                        <div className="message-user">
                              <RoundedBorderBtn icon={<FiPower />} text="active" />
                              <RoundedBorderBtn icon={<FaEnvelope />} text="Send email" />
                              <RoundedBorderBtn icon={<FaWhatsapp />} text="Send DM" />
                        </div>
                        <div> details order info status</div>
                        <hr />
                        {userData.map((details) => (
                              <div key={details.id}>
                                    <div className="details-field">
                                          <span>First name</span>
                                          <span>{details.name.split(" ")[0]}</span>
                                    </div>
                                    <div className="details-field">
                                          <span>Last name</span>
                                          <span>{details.name.split(" ")[1]}</span>
                                    </div>
                                    <div className="details-field">
                                          <span>Email</span>
                                          <span>{details.email}</span>
                                    </div>
                                    <div className="details-field">
                                          <span>Phone</span>
                                          <span>{details.phone}</span>
                                    </div>
                                    <div className="details-field">
                                          <span>Location</span>
                                          <span>
                                                {details.city}, {details.country}
                                          </span>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default UserDetails;
