import { IoSearch } from "react-icons/io5";

function Input({ id, type, name, placeholder, ...props }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-5 rounded-full border border-primary/80 py-3 px-4 bg-eighth"
    >
      <IoSearch className="text-xl" />
      <input
        id={id}
        name={name}
        type={type}
        className="grow outline-none bg-transparent"
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
}

export default Input;
