import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice'; // Assuming you have a createTask action defined in your taskSlice

function TaskForm() {
  const [text, setText] = useState('');
  const [timeAndDay, setTimeAndDay] = useState('');
  const [setReminder, setSetReminder] = useState(false); // State for reminder checkbox

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTask({ text, timeAndDay, setReminder })); // Pass setReminder to createTask action
    setText('');
    setTimeAndDay('');
    setSetReminder(false); // Reset reminder checkbox after form submission
  };

  return (
    <div className='containers'>
    <section className='form'>
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label htmlFor='text'>Task</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='timeAndDay'>Time and Day</label>
          <input
            type='text'
            name='timeAndDay'
            id='timeAndDay'
            value={timeAndDay}
            onChange={(e) => setTimeAndDay(e.target.value)}
          />
        </div>
        <div className='form-control form-control-check'>
          <label htmlFor='setReminder'>Set Reminder</label>
          <input
            type='checkbox'
            name='setReminder'
            id='setReminder'
            checked={setReminder}
            onChange={(e) => setSetReminder(e.target.checked)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Save Task
          </button>
        </div>
      </form>
    </section>
    </div>
  );
}

export default TaskForm;

