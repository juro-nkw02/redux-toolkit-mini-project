import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Index = ({ children }) => {
  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  if (authenticatedUser) {
    return <Navigate to='/' replace />;
  }

  return children;
};

Index.propTypes = {
  children: PropTypes.object,
};

export default Index;
