import ProductHeader from "./ProductHeader";
import StatusBanner from "./StatusBanner";
import Tabs from "./Tabs";
import ProductTable from "./ProductTable";
import ProductSidebar from "./ProductSidebar";

const ProductDashboard = () => {
      return (
            <div className="product-main">
                  <div className="product-content">
                        <ProductHeader />
                        <StatusBanner />
                        <Tabs />
                        <ProductTable />
                  </div>
                  <ProductSidebar />
            </div>
      );
};

export default ProductDashboard;
