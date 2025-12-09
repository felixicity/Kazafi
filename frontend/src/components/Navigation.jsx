import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Button from "./Button";
import Avatar from "../utilities/Avatar";
import AjaxCart from "./AjaxCart";
import { clearCredentials } from "../slices/user/clientAuthSlice";
import { useLogoutMutation } from "../slices/user/usersApiSlice";
import "../css/components/navigation.css";
import ShoppingBag from "./ShoppingBag";
import { useGetCartQuery } from "../slices/cart/cartApiSlice";

const Navigation = () => {
      // get current quantity of items frrm local storage
      const [userMenu, setUserMenu] = useState(false);
      const [showCart, setShowCart] = useState(false);
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const [logoutApiRequest] = useLogoutMutation();
      const { data } = useGetCartQuery();
      const totalQuantity = data?.cart?.totalQuantity;

      const { userInfo } = useSelector((state) => state.auth);

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
                  <nav className="desktop-nav">
                        <div className="logo">Kazafi</div>
                        <ul>
                              <li>
                                    <Link className="link" to="/">
                                          Home
                                    </Link>
                              </li>
                              <li>
                                    <Link className="link" to="/shop">
                                          Shop
                                    </Link>
                              </li>
                              <li>FAQ</li>
                        </ul>
                        <div className="icon-button-list">
                              <ShoppingBag totalQuantity={totalQuantity} setShowCart={setShowCart} />
                              {userInfo ? (
                                    <Avatar username={userInfo.user.name[0]} onclick={() => setUserMenu(!userMenu)} />
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
