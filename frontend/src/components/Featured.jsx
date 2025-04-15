import Button from "./Button";

const data = [
      { id: 1, title: "New Deals", img: "./images/products/2.jpg" },
      { id: 2, title: "Best Sellers", img: "./images/products/12.jpg" },
      { id: 3, title: "Winter Sales", img: "./images/products/19.jpg" },
      { id: 4, title: "Hot Sales", img: "./kazafi/bosun-coffee-tables.png" },
];

const Featured = () => {
      const category = data.map((prod) => (
            <div className="featured-card" key={prod.id}>
                  <p>{prod.title}</p>
                  <img src={prod.img} />
                  <Button className={`featured-card-${prod.id}`} text="Shop Now" />
            </div>
      ));
      return (
            <section className="wrapper">
                  <h2>Categories</h2>
                  <div className="featured-products">{category}</div>
            </section>
      );
};

export default Featured;
