import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAddToCartMutation } from "../slices/cart/cartApiSlice";
import { useGetSingleProductQuery } from "../slices/productApiSlice";

const Product = () => {
      const [itemColor, setItemColor] = useState(null);
      const [quantity, setQuantity] = useState(1);
      const { productId } = useParams();

      const [apiAddToCart] = useAddToCartMutation();

      const { data, isLoading, error } = useGetSingleProductQuery(productId);

      if (isLoading) return <p>Loading products...</p>;
      if (error) return <p>Something went wrong!</p>;

      // If your API returns { products: [...] }
      const product = data?.product ?? [];

      const { _id, name, title, price, description, category, images, colors, sizes, discount } = product;

      const productColor = colors
            ? colors.map((color) => (
                    <div
                          key={colors.indexOf(color)}
                          className="color"
                          style={{ backgroundColor: color }}
                          onClick={() => setItemColor(color)}
                    ></div>
              ))
            : null;

      const productSizes =
            sizes &&
            sizes.map((size) => (
                  <div key={_id} className="size">
                        {size}
                  </div>
            ));

      const handleAddtoCart = async () => {
            const res = await apiAddToCart({ productId: _id, quantity }).unwrap();
            console.log(res);
      };

      return (
            <>
                  <div id="product">
                        <div className="img-container">
                              <img src={`http://localhost:5000/${images[0]}`} alt={name} />
                        </div>
                        <div className="product-details">
                              <h2 className="product-name">{name}</h2>
                              <p className="product-title">{title}</p>
                              <p className="product-price">
                                    <span>&#8358;{price}</span> <span>&#8358;{price - (price * discount) / 100}</span>
                              </p>
                              <div className="product-rating">
                                    Reviews <span className="number-of-reviews">({6})</span>
                              </div>
                              <p className="product-desc">{description}</p>
                              <hr />
                              <div className="product-colors">
                                    <h3>Color</h3>
                                    <div className="available-colors">{productColor}</div>
                              </div>
                              {category === "clothing" && (
                                    <div className="product-sizes">
                                          <div className="size-header">
                                                <h3>select a size</h3>
                                                <a href="/">Sizing guide</a>
                                          </div>
                                          <div className="available-sizes">{productSizes}</div>
                                    </div>
                              )}
                              <div className="actions">
                                    <div className="adjust-qty">
                                          <span onClick={() => setQuantity(quantity - 1)}>-</span>
                                          <span>{quantity}</span>
                                          <span onClick={() => setQuantity(quantity + 1)}>+</span>
                                    </div>
                                    <a onClick={() => handleAddtoCart(itemColor)}>Add to Cart</a>
                              </div>
                              <div className="other-details">
                                    <div className="detail-group">
                                          <img src="/icons/local_shipping.svg" alt="truck" />
                                          <div className="detail-desc">
                                                <p>Free Shipping in Nigeria</p>
                                                <span>For orders over &#8358;200k</span>
                                          </div>
                                    </div>
                                    <div className="detail-group">
                                          <img src="/icons/autorenew.svg" alt="cycle" />
                                          <div className="detail-desc">
                                                <p>Easy Return and Refund</p>
                                                <span>Return within first 15 days of purchase</span>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default Product;
