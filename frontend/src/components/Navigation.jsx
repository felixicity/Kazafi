import Button from "./Button";
import Avatar from "../utilities/Avatar";
import SearchInput from "./searchInput";
import "../css/components/navigation.css";
import { useState } from "react";

const Navigation = () => {
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      return (
            <header className="wrapper">
                  <div className="logo">Kazafi</div>
                  <nav>
                        <SearchInput />
                        <ul>
                              <li>Home</li>
                              <li>Shop</li>
                              <li>FAQ</li>
                              <li>Contact</li>
                        </ul>
                        <div className="icon-button-list">
                              <button small-icon cart title="Cart">
                                    <svg
                                          width="24"
                                          height="24"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          className="icon-shopping-cart"
                                    >
                                          <path
                                                className="secondary"
                                                d="M7 4h14a1 1 0 0 1 .9 1.45l-4 8a1 1 0 0 1-.9.55H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
                                          />
                                          <path
                                                class="primary"
                                                d="M17.73 19a2 2 0 1 1-3.46 0H8.73a2 2 0 1 1-3.42-.08A3 3 0 0 1 5 13.17V4H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1v10h11a1 1 0 0 1 0 2H6a1 1 0 0 0 0 2h12a1 1 0 0 1 0 2h-.27z"
                                          />
                                    </svg>
                              </button>
                              {isLoggedIn ? (
                                    <Avatar username="F" />
                              ) : (
                                    <Button className="login-btn" text="login" onclick={() => setIsLoggedIn(true)} />
                              )}
                        </div>
                  </nav>
            </header>
      );
};

export default Navigation;
