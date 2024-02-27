import React from 'react'
import { FaTimes } from 'react-icons/fa'
import UpdateForm from './UpdateForm';
import { Link, useNavigate } from 'react-router-dom';
import taskService from '../features/tasks/taskService';

const Task = ({ task,onDelete, onToggle }) => {

    const navigate = useNavigate();
    const handleRemindClick = () => {
        // Navigate to the update form route with the task ID as a parameter
        navigate(`/update/${task._id}`);
    }
  return (
    <div className= {`task  ${task.setReminder ? 'reminder' : ''}`}
    onDoubleClick={() => onToggle(task._id)}
  >
      <h3>{task.text} 
      {/* <Link to="/update" className='btn'> U   </Link> */}
      
      <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={onDelete}    
          
          /> </h3>
      <p>{task.timeAndDay}</p>
    </div>
  );
};

export default Task;
