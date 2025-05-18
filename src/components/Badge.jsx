import React from "react";

function Badge({ variant, className, children, ...props }) {
  const baseStyle = "py-2 px-4 rounded-full";
  let selectedVariant = "";

  if (variant === "primary") {
    selectedVariant = "font-medium bg-sixth text-fourth";
  } else if (variant === "secondary") {
    selectedVariant = "text-primary bg-third";
    ("bg- hover:bg-orange-600 hover:text-white hover:border-0 cursor-pointer");
  } else {
    selectedVariant = "px-3 py-2 text-white border border-white font-medium";
  }
  return (
    <>
      <div
        className={[baseStyle, selectedVariant, className].join(" ")}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

export default Badge;
