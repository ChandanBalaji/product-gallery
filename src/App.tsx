import React, { useEffect } from "react";
import ProductGallery from "./components/ProductGallery";

const App: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling
    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling on unmount
    };
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Gallery</h1>
      <ProductGallery />
    </div>
  );
};

export default App;
