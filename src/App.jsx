import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductPage from "./pages/ProductsPage/ProductsPage";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import AboutUs from "./pages/AboutUs/AboutUs";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetailPage/ProductDetailPage";
import EditProduct from "./pages/ProductEditPage/ProductEditPage";
import OrderPage from "./pages/OrderPage/OrderPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/aboutUs"
          element={
            <IsAnon>
              <AboutUs />
            </IsAnon>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/products"
          element={
            <IsPrivate>
              <ProductPage />
            </IsPrivate>
          }
        />
        <Route
          path="/products/:id"
          element={
            <IsPrivate>
              <ProductDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <IsPrivate>
              <EditProduct />
            </IsPrivate>
          }
        />

        <Route
          path="/orders"
          element={
            <IsPrivate>
              <OrderPage />
            </IsPrivate>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
