const Task = ({ text, status, id, toggleStatus, deleteTask }) => {
  const isDone = status === "active" ? false : true;
  return (
    <div className="w-full min-h-[62px] bg-[#F9FAFB] flex justify-between items-start p-4 rounded-md transition-all duration-500 ease-in-out hover:bg-[#F3F4F6] hover:shadow-lg hover:shadow-gray-200/50">
      <div className="flex gap-[10px] items-start flex-1 min-w-0">
        <input
          type="checkbox"
          className="w-5 h-5 min-w-[20px] min-h-[20px] border-[#FFFFFF] bg-[#0275FF] outline-none transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md hover:shadow-blue-300/30 mt-0.5 flex-shrink-0"
          checked={isDone}
          onChange={() => {
            toggleStatus(id);
          }}
        />
        <p
          className={`text-sm transition-all duration-500 ease-in-out break-words overflow-wrap-anywhere ${
            status === "completed"
              ? "line-through text-gray-500 opacity-75"
              : "text-gray-800"
          }`}
        >
          {text}
        </p>
      </div>
      <button
        className="py-[6px] px-3 rounded-md bg-[#FEF2F2] text-[#EF4444] transition-all duration-300 ease-in-out hover:bg-[#FEE2E2] hover:shadow-md hover:shadow-red-200/30 active:bg-[#FECACA] flex-shrink-0 ml-2"
        onClick={() => deleteTask(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
