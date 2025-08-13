import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
      increaseItemQty,
      decreaseItemQty,
      removeFromCart as clientRemoveFromCart,
} from "../slices/cart/clientCartSlice";
import { getFromLocalStorage } from "../utilities/localStorageUtils";
import { useRemoveFromCartMutation } from "../slices/cart/cartApiSlice";
import ShoppingBag from "./ShoppingBag";

const AjaxCart = ({ showCart, setShowCart }) => {
      const { cartItems, totalQuantity, totalPrice } = getFromLocalStorage("cart", []);

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const [removeFromCart] = useRemoveFromCartMutation();

      const handleRemoveFromCart = async (itemId) => {
            try {
                  const res = await removeFromCart(itemId).unwrap();
                  console.log(res);
                  dispatch(clientRemoveFromCart(itemId));
            } catch (error) {
                  console.error("Error removing item:", error);
            }
      };

      const handleDecreaseQty = async (itemQty, id) => {
            if (itemQty == 1) {
                  await removeFromCart(id);
                  dispatch(clientRemoveFromCart(id));
                  return;
            }
            dispatch(decreaseItemQty(id));
      };

      let cartProducts;

      if (cartItems.length === 0) {
            cartProducts = (
                  <div>
                        <h4>Your Cart is Empty Right Now!</h4>
                        <a>Pick some of our Items</a>
                  </div>
            );
      } else {
            cartProducts = cartItems.map((product) => (
                  <div className="cart-product" key={`${product.id}`}>
                        <div className="cart-product-img">
                              <img src={product?.image} alt={product.name} />
                        </div>
                        <div className="item-details">
                              <p className="item-name">{product?.name}</p>
                              <p className="item-title">{product?.title}</p>
                              <div className="edit-item-qty">
                                    <span
                                          onClick={() => {
                                                dispatch(increaseItemQty(product.id));
                                          }}
                                    >
                                          +
                                    </span>
                                    <span>{product.quantity}</span>
                                    <span onClick={() => handleDecreaseQty(product.quantity, product.id)}>-</span>
                              </div>
                        </div>
                        <div className="price">
                              <p>&#8358;{product.price}</p>
                              <p onClick={() => handleRemoveFromCart(product.id)}>DELETE</p>
                        </div>
                  </div>
            ));
      }

      return (
            <>
                  {showCart && (
                        <div className="ajax-cart">
                              <div className="ajax-cart_header">
                                    <FaTimes onClick={() => setShowCart(false)} />
                                    <h2>Your Cart</h2>
                                    <ShoppingBag totalQuantity={totalQuantity} />
                              </div>
                              <div className="cart-items">{cartProducts}</div>
                              {cartItems.length > 0 && (
                                    <div className="cart-details">
                                          <hr />
                                          <div className="total-items">
                                                <div className="total_quantity">
                                                      <span>QTY:</span> {totalQuantity}
                                                </div>
                                                <div className="total_amount">
                                                      <span>Total:</span> {totalPrice}
                                                </div>
                                          </div>
                                          <button className="proceed-checkout-btn" onClick={() => navigate("/cart")}>
                                                Place my Order | ${totalPrice}
                                          </button>
                                    </div>
                              )}
                        </div>
                  )}
            </>
      );
};

export default AjaxCart;
