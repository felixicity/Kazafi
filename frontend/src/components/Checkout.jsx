import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../slices/cart/clientCartSlice";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { savePaymentMethod } from "../slices/cart/clientCartSlice";
import { useMakePaymentMutation } from "../slices/paymentApiSlice";
import Modal from "./Modal";

const Checkout = () => {
      const [delivery, setDelivery] = useState("");
      const [showAddress, setShowAddress] = useState(false);

      const [createOrder, { isLoading }] = useCreateOrderMutation();
      const [makePayment, { error }] = useMakePaymentMutation();
      const dispatch = useDispatch();

      const storePaymentMethod = (e) => {
            dispatch(savePaymentMethod(e.target.value));
            // setPayment(e.target.value);
      };

      const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

      const handleOrder = async (e) => {
            e.preventDefault();

            try {
                  const res = await createOrder({
                        deliveryMethod: delivery,
                        shippingAddress: delivery == "delivery" ? shippingAddress : "local pick-up",
                        paymentMethod,
                  }).unwrap();

                  const payment = await makePayment({
                        orderId: res.order._id,
                        provider: res.order.paymentMethod,
                  }).unwrap();
                  console.log(payment);

                  if (payment) {
                        dispatch(clearCart);
                        window.location.href = payment.paymentUrl;
                  }
            } catch (err) {
                  console.log(err?.data?.message || err.error);
            }
      };
      const handleClick = (e) => {
            setDelivery(e.target.value);
            setShowAddress(true);
      };

      return (
            <div className="checkout-steps">
                  <details>
                        <summary>Delivery method</summary>
                        <div className="delivery-options">
                              <div
                                    className="input-group"
                                    onClick={() => document.getElementById("store-pickup").click()}
                              >
                                    <input
                                          type="radio"
                                          name="delivery-option"
                                          id="store-pickup"
                                          value="store-pickup"
                                          onClick={(e) => setDelivery(e.target.value)}
                                    />
                                    <span>Pick up in store</span>
                              </div>
                              <div className="input-group" onClick={() => document.getElementById("delivery").click()}>
                                    <input
                                          type="radio"
                                          name="delivery-option"
                                          id="delivery"
                                          value="delivery"
                                          onClick={handleClick}
                                    />
                                    <span>Delivery</span>
                              </div>
                        </div>
                  </details>
                  <Modal
                        isOpen={showAddress}
                        buttonPrimaryText="Continue"
                        buttonSecondaryText="Change address"
                        title="Address Confirmation"
                        text="Continue with this address?"
                        onClose={() => setShowAddress(false)}
                        secondaryTask={"I am only secondary"}
                  >
                        <p>Divine International Academy, Rafin Zurfi, Bauchi State, Nigeria.</p>
                  </Modal>
                  <details>
                        <summary>Payment information</summary>
                        <h3>Pay with:</h3>
                        <div className="payment-options">
                              <div className="input-group" onClick={() => document.getElementById("paystack").click()}>
                                    <input
                                          type="radio"
                                          name="payment-option"
                                          id="paystack"
                                          value="paystack"
                                          onClick={(e) => storePaymentMethod(e)}
                                    />
                                    <span>Paystack(Card, USSD, Bank transfer)</span>
                              </div>
                              <div
                                    className="input-group"
                                    onClick={() => document.getElementById("flutterwave").click()}
                              >
                                    <input
                                          type="radio"
                                          name="payment-option"
                                          id="flutterwave"
                                          value="flutterwave"
                                          onClick={(e) => storePaymentMethod(e)}
                                    />
                                    <span>Flutterwave</span>
                              </div>
                              <div className="input-group" onClick={() => document.getElementById("cash").click()}>
                                    <input
                                          type="radio"
                                          name="payment-option"
                                          id="cash"
                                          value="cash-on-delivery"
                                          onClick={(e) => storePaymentMethod(e)}
                                    />
                                    <span>Cash on delivery</span>
                              </div>
                              <div className="input-group" onClick={() => document.getElementById("qrcode").click()}>
                                    <input
                                          type="radio"
                                          name="payment-option"
                                          id="qrcode"
                                          value="qrcode"
                                          onClick={(e) => storePaymentMethod(e)}
                                    />
                                    <span>QR code</span>
                              </div>
                        </div>

                        {/* <form action="" className="card-details">
                              <div className="form-group">
                                    <label htmlFor="card-number">Card number</label>
                                    <input type="text" id="card-number" placeholder="1234 1234 1234 1234" />
                              </div>
                              <div className="location">
                                    <div className="form-group">
                                          <label htmlFor="exp">Expiry date</label>
                                          <input type="text" id="exp" placeholder="MM / YY" />
                                    </div>
                                    <div className="form-group">
                                          <label htmlFor="cvc">Security code</label>
                                          <input type="text" id="cvc" placeholder="CVC" />
                                    </div>
                              </div>
                              <div className="location">
                                    <div className="form-group">
                                          <label htmlFor="country">Country</label>
                                          <input type="text" id="country" placeholder="Nigeria" />
                                    </div>
                                    <div className="form-group">
                                          <label htmlFor="postal-code">Postal Code</label>
                                          <input type="text" id="postal-code" />
                                    </div>
                              </div>
                        </form> */}
                  </details>
                  <details>
                        <summary>Order confirmation</summary>
                        <div className="confirm-order">
                              <p>I have thoroughly checked through the order and I am ready to pay </p>
                              <input
                                    type="button"
                                    value={isLoading ? "Processing order ..." : "Pay now"}
                                    disabled={isLoading}
                                    onClick={handleOrder}
                              />
                        </div>
                  </details>
            </div>
      );
};

export default Checkout;
