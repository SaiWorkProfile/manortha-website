import React from "react";
import logoLight from "../assets/manoratha-logo.png";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ variant = "dark", size = "md" }) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-24",
  };

  return (
    <div className="flex items-center select-none">
      <img
        src={logoLight}
        alt="Manortha Builders & Developers"
        className={`${sizeClasses[size]} object-contain`}
      />
    </div>
  );
};

export default Logo;
