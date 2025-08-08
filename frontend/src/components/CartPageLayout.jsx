import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CartHeader from "./CartHeader";
import Navigation from "./Navigation";

const CartPageLayout = () => {
      const [url, setUrl] = useState(window.location.pathname);

      useEffect(() => {
            setUrl(url);
      }, [url]);

      return (
            <div>
                  <Navigation />
                  <CartHeader url={url} setUrl={setUrl} />
                  <Outlet />
            </div>
      );
};

export default CartPageLayout;
