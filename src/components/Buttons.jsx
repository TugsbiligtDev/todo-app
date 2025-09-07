const Buttons = ({
  children,
  handleClick,
  isSmall,
  isActive,
  type = "button",
}) => {
  let baseStyle = isSmall ? "h-[32px] px-3 py-1 text-sm" : "h-[40px] px-4 py-2";

  let colorStyle;

  if (isActive === true) {
    colorStyle =
      "bg-[#3C82F6] text-white shadow-md hover:shadow-lg hover:shadow-blue-300/30";
  } else if (isActive === false) {
    colorStyle =
      "bg-[#F3F4F6] text-[#363636] hover:bg-[#E5E7EB] hover:shadow-md hover:shadow-gray-200/30";
  } else {
    colorStyle =
      "bg-[#3C82F6] text-white shadow-md hover:shadow-lg hover:shadow-blue-300/30";
  }

  return (
    <button
      type={type}
      onClick={type === "submit" ? undefined : handleClick}
      className={`${baseStyle} ${colorStyle} rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95`}
    >
      {children}
    </button>
  );
};

export default Buttons;
