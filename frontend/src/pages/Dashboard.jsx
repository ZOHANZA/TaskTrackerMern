
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';




function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  

  useEffect(() => {
    

    if (!user) {
      navigate('/login');
    }

    

    return () => {
     
    };
  }, [user, navigate, dispatch]);

  

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <Link to="/tasks">View My Tasks</Link>
      </section>

     </>
  );
}

export default Dashboard;
