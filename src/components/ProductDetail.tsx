import React, { useState } from "react";
import { Product } from "../interfaces/products";
import { useParams, Link } from "react-router-dom";

interface ProductDetailProps {
  products: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const product = products.find((p) => p.id === Number(id)); // Find the product by ID

  const [loading, setLoading] = useState<boolean>(true); // State to track image loading

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>{product.title}</h1>
      {loading && <div>Loading image...</div>} {/* Show loading indicator */}
      <img
        loading="lazy"
        src={product.url}
        alt={product.title}
        style={{ width: "300px", height: "auto" }}
        onLoad={() => setLoading(false)} // Set loading to false when image has loaded
        onError={() => setLoading(false)} // Set loading to false if there's an error loading the image
      />
      <p>Album ID: {product.albumId}</p>
      <p>
        <Link to="/">Back to Gallery</Link>
      </p>
    </div>
  );
};

export default ProductDetail;
