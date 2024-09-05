import React from "react";
import "./Tooltip.css"; // Create a separate CSS file for the tooltip styles

interface TooltipProps {
  title: string;
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip-text">{title}</span>
    </div>
  );
};

export default Tooltip;
