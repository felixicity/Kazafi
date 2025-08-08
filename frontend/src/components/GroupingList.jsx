export const category = ["sofa", "table", "bed", "lamps", "wall arts", "chair", "shelf", "wardrobe"]; // imitating the kind of data on categories from database

export const collection = [
      "office",
      "school",
      "home",
      "church",
      "tech & cyber space",
      "library",
      "shop",
      "mall",
      "event center",
];

const GroupingList = ({ children }) => {
      return (
            <div className="wrapper">
                  <ul className="group-nav">{children}</ul>
            </div>
      );
};

export default GroupingList;
