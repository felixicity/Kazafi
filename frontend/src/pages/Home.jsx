import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Featured from "../components/Featured";
import GroupingList, { category } from "../components/GroupingList";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../css/index.css";
import HomeProductCard from "../components/HomeProductCard";

const Home = () => {
      const { userInfo } = useSelector((state) => state.auth);
      return (
            <>
                  <div className="header">
                        <div className="secondary-nav wrapper">
                              <ul>
                                    {!userInfo && (
                                          <li title="sign up">
                                                <Link className="link p-2 bg-orange-500" to="/signup">
                                                      Sign up
                                                </Link>
                                          </li>
                                    )}
                                    <li title="make enquires">Kazafi Help Center</li>
                                    <li title="about us">About Us</li>
                                    <li title="change currency">Currency</li>
                                    <li title="change language">Language</li>
                              </ul>
                        </div>
                        <Navigation />
                        <main className="wrapper home-main">
                              <div className="hero">
                                    <h1 className="hero-header">Create your style</h1>
                                    <p>
                                          Shop from Africa&apos;s finest Resources. Crafted by the best. Where color and
                                          culture combine to meet your taste.
                                    </p>
                                    <div className="ctas">
                                          <a className="primary-cta" href="/">
                                                Shop Now
                                          </a>
                                          <a className="secondary-cta" href="/">
                                                Browse Collections
                                          </a>
                                    </div>
                              </div>
                              {/* <img className="carousel-1" src="/kazafi/eno-chair.png" alt="eno-chair" /> */}
                        </main>
                  </div>
                  <GroupingList>
                        {category.map((cat) => (
                              <li key={cat}>
                                    <Link className="cat-link" to={`/shop/${cat}`}>
                                          {cat}
                                    </Link>
                              </li>
                        ))}
                  </GroupingList>
                  <Featured />
                  <HomeProductCard />
                  <Footer />
            </>
      );
};

export default Home;
