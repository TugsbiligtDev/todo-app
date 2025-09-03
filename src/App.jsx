import { useState } from "react";
import Buttons from "./components/Buttons.jsx";
import Task from "./components/Task";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState("all");

  const completedNumber = data.filter(
    (task) => task.status === "completed"
  ).length;

  const createTask = () => {
    if (!inputValue.trim()) {
      alert("Please enter a task.");
      return;
    }
    const newTask = {
      id: Math.random(),
      text: inputValue,
      status: "active",
    };
    const updatedData = [...data, newTask];
    setData(updatedData);

    if (filter === "active") {
      setFilteredData(updatedData.filter((task) => task.status === "active"));
    } else if (filter === "completed") {
      setFilteredData(
        updatedData.filter((task) => task.status === "completed")
      );
    } else {
      setFilteredData(updatedData);
    }

    setInputValue("");
  };

  const deleteTask = (id) => {
    const updatedData = data.filter((task) => task.id !== id);
    setData(updatedData);

    if (filter === "active") {
      setFilteredData(updatedData.filter((task) => task.status === "active"));
    } else if (filter === "completed") {
      setFilteredData(
        updatedData.filter((task) => task.status === "completed")
      );
    } else {
      setFilteredData(updatedData);
    }
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

    if (filter === "active") {
      setFilteredData(changedData.filter((task) => task.status === "active"));
    } else if (filter === "completed") {
      setFilteredData(
        changedData.filter((task) => task.status === "completed")
      );
    } else {
      setFilteredData(changedData);
    }
  };

  const clearCompleted = () => {
    const filteredData = data.filter((task) => task.status === "active");
    setData(filteredData);
    setFilteredData(filteredData);
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
  return (
    <div className="flex justify-center w-screen h-screen font-inter">
      <div className="w-[95%] max-w-[377px] bg-white mt-[60px] flex flex-col gap-5 py-6 px-4 rounded-md shadow-md size-fit">
        <h1 className="text-xl font-semibold leading-none text-center">
          To-Do list
        </h1>
        <div className="flex gap-[6px] w-full">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") createTask();
            }}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            value={inputValue}
            type="text"
            placeholder="Add a new task..."
            className="w-[280px] h-[40px] rounded-md border border-[#E4E4E7] px-4 py-2 text-sm outline-hidden"
          />
          <Buttons handleClick={createTask} text="Add" />
        </div>
        <div className="flex gap-[6px] flex-start h-[32px]">
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

        <div className="flex justify-between pt-4 pb-2 text-sm border-t border-[#E4E4E7]">
          <p className="text-[#6B7280] ">
            {completedNumber} of {data.length} tasks completed
          </p>
          <button onClick={clearCompleted} className="text-[#EF4444]">
            Clear completed
          </button>
        </div>

        <p className="text-[#6B7280] text-center text-sm">
          Powered by{" "}
          <a href="" className="text-[#3B73ED]">
            Pinecone academy
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
