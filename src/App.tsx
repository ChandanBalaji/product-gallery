import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductGallery from "./components/ProductGallery";
import ProductDetail from "./components/ProductDetail";
import productsData from "./interfaces/products"; // Import your products data

const App: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling
    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling on unmount
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductGallery />} />
        <Route
          path="/products/:id"
          element={<ProductDetail products={productsData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
