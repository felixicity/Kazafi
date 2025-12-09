import { useState } from "react";
import RoundedBorderBtn from "../../../components/RoundedBorderBtn";
import { FaCaretDown, FaPrint, FaTimes } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import DropdownButton from "../../../components/DropdownButton";
import Tabs from "../../../components/Tabs";

const OrderDetails = ({ orders, setShowOrderDetails }) => {
      const tabs = ["items", "shipping-info", "payment status"];

      const [activeTab, setActiveTab] = useState(tabs[0]);
      const options = ["processing", "shipped", "delivered", "cancelled"];

      const { _id, customer, items, orderStatus, paymentStatus, createdAt } = orders;

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
                                    <span> {_id}</span> <FiCopy />
                              </h3>
                              <p>Customer : {customer.name}</p>
                              <p>Date : {createdAt.split("T")[0]} </p>
                        </div>
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

                        {activeTab == tabs[0] && (
                              <div>
                                    {items.map((el) => (
                                          <div className="order-items" key={el._id}>
                                                <div className="item-img">
                                                      <img src={el.product.imageURLs[0]} alt={el.productId.name} />
                                                </div>
                                                <div className="item-detail-column">
                                                      <span className="item-name">{el.productId.name}</span>{" "}
                                                      <span>{el.product.color}</span>
                                                </div>
                                                <div className="item-detail-column">
                                                      <span className="item-price">{el.product.price}</span>
                                                      <span>X{el.quantity}</span>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        )}

                        {activeTab == tabs[1] && (
                              <div className="shipping-info">
                                    <p>Shipping information</p>
                                    <DropdownButton
                                          initialOption={orderStatus}
                                          icon={<FaCaretDown />}
                                          options={options}
                                    />
                              </div>
                        )}

                        {activeTab == tabs[2] && (
                              <div className="payment-status">
                                    <p>Payment status</p>
                                    <RoundedBorderBtn text={paymentStatus} />
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default OrderDetails;
