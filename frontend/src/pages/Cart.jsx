import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import RoundedBorderBtn from "../components/RoundedBorderBtn";
import { useGetCartQuery } from "../slices/cart/cartApiSlice";

const Cart = () => {
      const { data, isLoading, error } = useGetCartQuery();

      if (isLoading) return <p>Loading products...</p>;
      if (error) return <p>Something went wrong!</p>;

      // If your API returns { products: [...] }

      const cart = data?.cart ?? {};
      const cartItems = cart.items ?? [];

      //   console.log(cart)

      let cartItemsList;
      if (cartItems.product === "") {
            cartItemsList = (
                  <>
                        <h2>Your Shopping Cart is Empty!</h2> <button>Check Our Collections</button>
                  </>
            );
      } else {
            // getCart.cart.items.product
            cartItemsList = cartItems.map((item) => (
                  <div className="cart-product" key={item.variation._id}>
                        <div className="cart-product-details">
                              <div className="details">
                                    <p className="product-name">{item.product?.name}</p>
                                    <p className="product-title">{item.product?.title}</p>
                                    <p className="product-price">&#8358;{item.variation.price}</p>
                                    <div className="product-available">
                                          <div>
                                                Qty: <span>{item.quantity}</span>
                                          </div>
                                          <p>Only {item.variation?.stock} available in stock</p>
                                    </div>{" "}
                              </div>
                              <img src={item.variation?.imageURLs[0]} alt={item.product?.name} />
                        </div>
                        <div className="product-details">
                              <div className="product-color">
                                    <div className="chosen-product-color">
                                          <span style={{ backgroundColor: `${item.variation?.hexCode}` }}></span>
                                          {item.variation?.color}
                                    </div>
                                    <RoundedBorderBtn icon={<FiEdit2 />} text="Edit" />
                              </div>
                        </div>
                  </div>
            ));
      }

      return (
            <div className="shopping-cart wrapper">
                  <div className="cart-items">
                        <header>
                              <h2>Shopping cart</h2> <span>{cartItems.length} items</span>
                        </header>
                        <hr />
                        {cartItemsList}
                  </div>
                  {cartItems.length && (
                        <aside className="order-summary">
                              <header>
                                    <h2>Order summary</h2>
                              </header>
                              <hr />
                              <p className="sales-tax-info">
                                    The sales tax is calculated when you select shipping address at checkout.
                              </p>
                              <div className="order-detail">
                                    <p>My Cart ({cartItems.length} item)</p> <span>&#8358;{cart.totalAmount}</span>
                              </div>

                              <div className="order-detail">
                                    <p>Import duties</p> <span>-- &#8358; 1800</span>
                              </div>
                              <label htmlFor="promo" id="promo-label">
                                    Add promotional code
                              </label>
                              <div className="promo-code">
                                    <input id="promo" type="text" placeholder="Discount code in giftcard" />
                                    <button>Apply</button>
                              </div>
                              <div className="order-detail order-total">
                                    <p>
                                          Total (exluding <br /> shipping fee):
                                    </p>
                                    <span>&#8358; {cart.totalAmount}</span>
                              </div>
                              <Link className="checkout-btn" to="./information">
                                    Proceed to checkout
                              </Link>
                        </aside>
                  )}
            </div>
      );
};

export default Cart;
