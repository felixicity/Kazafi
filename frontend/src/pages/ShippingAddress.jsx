import { useDispatch } from "react-redux";
import { saveShippingAddress } from "../slices/cart/clientCartSlice";
import { useNavigate } from "react-router-dom";

const ShippingAddress = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleShippingAddress = (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const address = Object.fromEntries(formData.entries());

            dispatch(saveShippingAddress(address)); //save in localStroage
            navigate("./checkout");
      };

      return (
            <div className="shipping-info-form">
                  <h2>Shipping address</h2>
                  <form onSubmit={(e) => handleShippingAddress(e)}>
                        <label htmlFor="country" className="country">
                              Country
                        </label>
                        <select id="country" name="country">
                              <option value="Nigeria">Nigeria</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Benin"> Benin Republic</option>
                        </select>
                        <div className="form-group">
                              <label htmlFor="state" className="form-label">
                                    State
                              </label>
                              <input type="text" className="form-input" id="state" name="state" />
                        </div>
                        <div className="form-group">
                              <label htmlFor="city" className="form-label">
                                    City
                              </label>
                              <input type="text" className="form-input" id="city" name="city" />
                        </div>
                        <div className="form-group">
                              <label htmlFor="home-address" className="form-label">
                                    Address
                              </label>
                              <input type="text" className="form-input" id="home-address" name="address" />
                        </div>
                        <div className="location">
                              <div className="form-group">
                                    <label htmlFor="busstop" className="form-label">
                                          Nearest bustop
                                    </label>
                                    <input type="text" className="form-input" id="busstop" name="busstop" />
                              </div>
                              <div className="form-group">
                                    <label htmlFor="postal-code" className="form-label">
                                          Postal Code
                                    </label>
                                    <input type="text" className="form-input" id="postal-code" name="postal-code" />
                              </div>
                        </div>
                        <div className="form-group">
                              <label htmlFor="contact-info" className="form-label">
                                    Contact Info
                              </label>
                              <input
                                    type="text"
                                    className="form-input"
                                    id="contact-info"
                                    placeholder="+234 000 300 3004"
                                    name="contact"
                              />
                        </div>

                        {/* <Link className="submit-info-btn" to="./checkout"> */}
                        <button>Continue to Delivery Method</button>
                  </form>
            </div>
      );
};

export default ShippingAddress;
