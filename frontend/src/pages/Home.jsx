import Featured from "../components/Featured";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../css/index.css";

const Home = () => {
      return (
            <>
                  <div className="header">
                        <div className="secondary-nav wrapper">
                              <ul>
                                    <li title="sign in">Sign in</li>
                                    <li title="make enquires">Kazafi Help Center</li>
                                    <li title="about us">About Us</li>
                                    <li title="change currency">Currency</li>
                                    <li title="change language">Language</li>
                              </ul>
                        </div>
                        <Navigation />
                        <main className="wrapper">
                              <div className="hero">
                                    <em>
                                          <h1 className="hero-header">
                                                You love it ? <br /> We Sell it.
                                          </h1>
                                    </em>
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
                              <img
                                    className="carousel-1"
                                    src="./kazafi/eno-chair-occasional-chairs-39871458214110-Photoroom (1).png"
                                    alt="sofa"
                              />
                        </main>
                  </div>
                  <Featured />
                  <Footer />
            </>
      );
};

export default Home;
