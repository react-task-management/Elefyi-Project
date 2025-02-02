import { useState } from "react";
import PropTypes from "prop-types";

function StatusFilter({ onFilterChange, onPriorityChange }) {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  const statuses = [
    { name: "All", color: "bg-gray-300 text-gray-800 cursor-pointer" },
    { name: "To Do", color: "bg-yellow-300 text-yellow-900 cursor-pointer" },
    { name: "Doing", color: "bg-blue-300 text-blue-900 cursor-pointer" },
    { name: "Done", color: "bg-green-300 text-green-900 cursor-pointer" },
  ];

  const priorities = [
    { name: "All", color: "bg-gray-300 text-gray-800 cursor-pointer" },
    { name: "Low", color: "bg-green-300 text-green-900 cursor-pointer" },
    { name: "Medium", color: "bg-yellow-300 text-yellow-900 cursor-pointer" },
    { name: "High", color: "bg-red-300 text-red-900 cursor-pointer" },
  ];

  return (
    <div className="flex justify-center items-center space-x-6 bg-gray-100 p-4 shadow-md rounded-md ">
      {/* Status Filters */}
      <div className=" flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
        <h3 className="text-lg font-bold">Status:</h3>
        {statuses.map((status) => (
          <button
            key={status.name}
            onClick={() => {
              setSelectedStatus(status.name);
              onFilterChange(status.name);
            }}
            className={`px-4 py-2 rounded-md transition  ${
              selectedStatus === status.name
                ? "border-2 border-gray-900 shadow-lg"
                : ""
            } ${status.color} hover:opacity-80`}
          >
            {status.name}
          </button>
        ))}
      </div>

      {/* Priority Filters */}
      <div className=" flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
        <h3 className="text-lg font-bold">Priority:</h3>
        {priorities.map((priority) => (
          <button
            key={priority.name}
            onClick={() => {
              setSelectedPriority(priority.name);
              onPriorityChange(priority.name);
            }}
            className={`px-4 py-2 rounded-md transition ${
              selectedPriority === priority.name
                ? "border-2 border-gray-900 shadow-lg"
                : ""
            } ${priority.color} hover:opacity-80`}
          >
            {priority.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// ✅ Add PropTypes Validation
StatusFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default StatusFilter;
