import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "../components/TaskForm";
import Spinner from "../components/Spinner";
import Task from "../components/Task";
import { deleteTask, getTasks, reset } from "../features/tasks/taskSlice";
import TaskHeader from "../components/TaskHeader";
import DeleteModal from "../components/DeleteModal";

function TaskView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAddTask, setShowAddTask] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

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

  const handleDelete = (taskId) => {
    // Set the taskIdToDelete and show the delete modal
    setTaskIdToDelete(taskId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTask(taskIdToDelete)).then(() => {
      dispatch(getTasks());
      setShowDeleteModal(false);
    });
  };
  
  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCloseTaskForm = () => {
    setShowAddTask(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="containers">
      {showAddTask && <TaskForm onClose={handleCloseTaskForm} />}
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
              onDelete={() =>  handleDelete(task._id)}
            />
          ))}
        </>
      ) : (
        <p>No tasks found.</p>
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default TaskView;

