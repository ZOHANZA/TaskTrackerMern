import React from "react";
import { FaTimes,FaPencilAlt } from "react-icons/fa";
import { Link  } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from "../features/tasks/taskSlice";



const Task = ({ task, onDelete }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(task.setReminder); 
  const [setReminder, setSetReminder] = useState(task.setReminder);

  useEffect(() => {
    if (task) {
      setChecked(task.setReminder); 
      setSetReminder(task.setReminder);
    }
  }, [task]);

  
  const handleCheckboxChange = (e) => {
     e.preventDefault();
  
    const newReminderState = !setReminder;

      const updatedTaskData = {
        setReminder: newReminderState,
      };

      dispatch(updateTask({ taskId: task._id, updatedTaskData }));
      setSetReminder(newReminderState);
  };

  return (
    <div className={`task ${task.setReminder ? "reminder" : ""}`}>
      <div className="task-header">
        <h3>{task?.text}</h3>
        <div className="task-icons">
          <Link to={"/update"} state={{ id: task._id }} className="update-icon">
            <FaPencilAlt />
          </Link>
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={onDelete}
          />
        </div>
      </div>
      <div className="task-details">
        <p>{task?.timeAndDay}</p>
        <div className="set-reminder">
          <input
            type="checkbox"
            name="setReminder"
            checked={task.setReminder}
            onChange={handleCheckboxChange}
            
          />
          <label htmlFor="setReminder">Set reminder</label>
        </div>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
