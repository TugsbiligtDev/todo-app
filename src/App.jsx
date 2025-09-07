import { useState } from "react";
import Buttons from "./components/Buttons.jsx";
import Task from "./components/Task.jsx";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  const completedNumber = data.filter(
    (task) => task.status === "completed"
  ).length;

  const filteredData = data.filter((task) => {
    if (filter === "active") return task.status === "active";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

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
    setInputValue("");
  };

  const deleteTask = (id) => {
    const updatedData = data.filter((task) => task.id !== id);
    setData(updatedData);
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
  };

  const clearCompleted = () => {
    const activeTasks = data.filter((task) => task.status === "active");
    setData(activeTasks);
  };

  const filterCompleted = () => {
    setFilter("completed");
  };

  const filterActive = () => {
    setFilter("active");
  };

  const clearFilter = () => {
    setFilter("all");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask();
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 pt-16 pb-8">
      <main className="w-[95%] max-w-[377px] bg-white flex flex-col gap-4 py-4 px-6 rounded-md shadow-lg h-fit">
        <header>
          <h1 className="text-xl font-semibold  text-center mt-1">
            To-Do List
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
              className="w-[280px] h-[40px] rounded-md border border-[#E4E4E7] px-4 py-2 text-sm outline-none transition-all duration-200 ease-in-out focus:border-[#3C82F6] focus:ring-2 focus:ring-[#3C82F6] focus:ring-opacity-20"
            />
            <Buttons type="submit">Add</Buttons>
          </form>
        </section>

        <section>
          <div className="flex gap-[6px] items-start h-[32px]" role="tablist">
            <Buttons
              isSmall={true}
              handleClick={clearFilter}
              isActive={filter === "all"}
            >
              All
            </Buttons>
            <Buttons
              isSmall={true}
              handleClick={filterActive}
              isActive={filter === "active"}
            >
              Active
            </Buttons>
            <Buttons
              isSmall={true}
              handleClick={filterCompleted}
              isActive={filter === "completed"}
            >
              Completed
            </Buttons>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          {filteredData.map((task) => {
            return (
              <div key={task.id} className="animate-fade-in">
                <Task
                  {...task}
                  toggleStatus={toggleStatus}
                  deleteTask={deleteTask}
                />
              </div>
            );
          })}

          {filteredData.length === 0 && (
            <p className="text-[#6B7280] text-center text-sm my-3">
              No tasks yet. Add one above!
            </p>
          )}
        </section>

        {data.length > 0 && (
          <footer className="flex justify-between pt-4 pb-2 text-sm border-t border-[#E4E4E7]">
            <p className="text-[#6B7280] ">
              {completedNumber} of {data.length} tasks completed
            </p>
            <button onClick={clearCompleted} className="text-[#EF4444]">
              Clear completed
            </button>
          </footer>
        )}

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
