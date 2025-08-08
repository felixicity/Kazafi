import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutLayout = () => {
      const { totalPrice, totalQuantity } = useSelector((state) => state.cart);

      return (
            <div className="checkout wrapper">
                  <div className="checkout-process">
                        <Outlet />
                  </div>
                  <aside className="order-summary">
                        <header>
                              <h2>Order summary</h2>
                        </header>
                        <hr />
                        <p className="sales-tax-info">
                              The sales tax is calculated when you select shipping address at checkout.
                        </p>
                        <div className="order-detail">
                              <p>My Cart ({totalQuantity})</p> <span>${totalPrice}</span>
                        </div>
                        <div className="order-detail">
                              <p>Sales tax </p> <span>--</span>
                        </div>
                        <div className="order-detail">
                              <p>Import duties</p> <span>$10</span>
                        </div>

                        <div className="order-detail order-total">
                              <p>
                                    Total (exluding <br /> shipping fee):
                              </p>{" "}
                              <span>${totalPrice - 10}</span>
                        </div>
                  </aside>
            </div>
      );
};

export default CheckoutLayout;
