import { useCallback, useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { IAuth } from './useAuth';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({
  children
}: {
  children: JSX.Element;
  user: string; // todo future permissions
}) => {
  const { token, err, fetchUser } = useContext<IAuth>(AuthContext);
  let location = useLocation();

  // async callback to eliminate multiple calls whem token and err are the delimiters
  const nextRoute = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);
  useEffect(() => {
    if (token && err) {
      nextRoute();
    }
  }, [token, err, nextRoute]);

  if (!token) {
    return (
      <Navigate
        to={`/login?redirectTo=${location.pathname}`}
        state={{ from: location, err }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
