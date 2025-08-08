import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const StatusBanner = () => {
      const [closeBanner, setCloseBanner] = useState(false);
      return (
            !closeBanner && (
                  <div className="status-banner">
                        <FaTimes color="#0e0e0e" onClick={() => setCloseBanner(true)} />
                        <p>
                              <strong>Product updated!</strong> Make sure to restock items that are running low.
                        </p>
                        <div className="status-actions">
                              <button>Add New Product</button>
                              <button>Manage Inventory</button>
                        </div>
                  </div>
            )
      );
};

export default StatusBanner;
