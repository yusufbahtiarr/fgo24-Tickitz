function Button({ variant, className, children, ...props }) {
  const baseStyle = "font-bold box-border  h-[54px] cursor-pointer";
  let selectedVariant = "";

  if (variant === "primary") {
    selectedVariant =
      "px-5 py-3 bg-primary rounded-full uppercase text-white hover:bg-orange-600";
  } else if (variant === "secondary") {
    selectedVariant =
      "px-5 py-3 border rounded-full border-black uppercase hover:bg-orange-600 hover:text-white hover:border-1 hover:border-orange-600";
  } else if (variant === "third") {
    selectedVariant = "px-3 py-1 bg-primary rounded";
  } else if (variant === "outline") {
    selectedVariant = "px-4 py-2 border border-primary text-primary rounded";
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
