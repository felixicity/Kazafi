// import { useParams } from "react-router-dom";
import { useState } from "react";

const products = [
      {
            id: 969695,
            title: "Shobo Corner Confy Chair",
            price: 34000,
            rating: 7,
            description:
                  " Made from the finest silk material, with the best italian woods, this armless chair gives you the confidence, unique style and comfort with elegance.",
            category: "furniture",
            colors: ["blue", "black", "gray", "gold"],
            sizes: ["XS", "M", "L", "XL"],
            discount: 10,
      },
];

const Product = () => {
      //   const productId = useParams();

      const { id, title, price, rating, description, category, colors, sizes, discount } = products[0];

      const [itemColor, setItemColor] = useState(colors[0]);
      const [quantity, setQuantity] = useState(1);

      const productColor = colors.map((color) => (
            <div
                  key={id}
                  className="color"
                  style={{ backgroundColor: color }}
                  onClick={() => setItemColor(color)}
            ></div>
      ));

      const productSizes = sizes.map((size) => (
            <div key={id} className="size">
                  {size}
            </div>
      ));

      return (
            <>
                  <div id="product">
                        <div className="img-container">
                              <img src={`/kazafi/shobo-chair-${itemColor}.png`} alt="yellow chair" />
                        </div>
                        <div className="product-details">
                              <h2 className="product-title">{title}</h2>
                              <p className="product-price">
                                    <span>&#8358;{price}</span> <span>&#8358;{price - (price * discount) / 100}</span>
                              </p>
                              <div className="product-rating">
                                    Reviews <span className="number-of-reviews">({rating})</span>
                              </div>
                              <p className="product-desc">{description}</p>
                              <hr />
                              <div className="product-colors">
                                    <h3>Color</h3>
                                    <div className="available-colors">{productColor}</div>
                              </div>
                              {category == "clothing" && (
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
                                    <a href="/">Buy now</a>
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
                                                <span>Return within first 30 days of purchase</span>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default Product;
