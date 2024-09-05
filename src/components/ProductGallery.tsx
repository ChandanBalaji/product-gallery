import React, { useState } from "react";
import { Product } from "../interfaces/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import "./ProductGallery.css"; // Import the CSS file
import { Pagination } from "./Pagination";

interface ProductGalleryProps {
  products: Product[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const itemsPerPage = 10; // Number of items per page

  // Calculate total pages
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get current products to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div className="product-gallery">
      <h1>Product Gallery</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "300px",
          marginLeft: "3vw",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        {currentProducts.map((product) => (
          <Link
            className="product-card-wrapper"
            key={product.id}
            to={`/products/${product.id}`}
          >
            <ProductCard key={product.id} product={product} />
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductGallery;
