// import { useEffect, useState } from "react";
// import { products } from "../utilities/productDataTemplate";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productApiSlice";

const ProductCard = () => {
      //   const [allProducts, setAllProducts] = useState(null);
      const navigate = useNavigate();
      //   const [apiGetProducts, { isLoading }] = useGetProductsMutation();
      const { data, isLoading, error } = useGetProductsQuery();

      if (isLoading) return <p>Loading products...</p>;
      if (error) return <p>Something went wrong!</p>;

      // If your API returns { products: [...] }
      const products = data?.products ?? [];

      const handleClick = (itemId) => {
            navigate(`./product/${itemId}`);
      };

      const mappedProducts = products.map((product) => (
            <div key={product?._id} className="product-card">
                  <img
                        // src={`./kazafi/${product.img}-${product.colors ? product?.colors[0] : "img"}.png`}
                        src={`http://localhost:5000/${product?.images[0]}`}
                        alt={product?.name}
                  />
                  <span className="promotion">Limited Edition</span>
                  <div className="product-details">
                        <div className="title">
                              <p className="name">{product?.name}</p>
                              <p className="type">{product?.category}</p>
                        </div>
                        <div className="product-info">
                              <p className="price">&#8358;{product?.price}</p>
                              <a onClick={() => handleClick(product?._id)}>Buy now</a>
                        </div>
                  </div>
            </div>
      ));
      return <>{mappedProducts}</>;
};

export default ProductCard;
