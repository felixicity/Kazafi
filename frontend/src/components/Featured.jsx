import { products } from "../utilities/productDataTemplate";

const Featured = () => {
      const category = products
            .filter((prod) => prod.featured)
            .map((item) => (
                  <div className="featured-card" style={{ backgroundColor: `${item.featured[1]}` }} key={item.id}>
                        <p>{item.featured[0]}</p>
                        <img src={`/kazafi/${item.img}-${item.colors[0]}.png`} />
                  </div>
            ));
      return (
            <section className="wrapper">
                  <div className="featured-products">{category}</div>
            </section>
      );
};

export default Featured;
