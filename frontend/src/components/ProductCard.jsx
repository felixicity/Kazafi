import { products } from "../utilities/productDataTemplate";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
      const navigate = useNavigate();

      const handleClick = (itemId) => {
            navigate(`./product/${itemId}`);
      };

      const mappedProducts = products.map((product) => (
            <div key={product.id} className="product-card">
                  <img
                        src={product.img ? `./kazafi/${product.img}-${product.colors[0]}.png` : product.image}
                        alt={product.img}
                  />
                  <span className="promotion">Limited Edition</span>
                  <div className="product-details">
                        <div className="title">
                              <p className="name">{product?.name}</p>
                              <p className="type">{product.category}</p>
                        </div>
                        <div className="product-info">
                              <p className="price">&#8358;{product.price}</p>
                              <a onClick={() => handleClick(product.id)}>Buy now</a>
                        </div>
                  </div>
            </div>
      ));
      return <>{mappedProducts}</>;
};

export default ProductCard;
