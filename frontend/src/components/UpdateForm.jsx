import { useState, useEffect } from 'react'; // Import useEffect
import { useDispatch } from 'react-redux';
import { updateTask } from '../features/tasks/taskService';

const UpdateForm = ({ selectedTask, token }) => { // Receive selectedTask as prop
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    text: '',
    timeAndDay: '',
    setReminder: false
  });

  // Use useEffect to update formData when selectedTask changes
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        text: selectedTask.text,
        timeAndDay: selectedTask.timeAndDay,
        setReminder: selectedTask.setReminder
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTask(selectedTask._id, formData, token)); // Use selectedTask._id for taskId
      // Handle success (optional)
    } catch (error) {
      // Handle error (optional)
      console.error('Update failed:', error);
    }
  };

  if (!selectedTask) return null; // Render nothing if selectedTask is null

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text:
        <input type="text" name="text" value={formData.text} onChange={handleChange} />
      </label>
      <label>
        Time and Day:
        <input type="text" name="timeAndDay" value={formData.timeAndDay} onChange={handleChange} />
      </label>
      <label>
        Set Reminder:
        <input type="checkbox" name="setReminder" checked={formData.setReminder} onChange={handleChange} />
      </label>
      <button type="submit">Update Task</button>
    </form>
  );
};

export default UpdateForm;


