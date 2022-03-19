export const ButtonOutline = ({ children, color = "blue", ...props }) => {
  const colors =
    color === "white"
      ? " border-white text-white hover:bg-white hover:text-black"
      : color === "blue"
      ? "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white "
      : color === "dark"
      ? " border-dark-600 text-dark-600 hover:bg-dark-600 hover:text-white"
      : "";

  return (
    <button
      {...props}
      className={` bg-transparent border ${colors} rounded-md  py-2 px-4 `}
    >
      {children}
    </button>
  );
};
