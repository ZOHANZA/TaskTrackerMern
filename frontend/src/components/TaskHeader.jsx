import PropTypes from "prop-types";
import Button from "./Button";

const TaskHeader = ({ onAdd, showAdd }) => {
  const title = "Task Tracker";

  return (
    <header className="headers">
      <h1>{title}</h1>
      <Button
        buttonProps={{
          color: showAdd ? "red" : "green",
          text: showAdd ? "Close" : "Add",
          onClick: onAdd,
        }}
      />
    </header>
  );
};

TaskHeader.propTypes = {
  onAdd: PropTypes.func.isRequired,
  showAdd: PropTypes.bool.isRequired,
};

export default TaskHeader;
