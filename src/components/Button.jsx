function Button({ variant, className, children, ...props }) {
  const baseStyle =
    "font-bold rounded-full box-border uppercase h-[54px] cursor-pointer";
  let selectedVariant = "";

  if (variant === "primary") {
    selectedVariant = "px-5 py-3 bg-primary text-white hover:bg-orange-600";
  } else if (variant === "secondary") {
    selectedVariant =
      "px-5 py-3 border border-black hover:bg-orange-600 hover:text-white hover:border-1 hover:border-orange-600";
  } else {
    selectedVariant = "h-54px";
  }

  return (
    <button
      className={[baseStyle, selectedVariant, className].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
