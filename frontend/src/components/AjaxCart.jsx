// import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { removeFromCart as clientRemoveFromCart } from "../slices/cart/clientCartSlice";
// import { getFromLocalStorage, setToLocalStorage } from "../utilities/localStorageUtils";
import { useGetCartQuery, useRemoveFromCartMutation, useUpdateItemQuantityMutation } from "../slices/cart/cartApiSlice";
import ShoppingBag from "./ShoppingBag";

const AjaxCart = ({ showCart, setShowCart }) => {
      const navigate = useNavigate();

      // The single source of truth for your cart data
      const { data, isLoading, isSuccess, isError, error } = useGetCartQuery();

      const [updateQuantity] = useUpdateItemQuantityMutation();
      const [removeFromCart] = useRemoveFromCartMutation();

      // Drive your component's UI from the RTK Query data directly
      const cartItems = data?.cart?.items; // Use optional chaining to prevent errors
      const totalQuantity = data?.cart?.totalQuantity;
      const totalAmount = data?.cart?.totalAmount;

      const handleUpdateQty = async (itemId, quantity) => {
            if (quantity < 1) return;
            try {
                  // The optimistic update in your sliice handles the instant UI change
                  await updateQuantity({ itemId, quantity: quantity });
            } catch (error) {
                  console.error("Error updating quantity:", error);
            }
      };

      const handleRemoveFromCart = async (itemId) => {
            try {
                  const res = await removeFromCart(itemId).unwrap();
                  console.log(res);
            } catch (error) {
                  console.error("Error removing item:", error);
            }
      };

      let cartProducts;

      if (isLoading) {
            cartProducts = <div>Loading cart...</div>;
      } else if (isError) {
            cartProducts = <div>Error:{error?.data?.message}</div>;
      } else if (isSuccess) {
            cartProducts = cartItems.map((product) => (
                  <div className="cart-product" key={`${product.variation._id}`}>
                        <div className="cart-product-img">
                              <img src={product.variation?.imageURLs[0]} alt={product.product.name} />
                        </div>
                        <div className="item-details">
                              <p className="item-name">{product.product?.name}</p>
                              <div className="edit-item-qty">
                                    <span onClick={() => handleUpdateQty(product.variation._id, product.quantity + 1)}>
                                          +
                                    </span>
                                    <span>{product.quantity}</span>
                                    <span onClick={() => handleUpdateQty(product.variation._id, product.quantity - 1)}>
                                          -
                                    </span>
                              </div>
                        </div>
                        <div className="price">
                              <p>&#8358;{product.variation.price}</p>
                              <p onClick={() => handleRemoveFromCart(product.variation._id)}>DELETE</p>
                        </div>
                  </div>
            ));
      } else {
            cartProducts = (
                  <div>
                        <h4>Your Cart is Empty Right Now!</h4>
                        <a>Pick some of our Items</a>
                  </div>
            );
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
                              {cartItems && (
                                    <div className="cart-details">
                                          <hr />
                                          <div className="total-items">
                                                <div className="total_quantity">
                                                      <span>QTY:</span> {totalQuantity}
                                                </div>
                                                <div className="total_amount">
                                                      <span>Total:</span> {totalAmount}
                                                </div>
                                          </div>
                                          <button className="proceed-checkout-btn" onClick={() => navigate("/cart")}>
                                                Place my Order | &#8358;{totalAmount}
                                          </button>
                                    </div>
                              )}
                        </div>
                  )}
            </>
      );
};

export default AjaxCart;
