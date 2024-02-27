import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../features/tasks/taskSlice";
import PropTypes from "prop-types";

function TaskUpdateForm({ id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.tasks);

  const task = tasks.find((task) => task._id === id);

  // State to hold form field values
  const [text, setText] = useState("");
  const [timeAndDay, setTimeAndDay] = useState("");
  const [setReminder, setSetReminder] = useState(false);

  // Populate form fields with task data on component mount
  useEffect(() => {
    if (task) {
      setText(task.text);
      setTimeAndDay(task.timeAndDay);
      setSetReminder(task.setReminder);
    }
  }, [task]);

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedTaskData = {
      text: text,
      timeAndDay: timeAndDay,
      setReminder: setReminder,
    };

    dispatch(updateTask({ taskId: id, updatedTaskData }));

    // Reset form fields after submission
    setText("");
    setTimeAndDay("");
    setSetReminder(false);
    navigate("/tasks");
  };

  return (
    <div className="containers">
      <section className="form">
        <h5>Update Form</h5>
        <form className="add-form" onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="text">Task</label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="timeAndDay">Time and Day</label>
            <input
              type="text"
              name="timeAndDay"
              id="timeAndDay"
              value={timeAndDay}
              onChange={(e) => setTimeAndDay(e.target.value)}
            />
          </div>
          <div className="form-control form-control-check">
            <label htmlFor="setReminder">Set Reminder</label>
            <input
              type="checkbox"
              name="setReminder"
              id="setReminder"
              checked={setReminder}
              onChange={(e) => setSetReminder(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Update Task
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

TaskUpdateForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TaskUpdateForm;
