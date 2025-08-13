const HomeProductCard = () => {
      return (
            <div className="wrapper promotion-prod">
                  <div className="image-container">
                        <img src="./kazafi/ali-chair.png" alt="" />
                  </div>
                  <div className="promotion-prod-details">
                        <h3 className="promotion-prod-title">Elegance Space</h3>
                        <p className="promotion-prod-cat">Furniture / Chairs</p>
                        <p className="promotion-prod-desc">
                              {" "}
                              Simple and classy. Crafted for luxury and arranged with the precision and overwhelming
                              qualities. This piece creates a sweet spot in every space.{" "}
                        </p>
                        <button className="promotion-cta">Add to cart</button>
                        <div className="promotion-feature">
                              <p>Size :</p>
                              Dimensions - <span>75cm * 35cm * 40cm </span>
                        </div>
                        <div className="promotion-feature">
                              <p>Materials :</p>- <span>Oak wood</span>
                              <br />- <span>Mahogany</span>
                        </div>
                  </div>
            </div>
      );
};

export default HomeProductCard;
