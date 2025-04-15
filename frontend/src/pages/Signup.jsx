import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useRegisterMutation } from "../slices/user/usersApiSlice";
import { setCredentials } from "../slices/user/clientAuthSlice";
import { useDispatch } from "react-redux";

const steps = [
      {
            title: "Get started quickly",
            description: "Create an account with us. Follow through all the steps to get verified.",
      },
      {
            title: "Select items by adding to cart",
            description:
                  "Adding items to wishlist or to cart is almost the same process. You can also increase the quantity and choose items by color.",
      },
      {
            title: "Seemless payment integration",
            description:
                  "Whether you are paying through paystack,flutterwave, google pay or with your card, we've got you covered. The whole process only takes few minutes.",
      },
      {
            title: "Timely delivery",
            description: "No late delivery, no delays. We deliver at the proposed date.",
      },
];

const Signup = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const [register, { isLoading }] = useRegisterMutation();

      const handleRegister = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const values = [...formData.values()];

            const data = {
                  email: values[0],
                  name: values[1],
                  password: values[2],
                  country: values[3],
                  newsletter: values[5] === "on" ? "true" : "false",
            };

            try {
                  const { email, name, password, country } = data;

                  const res = await register({ email, name, password, country });
                  dispatch(setCredentials({ ...res }));
                  navigate("/");
            } catch (error) {
                  console.log(error.message);
            }
      };

      return (
            <>
                  <Navigation />
                  <div className="signup wrapper">
                        <div className="signup_aside">
                              <div className="steps_to_use">
                                    <ul>
                                          {steps.map((step) => (
                                                <li key={step.title}>
                                                      <h3 className="step_title">{step.title}</h3>
                                                      <p className="step_desc">{step.description}</p>
                                                </li>
                                          ))}
                                    </ul>
                              </div>
                        </div>
                        <div className="form">
                              <form className="signup-form" onSubmit={(e) => handleRegister(e)}>
                                    <h2 className="form-header">Create an account</h2>
                                    <div className="form-group">
                                          <label htmlFor="email">Email</label>
                                          <input type="email" name="email" id="email" />
                                    </div>
                                    <div className="form-group">
                                          <label htmlFor="name">Fullname</label>
                                          <input type="text" name="name" id="name" />
                                    </div>
                                    <div className="form-group">
                                          <label htmlFor="password">Password</label>
                                          <input type="password" name="password" id="password" />
                                    </div>
                                    <div className="form-group">
                                          <label htmlFor="country">Country</label>
                                          <input list="countries" id="country" name="country" />
                                          <datalist id="countries">
                                                <option value="Nigeria">Nigeria</option>
                                                <option value="Ghana">Ghana</option>
                                                <option value="Benin">Benin Republic</option>
                                          </datalist>
                                    </div>
                                    <div className="get-newsletter form-group">
                                          <input type="checkbox" name="newsletter" id="newsletter" />
                                          <p>
                                                Get emails from kazafi about new deals, latest updates and events. You
                                                can <a href="/unsuscribe">unsuscribe</a> at any time.{" "}
                                                <a href="/policy">Privacy Policy</a>
                                          </p>
                                    </div>
                                    <button>Create account</button>
                              </form>
                              <p className="login-cta">
                                    Already have an account?{" "}
                                    <Link to="/login">
                                          <a href="">Sign in</a>
                                    </Link>
                              </p>
                        </div>
                  </div>

                  <Footer />
            </>
      );
};

export default Signup;
