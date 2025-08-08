const HomeProductCard = () => {
      return (
            <div className="wrapper promotion-prod">
                  <div className="image-container">
                        <img src="./kazafi/ali-chair.png" alt="" />
                  </div>
                  <div className="promotion-prod-details">
                        <h3 className="promotion-prod-title">Elegance Space</h3>
                        <p className="promotion-prod-cat">Furniture / Chairs</p>
                        <p className="promotion-prod-desc"></p>
                        <button className="promotion-cta">Add to cart</button>
                        <div>
                              <p>Size</p>
                              <span></span>
                        </div>
                        <div>
                              <p>Materials</p>
                              <span></span>
                        </div>
                  </div>
            </div>
      );
};

export default HomeProductCard;
