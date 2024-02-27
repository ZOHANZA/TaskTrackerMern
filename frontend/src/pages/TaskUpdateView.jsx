import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TaskUpdateForm from "../components/TaskUpdateForm";

function TaskUpdateView() {
  const location = useLocation();
  const id = location.state.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="containers">
      <TaskUpdateForm id={id} />
    </div>
  );
}

export default TaskUpdateView;
