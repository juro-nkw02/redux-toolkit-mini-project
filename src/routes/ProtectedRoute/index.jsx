import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const Index = ({ children }) => {
  const location = useLocation();
  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  if (!authenticatedUser) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return children;
};

Index.propTypes = {
  children: PropTypes.object,
};

export default Index;
