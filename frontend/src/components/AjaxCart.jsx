import { products } from "../utilities/productDataTemplate";
import Button from "./Button";

const AjaxCart = ({ showCart, setShowCart }) => {
      const product = products[0];

      const cartProduct = (
            <div className="cart-product" key={product.id}>
                  <div className="cart-product-img">
                        <img src={`./kazafi/${product?.img}-${product.colors[0]}.png`} alt="cart_image" />
                  </div>
                  <div className="item-details">
                        <p className="item-name">{product.name}</p>
                        <p className="item-title">{product.title}</p>
                        <div className="edit-item-qty">
                              <span>+</span>
                              <span>0</span>
                              <span>-</span>
                        </div>
                  </div>
                  <div className="price">
                        <p>${product.price}</p>
                        <p>DELETE</p>
                  </div>
            </div>
      );

      return (
            <>
                  {showCart && (
                        <div className="ajax-cart">
                              <Button text="close" onclick={() => setShowCart(false)} />
                              <h2>Your Cart</h2>
                              <div className="cart-items">{cartProduct}</div>
                              <div className="cart-details">
                                    <hr />
                                    <div className="total-items">
                                          <div className="total_quantity">
                                                <span>QTY:</span> 4
                                          </div>
                                          <div className="total_amount">
                                                <span>Total:</span> $500
                                          </div>
                                    </div>
                                    <button className="proceed-checkout-btn">Place my Order | ${product.price}</button>
                              </div>
                        </div>
                  )}
            </>
      );
};

export default AjaxCart;
