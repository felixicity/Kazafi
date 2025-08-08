import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Signup from "./pages/Signup";
import UserDashboardLayout from "./components/UserDashboardLayout";
import UserHomepage from "./pages/User/UserHomepage";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import AdminPage from "./pages/Admin";
import AdminDashboardOverview from "./components/AdminDashboardOverview";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import HomeLayout from "./components/HomeLayout";
import ShopLayout from "./components/ShopLayout";
import CartPageLayout from "./components/CartPageLayout";
import Checkout from "./components/Checkout";
import ShippingAddress from "./pages/ShippingAddress";
import CheckoutLayout from "./components/CheckoutLayout";
import AdminProduct from "./pages/Admin/Products/ProductDashboard";
import AdminUser from "./pages/Admin/Users/UserDashboard";
import AdminOrders from "./pages/Admin/Orders";
import AdminPayments from "./pages/Admin/Payments";
import AdminAnalytics from "./pages/Admin/Analytics";
import AdminPreferences from "./pages/Admin/Settings";
import AdminMessages from "./pages/Admin/Messages";
import AddProducts from "./pages/Admin/Products/AddProducts";
import EditProduct from "./pages/Admin/Products/EditProduct";

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
                  <Route path="signup" element={<Signup />} />
                  <Route path="user" element={<UserDashboardLayout />}>
                        <Route index element={<UserHomepage />} />
                  </Route>
                  <Route path="cart" element={<CartPageLayout />}>
                        <Route index element={<Cart />} />
                        <Route path="information" element={<CheckoutLayout />}>
                              <Route index element={<ShippingAddress />} />
                              <Route path="checkout" element={<Checkout />} />
                        </Route>
                  </Route>
                  <Route path="order" element={<Order />} />
                  <Route path="admin" element={<AdminPage />}>
                        <Route index element={<AdminDashboardOverview />} />
                        <Route path="products" element={<AdminProduct />} />
                        <Route path="products/create" element={<AddProducts />} />
                        <Route path="products/:id/edit" element={<EditProduct />} />
                        <Route path="customers" element={<AdminUser />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="payments" element={<AdminPayments />} />
                        <Route path="analytics" element={<AdminAnalytics />} />
                        <Route path="messages" element={<AdminMessages />} />
                        <Route path="settings" element={<AdminPreferences />} />
                        {/* <Route path="permissions" element={<AdminPermissions />} /> */}
                  </Route>
                  <Route path="*" element={<NotFound />} />
            </Route>
      )
);

export default function App() {
      return <RouterProvider router={router} />;
}
