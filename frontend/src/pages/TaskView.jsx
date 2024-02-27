import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "../components/TaskForm";
import Spinner from "../components/Spinner";
import Task from "../components/Task";
import { deleteTask, getTasks, reset } from "../features/tasks/taskSlice";
import TaskHeader from "../components/TaskHeader";

function TaskView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAddTask, setShowAddTask] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getTasks());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="containers">
      {showAddTask && <TaskForm />}
      <TaskHeader
        title="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {tasks.length > 0 ? (
        <>
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onDelete={() => dispatch(deleteTask(task._id))}
            />
          ))}
        </>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
}

export default TaskView;
