const Task = ({ text, status, id, toggleStatus, deleteTask }) => {
  const isDone = status === "active" ? false : true;
  return (
    <div className="w-full h-[62px] bg-[#F9FAFB] flex justify-between items-center p-4 rounded-md transition-all duration-300 ease-in-out hover:bg-[#F3F4F6] hover:shadow-sm">
      <div className="flex gap-[10px] items-center">
        <input
          type="checkbox"
          className="w-5 h-5 border-[#FFFFFF] bg-[#0275FF] outline-none transition-all duration-200 ease-in-out transform hover:scale-110 cursor-pointer"
          checked={isDone}
          onChange={() => {
            toggleStatus(id);
          }}
        />
        <p
          className={`text-sm transition-all duration-300 ease-in-out ${
            status === "completed" ? "line-through text-gray-500" : ""
          }`}
        >
          {text}
        </p>
      </div>
      <button
        className="py-[6px] px-3 rounded-md bg-[#FEF2F2] text-[#EF4444] transition-all duration-200 ease-in-out transform hover:bg-[#FEE2E2] hover:scale-105 active:scale-95"
        onClick={() => deleteTask(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
