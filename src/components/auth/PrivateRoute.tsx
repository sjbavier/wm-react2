import { Spin } from 'antd';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { IAuthContext } from './useAuth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token, error, user, loading } = useContext<IAuthContext>(AuthContext);
  let location = useLocation();

  if (!token && loading) {
    return <Spin size="large" />;
  } else if (!token && !user && !loading) {
    return (
      <Navigate
        to={`/login?redirectTo=${location.pathname}`}
        state={{ from: location, error }}
      />
    );
  } else {
    return children;
  }
};

export default PrivateRoute;
