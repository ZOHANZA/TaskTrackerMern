import PropTypes from 'prop-types';

const Button = ({ buttonProps }) => {
  const { color = 'steelblue', text, onClick } = buttonProps;

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className='btn'
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  buttonProps: {
    color: 'steelblue',
  },
};

Button.propTypes = {
  buttonProps: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
  }).isRequired,
};

export default Button;