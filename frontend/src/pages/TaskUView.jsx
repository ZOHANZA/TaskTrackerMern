import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TaskUForm from '../components2/TaskUForm'
import Spinner from '../components/Spinner';
import Task from '../components/Task'; // Import Task component
import { updateTask, toggleTaskReminder, deleteTask, getTasks, reset } from '../features/tasks/taskSlice';
import HeaderT from '../components/HeaderT';
import HeaderU from '../components2/HeaderU'





function TaskUView() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [showAddTask, setShowAddTask] = useState(false)
    const { user } = useSelector((state) => state.auth);
    const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);
    

    
    
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

        
   
    return (
        <div className='containers'>
            {showAddTask && <TaskUForm />}
            <HeaderU
                title="Update View" 
                onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask}
            />              
            {tasks.length > 0 ? (
                <div className='tasks'>
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            onDelete={() => dispatch(deleteTask(task._id))}
                            //onToggle={() => dispatch(toggleTaskReminder(task._id))}
                        />
                    ))}
                </div>
            ) : (
                <p>No tasks found.</p>
            )}
        </div>
    );
}

export default TaskUView;
