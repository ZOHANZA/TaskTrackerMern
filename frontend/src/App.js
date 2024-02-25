import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import TaskView from './pages/TaskView'
import UpdateForm from './components/UpdateForm'


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/task" element={<TaskView />} />{" "}
            {/* Define a new route for the TaskView component */}
            <Route path="/update/:taskId" element={<UpdateForm />}  />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App
