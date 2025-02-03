import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./components/layout";
import Review from "./components/Review";
import Home from "./pages/Home";

const router = createBrowserRouter(
      createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="review" element={<Review />} />
            </Route>
      )
);

export default function App() {
      return <RouterProvider router={router} />;
}
