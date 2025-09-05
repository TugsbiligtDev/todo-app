import { useState } from "react";
import Buttons from "./components/Buttons.jsx";
import Task from "./components/Task.jsx";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState("all");

  const completedNumber = data.filter(
    (task) => task.status === "completed"
  ).length;

  const updateFilteredData = (newData) => {
    if (filter === "active") {
      setFilteredData(newData.filter((task) => task.status === "active"));
    } else if (filter === "completed") {
      setFilteredData(newData.filter((task) => task.status === "completed"));
    } else {
      setFilteredData(newData);
    }
  };

  const createTask = () => {
    if (!inputValue.trim()) {
      alert("Please enter a task.");
      return;
    }
    const newTask = {
      id: Date.now() + Math.random(),
      text: inputValue,
      status: "active",
    };
    const updatedData = [...data, newTask];
    setData(updatedData);
    updateFilteredData(updatedData);
    setInputValue("");
  };

  const deleteTask = (id) => {
    const updatedData = data.filter((task) => task.id !== id);
    setData(updatedData);
    updateFilteredData(updatedData);
  };

  const toggleStatus = (id) => {
    const changedData = data.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === "completed" ? "active" : "completed",
        };
      }
      return task;
    });
    setData(changedData);
    updateFilteredData(changedData);
  };

  const clearCompleted = () => {
    const filteredData = data.filter((task) => task.status === "active");
    setData(filteredData);
    updateFilteredData(filteredData);
  };

  const filterCompleted = () => {
    const filteredData = data.filter((task) => task.status === "completed");
    setFilteredData(filteredData);
    setFilter("completed");
  };

  const filterActive = () => {
    const filteredData = data.filter((task) => task.status === "active");
    setFilteredData(filteredData);
    setFilter("active");
  };

  const clearFilter = () => {
    setFilteredData(data);
    setFilter("all");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask();
  };

  return (
    <div className="flex justify-center w-screen h-screen">
      <main className="w-[95%] max-w-[377px] bg-white mt-[60px] flex flex-col gap-5 py-6 px-4 rounded-md shadow-md h-fit">
        <header>
          <h1 className="text-xl font-semibold leading-none text-center">
            To-Do list
          </h1>
        </header>

        <section aria-label="Add new task">
          <form onSubmit={handleSubmit} className="flex gap-[6px] w-full">
            <input
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              value={inputValue}
              type="text"
              placeholder="Add a new task..."
              className="w-[280px] h-[40px] rounded-md border border-[#E4E4E7] px-4 py-2 text-sm outline-none"
            />
            <Buttons type="submit" text="Add" />
          </form>
        </section>

        <section>
          <div className="flex gap-[6px] items-start h-[32px]" role="tablist">
            <Buttons
              isSmall={true}
              text="All"
              handleClick={clearFilter}
              isActive={filter === "all"}
            />
            <Buttons
              isSmall={true}
              text="Active"
              handleClick={filterActive}
              isActive={filter === "active"}
            />
            <Buttons
              isSmall={true}
              text="Completed"
              handleClick={filterCompleted}
              isActive={filter === "completed"}
            />
          </div>
        </section>

        <section>
          {filteredData.map((task) => {
            return (
              <Task
                key={task.id}
                {...task}
                toggleStatus={toggleStatus}
                deleteTask={deleteTask}
              />
            );
          })}

          {filteredData.length === 0 && (
            <p className="text-[#6B7280] text-center text-sm my-5">
              No tasks yet. Add one above!
            </p>
          )}
        </section>

        <footer className="flex justify-between pt-4 pb-2 text-sm border-t border-[#E4E4E7]">
          <p className="text-[#6B7280] ">
            {completedNumber} of {data.length} tasks completed
          </p>
          <button onClick={clearCompleted} className="text-[#EF4444]">
            Clear completed
          </button>
        </footer>

        <p className="text-[#6B7280] text-center text-sm">
          Powered by{" "}
          <a href="" className="text-[#3B73ED]">
            Pinecone academy
          </a>
        </p>
      </main>
    </div>
  );
};

export default App;
