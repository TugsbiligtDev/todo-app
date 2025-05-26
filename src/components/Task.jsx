const Task = ({ text, status, id, toggleStatus, deleteTask }) => {
  const idDone = status === "active" ? false : true;
  return (
    <div
      key={id}
      className=" w-full h-[62px] bg-[#F9FAFB] flex justify-between items-center p-4 rounded-md"
    >
      <div className="flex gap-[10px]">
        <input
          type="checkbox"
          className="w-5 h-5 border-[#FFFFFF] bg-[#0275FF] outline-hidden"
          checked={idDone}
          onChange={() => {
            toggleStatus(id);
          }}
        />
        <p
          className={`text-sm text-center ${
            status === "completed" ? "line-through  " : ""
          }`}
        >
          {text}
        </p>
      </div>
      <button
        className="py-[6px] px-3 rounded-md bg-[#FEF2F2] text-[#EF4444]"
        onClick={() => deleteTask(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
