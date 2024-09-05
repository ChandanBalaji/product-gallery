import React from "react";
import { Product } from "../interfaces/products";
import { useParams, Link } from "react-router-dom";

interface ProductDetailProps {
  products: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const product = products.find((p) => p.id === Number(id)); // Find the product by ID

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>{product.title}</h1>
      <img
        src={product.url}
        alt={product.title}
        style={{ width: "300px", height: "auto" }}
      />
      <p>Album ID: {product.albumId}</p>
      <p>
        <Link to="/">Back to Gallery</Link>
      </p>
    </div>
  );
};

export default ProductDetail;
