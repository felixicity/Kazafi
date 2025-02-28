import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import AdminPage from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import HomeLayout from "./components/HomeLayout";
import ShopLayout from "./components/ShopLayout";

const router = createBrowserRouter(
      createRoutesFromElements(
            <Route path="/" element={<HomeLayout />}>
                  <Route index element={<Home />} />
                  <Route path="review" element={<Review />} />
                  <Route path="about" element={<About />} />
                  <Route path="shop" element={<ShopLayout />}>
                        <Route index element={<Shop />} />
                        <Route path="product/:productId" element={<Product />} />
                  </Route>
                  <Route path="login" element={<Login />} />
                  <Route path="Signup" element={<Signup />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="order" element={<Order />} />
                  <Route path="admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFound />} />
            </Route>
      )
);

export default function App() {
      return <RouterProvider router={router} />;
}
