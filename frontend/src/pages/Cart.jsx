import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import RoundedBorderBtn from "../components/RoundedBorderBtn";
import { useGetCartQuery } from "../slices/cart/cartApiSlice";

const Cart = () => {
      const { data, isLoading, error } = useGetCartQuery();

      if (isLoading) return <p>Loading products...</p>;
      if (error) return <p>Something went wrong!</p>;

      // If your API returns { products: [...] }
      const cart = data?.cart.items ?? [];

      //   console.log(cart)

      let cartItems;
      if (cart.product === "") {
            cartItems = (
                  <>
                        <h2>Your Shopping Cart is Empty!</h2> <button>Check Our Collections</button>
                  </>
            );
      } else {
            // getCart.cart.items.product
            cartItems = cart.map((item) => (
                  <div className="cart-product" key={item.product._id}>
                        <div className="cart-product-img">
                              <img src={`http://localhost:5000/${item.product?.images[0]}`} alt={item.product?.name} />
                        </div>
                        <div className="product-details">
                              <p className="product-name">{item.product?.name}</p>
                              <p className="product-title">{item.product?.title}</p>
                              <p className="product-price">{item.product?.price}</p>
                              <div className="product-available">
                                    <div>
                                          Qty: <span>{item.quantity}</span>
                                    </div>
                                    <p>Only {item.product.stock} available in stock</p>
                              </div>
                              <div className="product-color">
                                    <div className="chosen-product-color">
                                          <span style={{ backgroundColor: `${item.product?.colors}` }}></span>
                                          {item.product?.colors}
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
                              <h2>Shopping cart</h2> <span>{cart.length} item</span>
                        </header>
                        <hr />
                        {cartItems}
                  </div>
                  {cart.length && (
                        <aside className="order-summary">
                              <header>
                                    <h2>Order summary</h2>
                              </header>
                              <hr />
                              <p className="sales-tax-info">
                                    The sales tax is calculated when you select shipping address at checkout.
                              </p>
                              <div className="order-detail">
                                    <p>My Cart ({cart.length} item)</p> <span>${cart[0].product.price}</span>
                              </div>
                              <div className="order-detail">
                                    <p>Sales tax </p> <span>--</span>
                              </div>
                              <div className="order-detail">
                                    <p>Import duties</p> <span>$1200</span>
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
                                    <span>$1200</span>
                              </div>
                              <Link className="checkout-btn" to="./information">
                                    Secure checkout
                              </Link>
                        </aside>
                  )}
            </div>
      );
};

export default Cart;
