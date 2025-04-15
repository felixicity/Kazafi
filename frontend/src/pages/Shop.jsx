import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const category = [
      { title: "Clothing", subs: ["shirt", "Sweater", "puffers", "raincoat"] },
      { title: "Furniture", subs: ["chairs", "tables", "sofas"] },
      { title: "Sort by", subs: ["Popularity", "Price"] },
];

const Shop = () => {
      const filters = category.map((cat) => (
            <label key={cat.title}>
                  <h4>{cat.title}</h4>
                  {cat.subs.map((sub) => (
                        <div key={sub} className="category-group">
                              <input type="radio" name="filter-group" value={sub} />
                              <span>{sub}</span>
                        </div>
                  ))}
            </label>
      ));

      return (
            <>
                  <Link to="/">Back</Link>
                  <main className="shop">
                        <aside>
                              <fieldset>
                                    <legend>Filter</legend>
                                    <hr />
                                    <div className="categories">
                                          {filters}
                                          <input type="range" name="price" id="price" min={0} max={50000} />
                                    </div>
                              </fieldset>
                        </aside>
                        <div className="shop-products">
                              <ProductCard />
                        </div>
                  </main>
            </>
      );
};

export default Shop;
