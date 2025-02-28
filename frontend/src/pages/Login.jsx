const Login = () => {
      return (
            <div className="login wrapper">
                  <div className="form">
                        <form className="login-form">
                              <h2 className="form-header">Sign in to your account</h2>
                              <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" />
                              </div>

                              <div className="form-group">
                                    <label htmlFor="password">
                                          <span>Password</span> <a href="/">Forgot your password?</a>
                                    </label>
                                    <div className="password">
                                          <input type="password" name="password" id="password" vi />
                                          <img width={24} src="./icons/visibility_hidden.svg" alt="eye" />
                                    </div>
                              </div>
                              <div className="get-newsletter form-group">
                                    <input type="checkbox" name="newsletter" id="newsletter" />
                                    <p>Remember me on this device</p>
                              </div>
                              <button>Sign in</button>
                        </form>
                        <p className="signup-cta">
                              New to Kazafi? <a href="/login">Create account</a>
                        </p>
                  </div>
            </div>
      );
};

export default Login;
