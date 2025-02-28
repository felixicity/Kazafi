const category = ["clothing", "furniture", "electronics"];

const Shop = () => {
      const filters = category.map((cat) => (
            <label key={cat}>
                  <input type="radio" name="filter-group" value={cat} />
                  {cat}
            </label>
      ));

      return (
            <main>
                  <aside>
                        <fieldset>
                              <legend>Sort By</legend>
                              {filters}
                        </fieldset>
                  </aside>
            </main>
      );
};

export default Shop;
