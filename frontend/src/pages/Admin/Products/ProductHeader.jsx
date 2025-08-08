import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductHeader = () => {
      const navigate = useNavigate();

      return (
            <div className="product-header">
                  <div>
                        <p className="breadcrumb">Dashboard / Products</p>
                        <h2 className="product-title">All Products</h2>
                        <div className="product-status">
                              <span className="status-badge">Live</span>
                              <span>• Updated Recently</span>
                        </div>
                  </div>
                  <a className="add-product-cta" onClick={() => navigate("./create")}>
                        <FiPlusCircle size={20} /> <span>Add new product</span>
                  </a>
            </div>
      );
};

export default ProductHeader;
