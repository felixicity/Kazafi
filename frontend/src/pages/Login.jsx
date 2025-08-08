import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/user/usersApiSlice";
import { setCredentials } from "../slices/user/clientAuthSlice";

const Login = () => {
      const [showPassword, setShowPassword] = useState(false);
      const passwordRef = useRef(null);

      const navigate = useNavigate();
      const dispatch = useDispatch();

      const [login, { isLoading }] = useLoginMutation();
      const { userInfo } = useSelector((state) => state.auth);

      useEffect(() => {
            if (userInfo) {
                  navigate("/");
            }
      }, [userInfo, navigate]);

      const handleLogin = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            const values = [...formData.values()];

            const data = {
                  email: values[0],
                  password: values[1],
                  newsletter: values[2] === "on" ? "true" : "false",
            };

            try {
                  const { email, password } = data;
                  const res = await login({ email, password }).unwrap();
                  console.log(res);
                  dispatch(setCredentials({ ...res }));
                  navigate("/");
            } catch (err) {
                  console.log(err?.data?.message || err.error);
            }
      };

      const handleShowPassword = () => {
            setShowPassword(!showPassword);
      };

      return (
            <div className="login wrapper">
                  <Link to=".." className="go-back">
                        Go Back
                  </Link>

                  <div className="form">
                        <form className="login-form" onSubmit={(e) => handleLogin(e)}>
                              <h2 className="form-header">Sign in to your account</h2>
                              <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" />
                              </div>

                              <div className="form-group">
                                    <label htmlFor="password">
                                          <span>Password</span> <a href="/">Forgot your password?</a>
                                    </label>
                                    <div className="password" ref={passwordRef}>
                                          <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                // value={showPassword && passwordRef.current.children[0].value}
                                          />
                                          <img
                                                width={24}
                                                src={
                                                      showPassword
                                                            ? "./icons/visibility.svg"
                                                            : "./icons/visibility_hidden.svg"
                                                }
                                                alt="eye"
                                                onClick={handleShowPassword}
                                          />
                                    </div>
                              </div>
                              <div className="get-newsletter form-group">
                                    <input type="checkbox" name="newsletter" id="newsletter" />
                                    <p>Remember me on this device</p>
                              </div>
                              <button disabled={isLoading ? true : false}>Sign in</button>
                        </form>
                        <p className="signup-cta">
                              New to Kazafi?{" "}
                              <Link to="/signup">
                                    <a href="">Create account</a>
                              </Link>
                        </p>
                  </div>
            </div>
      );
};

export default Login;
