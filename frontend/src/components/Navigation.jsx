import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";
import Avatar from "../utilities/Avatar";
import AjaxCart from "./AjaxCart";
import SearchInput from "./searchInput";
import { clearCredentials } from "../slices/user/clientAuthSlice";
import { useLogoutMutation } from "../slices/user/usersApiSlice";
import "../css/components/navigation.css";

const Navigation = ({ userInfo, dispatch }) => {
      const [userMenu, setUserMenu] = useState(false);
      const [showCart, setShowCart] = useState(false);
      const navigate = useNavigate();
      const [logoutApiRequest] = useLogoutMutation();

      async function handleLogout() {
            try {
                  await logoutApiRequest().unwrap();
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
                  <nav>
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
                              <img
                                    src="./icons/shopping_bag.svg"
                                    alt="shopping bag"
                                    onClick={() => setShowCart(true)}
                              />
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
