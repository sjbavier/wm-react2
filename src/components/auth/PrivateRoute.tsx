import { Spin } from 'antd';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { IAuth, TOKEN_STATE } from './useAuth';

const PrivateRoute = ({
  children
}: {
  children: JSX.Element;
  user: string; // todo future permissions
}) => {
  const { token, err, isComplete, loading } = useContext<IAuth>(AuthContext);
  let location = useLocation();
  // console.log('isComplete', isComplete);
  // console.log('token', token);
  if (!token && (isComplete === TOKEN_STATE.PENDING || loading)) {
    return <Spin size="large" />;
  } else if (
    !token &&
    (isComplete === TOKEN_STATE.COMPLETE || isComplete === TOKEN_STATE.IDLE) &&
    !loading
  ) {
    return (
      <Navigate
        to={`/login?redirectTo=${location.pathname}`}
        state={{ from: location, err }}
      />
    );
  } else {
    return children;
  }
};

export default PrivateRoute;
