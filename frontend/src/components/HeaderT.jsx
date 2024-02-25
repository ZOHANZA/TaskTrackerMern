import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Button from './Button';

const HeaderT = ({onAdd, showAdd}) => {
  const location = useLocation();
  const title = 'Task Tracker'; // Setting title directly in the component

//   const onAdd = () => {
    
//   };

//   const showAdd = true;

  return (
    <header className='headers'>
      <h1>{title}</h1>
      <Button
          buttonProps={{
            color: showAdd ? 'red' : 'green',
            text: showAdd ? 'Close' : 'Add',
            onClick: onAdd,
          }}
        /> 


      {/* {location.pathname === '/' && (
        <Button
          buttonProps={{
            color: showAdd ? 'red' : 'green',
            text: showAdd ? 'Close' : 'Add',
            onClick: onAdd,
          }}
        />
      )} */}
    </header>
  );
};

HeaderT.propTypes = {
    title: PropTypes.string.isRequired,
  
};

export default HeaderT;