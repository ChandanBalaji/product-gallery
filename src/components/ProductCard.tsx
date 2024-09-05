import React from "react";
import { Product } from "../interfaces/products";
import "./ProductCard.css"; // Import the CSS file
import Tooltip from "./Tooltip";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img loading="lazy" src={product.thumbnailUrl} alt={product.title} />
      <Tooltip title={product.title}>
        <h2 className="product-title">{product.title}</h2>
      </Tooltip>
      <p>Album ID: {product.albumId}</p>
    </div>
  );
};

export default ProductCard;
