import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Task = ({ task, onDelete }) => {
  return (
    <div className={`task  ${task.setReminder ? "reminder" : ""}`}>
      <h3>
        {task?.text}
        <Link to={"/update"} state={{ id: task._id }} className="btn">
          Update
        </Link>
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={onDelete}
        />{" "}
      </h3>
      <p>{task?.timeAndDay}</p>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
