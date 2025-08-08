import { Link } from "react-router-dom";

const CartHeader = ({ url }) => {
      const urlArray = url.split("/").map((url) => (
            <Link key={Math.random() * 1000} to={`${url}`}>
                  {url}
            </Link>
      ));

      return <div className="wrapper">{urlArray}</div>;
};

export default CartHeader;
