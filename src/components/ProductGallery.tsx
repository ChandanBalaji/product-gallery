import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/photoService";
import { Product } from "../interfaces/products";
import ProductCard from "./ProductCard";
import "./ProductGallery.css"; // Import the CSS file

const ProductGallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputPage, setInputPage] = useState<number>(1); // State for page input
  const itemsPerPage = 10; // Number of items per page

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

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get current products to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setInputPage(pageNumber); // Update input page when changing page
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Allow only numbers
      setInputPage(Number(value));
    }
  };

  // Handle input submit
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPage >= 1 && inputPage <= totalPages) {
      setCurrentPage(inputPage);
    }
  };

  return (
    <div className="product-gallery">
      <h1>Product Gallery</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          height: "100%",
          overflow: "auto",
        }}
      >
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
          const pageNumber = Math.max(1, currentPage - 2 + index); // Show 5 pages centered around current page
          return (
            pageNumber <= totalPages && (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            )
          );
        })}
        <form
          onSubmit={handleInputSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="number"
            value={inputPage}
            onChange={handleInputChange}
            min={0}
            max={totalPages}
            style={{ marginRight: "10px", width: "60px" }}
          />
          <button type="submit">Go</button>
        </form>
        <span style={{ margin: "0 10px" }}>of {totalPages} pages</span>
      </div>
    </div>
  );
};

export default ProductGallery;
