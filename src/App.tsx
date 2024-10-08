import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Product } from "./interfaces/products"; // Import your products data
import { fetchProducts } from "./services/photoService";

const ProductGallery = lazy(() => import("./components/ProductGallery"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProductGallery products={products} />} />
          <Route
            path="/products/:id"
            element={<ProductDetail products={products} />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
