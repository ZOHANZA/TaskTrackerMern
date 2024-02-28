import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTasks, FaQuoteLeft } from 'react-icons/fa';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const quotes = [
      "The secret of getting ahead is getting started. - Mark Twain",
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
      "Believe you can and you're halfway there. - Theodore Roosevelt",
      "It always seems impossible until it's done. - Nelson Mandela",
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="dashboard-container">
      <section className="welcome-section">
        <div className="welcome-message">
          <h1>Welcome, {user && user.name}!</h1>
          <p>Here's your personalized dashboard.</p>
          
        </div>
        <div className="action-links">
          <Link to="/tasks" className="task-link">
            <button className="view-tasks-btn">
              <FaTasks /> View My Tasks
            </button>
          </Link>
          <br />
          <br />
          <br />
        </div>
        <div className="quote-container">
            <p className="quote-text">Quote of the Day: "{quote}"</p>
              <div className="animated-icon">
              
              <FaQuoteLeft className="icon-spin" />
            </div>
          </div>
      </section>
      
    </div>
  );
};

export default Dashboard;
