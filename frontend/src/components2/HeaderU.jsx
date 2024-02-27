import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';

const HeaderU = ({onAdd, showAdd}) => {
  const location = useLocation();
  const title = 'Update Tracker'; // Setting title directly in the component



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


      
    </header>
  );
};

HeaderU.propTypes = {
    title: PropTypes.string.isRequired,
  
};

export default HeaderU;