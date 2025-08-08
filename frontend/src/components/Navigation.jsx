import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Button from "./Button";
import Avatar from "../utilities/Avatar";
import AjaxCart from "./AjaxCart";
import SearchInput from "./searchInput";
import { clearCredentials } from "../slices/user/clientAuthSlice";
import { useLogoutMutation } from "../slices/user/usersApiSlice";
import { calculateTotalQuantity, calculateTotalPrice } from "../slices/cart/clientCartSlice";
import "../css/components/navigation.css";
import { getFromLocalStorage } from "../utilities/localStorageUtils";
import ShoppingBag from "./ShoppingBag";

const Navigation = () => {
      const { totalQuantity } = getFromLocalStorage("cart", 0); // get current quantity of items frrm local storage
      const [userMenu, setUserMenu] = useState(false);
      const [showCart, setShowCart] = useState(false);
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const [logoutApiRequest] = useLogoutMutation();
      const { cartItems } = useSelector((state) => state.cart);
      const { userInfo } = useSelector((state) => state.auth);

      useEffect(() => {
            dispatch(calculateTotalQuantity());
            dispatch(calculateTotalPrice());
      }, [cartItems, dispatch]);

      async function handleLogout() {
            try {
                  const res = await logoutApiRequest().unwrap();
                  console.log(res);
                  dispatch(clearCredentials());
                  setUserMenu(false);
                  navigate("/");
            } catch (error) {
                  console.log(error.message);
            }
      }

      return (
            <header className="wrapper">
                  <div className="logo">Kazafi</div>
                  <nav className="desktop-nav">
                        <SearchInput />
                        <ul>
                              <li>
                                    <Link to="/">Home</Link>
                              </li>
                              <li>
                                    <Link to="/shop">Shop</Link>
                              </li>
                              <li>FAQ</li>
                              <li>Contact</li>
                        </ul>
                        <div className="icon-button-list">
                              <ShoppingBag totalQuantity={totalQuantity} setShowCart={setShowCart} />
                              {userInfo ? (
                                    <Avatar username="F" onclick={() => setUserMenu(!userMenu)} />
                              ) : (
                                    <Button className="login-btn" text="login" onclick={() => navigate("/login")} />
                              )}
                              {userMenu && (
                                    <ul className="user-options">
                                          <li>Profile</li>
                                          <li>orders</li>
                                          <li onClick={handleLogout}>logout</li>
                                    </ul>
                              )}
                        </div>
                        {showCart && <AjaxCart showCart={showCart} setShowCart={setShowCart} />}
                  </nav>
            </header>
      );
};

export default Navigation;
