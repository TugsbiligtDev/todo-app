const Buttons = ({ text, handleClick, isSmall, isActive, type = "button" }) => {
  let baseStyle = isSmall ? "h-[42px] px-3 py-1 text-sm" : "h-[40px] px-4 py-2";

  let colorStyle;

  if (isActive === true) {
    colorStyle = "bg-[#3C82F6] text-white shadow-md";
  } else if (isActive === false) {
    colorStyle =
      "bg-[#F3F4F6] text-[#363636] hover:bg-[#E5E7EB] hover:shadow-sm";
  } else {
    colorStyle = "bg-[#3C82F6] text-white shadow-md";
  }

  return (
    <button
      type={type}
      onClick={type === "submit" ? undefined : handleClick}
      className={`${baseStyle} ${colorStyle} rounded-md transition-all duration-200 ease-in-out`}
    >
      {text}
    </button>
  );
};

export default Buttons;
