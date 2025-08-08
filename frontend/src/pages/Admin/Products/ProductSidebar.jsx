const ProductSidebar = () => {
      return (
            <aside className="product-sidebar">
                  <div className="card">
                        <h3>Inventory Overview</h3>
                        <p>Low Stock Items: 5</p>
                        <p>Out of Stock: 2</p>
                  </div>
                  <div className="card">
                        <h3>Sales Summary</h3>
                        <p>Today&apos;s Sales: $450</p>
                        <p>This Week: $3,200</p>
                  </div>
                  <div className="card">
                        <h3>Customer Feedback</h3>
                        <p>Reviews: 87</p>
                        <p>Avg. Rating: 4.6 ⭐</p>
                  </div>
            </aside>
      );
};

export default ProductSidebar;
