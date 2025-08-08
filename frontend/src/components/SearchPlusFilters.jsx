import { FaFilter, FaSort } from "react-icons/fa";

const searchPlusFilters = () => {
      return (
            <div className="search_filter">
                  <input type="text" placeholder="Search customers by name or email" className="search-customer" />
                  <div className="options">
                        <div className="option">
                              <input type="text" placeholder="filter" className="filter-search" /> <FaFilter />
                        </div>
                        <div className="option">
                              <input type="text" placeholder="sort by" className="sort-search" /> <FaSort />
                        </div>
                  </div>
            </div>
      );
};

export default searchPlusFilters;
