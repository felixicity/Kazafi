import { useState } from "react";
import RoundedBorderBtn from "../../../components/RoundedBorderBtn";
import { FaCaretDown, FaPrint, FaTimes } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import DropdownButton from "../../../components/DropdownButton";
import Tabs from "../../../components/Tabs";

const OrderDetails = ({ orderData, setShowOrderDetails }) => {
      const tabs = ["items", "shipping-info", "payment status"];

      const [activeTab, setActiveTab] = useState(tabs[0]);
      const options = ["processing", "shipped", "delivered", "cancelled"];

      const { id, customer, items, shipping, payment, date } = orderData[0];

      //   const handleDropdown = () => {};

      return (
            <div className="order-details">
                  <div className="order-details-header">
                        <FaTimes onClick={() => setShowOrderDetails(false)} />
                        <RoundedBorderBtn icon={<FaPrint />} text="Print invoice" />
                  </div>
                  <hr />
                  <div className="section">
                        <div className="order-info">
                              <h3>
                                    <span>{id}</span> <FiCopy />
                              </h3>
                              <p>Customer : {customer}</p>
                              <p>Date : {date} </p>
                        </div>
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

                        {activeTab == tabs[0] && (
                              <div>
                                    <p>
                                          {items.map((el) => (
                                                <div key={el.name}>{el.name}</div>
                                          ))}
                                    </p>
                              </div>
                        )}

                        {activeTab == tabs[1] && (
                              <div className="shipping-info">
                                    <p>Shipping information</p>
                                    <DropdownButton initialOption={shipping} icon={<FaCaretDown />} options={options} />
                              </div>
                        )}

                        {activeTab == tabs[2] && (
                              <div className="payment-status">
                                    <p>Payment status</p>
                                    <RoundedBorderBtn text={payment} />
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default OrderDetails;
