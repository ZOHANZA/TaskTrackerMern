import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import Spinner from '../components/Spinner';
import Task from '../components/Task'; // Import Task component
import { updateTask, toggleTaskReminder, deleteTask, getTasks, reset } from '../features/tasks/taskSlice';
import HeaderT from '../components/HeaderT';
import taskService from '../features/tasks/taskService';
import UpdateForm from '../components/UpdateForm';


function TaskView() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [showAddTask, setShowAddTask] = useState(false)
    const { user } = useSelector((state) => state.auth);
    const token = useSelector((state) => state.auth.token);
    const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);
    const [selectedTask, setSelectedTask] = useState(null);

    
    
    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login');
        }

        dispatch(getTasks());

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch]);

    

    if (isLoading) {
        return <Spinner />;
    }

    const handleCancelUpdate = () => {
        setSelectedTask(null);
    };
    const handleUpdateClick = (task) => {
        setSelectedTask(task);
        console.log('hello2');
    };
    
   
    return (
        <div className='containers'>
            {showAddTask && <TaskForm />}
            <HeaderT
                title="Task Tracker" 
                onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask}
            />
            {selectedTask ? (
                <UpdateForm
                  selectedTask={selectedTask} token={token}
                    onCancel={handleCancelUpdate}
                />
            ) : (
                tasks.length > 0 ? (
                    <div className='tasks'>
                        {tasks.map((task) => (
                            <Task
                                key={task.id}
                                task={task}
                                onDelete={() => dispatch(deleteTask(task._id))}
                                onToggle={() => dispatch(toggleTaskReminder(task._id))}
                                onUpdate={() => handleUpdateClick(task)} // Passes task to be updated
                            />
                        ))}
                    </div>
                ) : (
                    <p>No tasks found.</p>
                )
            )}
        </div>
    );
}

export default TaskView;

