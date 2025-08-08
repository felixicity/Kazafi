import SplitButton from "../../../components/SplitButton";
import SearchPlusFilters from "../../../components/searchPlusFilters";
const sampleProducts = [
      { name: "Wireless Mouse", stock: 30, price: "$25", date: "May 11" },
      { name: "Laptop Stand", stock: 12, price: "$45", date: "May 10" },
      { name: "Bluetooth Keyboard", stock: 0, price: "$39", date: "May 7" },
];

const ProductTable = () => {
      return (
            <div className="card">
                  <SearchPlusFilters />
                  <table className="product-table">
                        <thead>
                              <tr>
                                    <th>Product</th>
                                    <th>Stock</th>
                                    <th>Price</th>
                                    <th>Last Updated</th>
                                    <th></th>
                              </tr>
                        </thead>
                        <tbody>
                              {sampleProducts.map((item, i) => (
                                    <tr key={i}>
                                          <td>{item.name}</td>
                                          <td>{item.stock}</td>
                                          <td>{item.price}</td>
                                          <td>{item.date}</td>
                                          <td>
                                                <SplitButton />
                                          </td>
                                    </tr>
                              ))}
                        </tbody>
                  </table>
            </div>
      );
};

export default ProductTable;
