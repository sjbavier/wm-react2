import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { IAuth } from '../auth/useAuth'
import { AuthContext } from '../auth/AuthContext'

const PrivateRoute = ({ children }: { children: JSX.Element, user: string }) => {
  const { err, isLoggedIn, user } = useContext<IAuth>(AuthContext);
  let location = useLocation()
  if( !isLoggedIn && !user ) {
    return <Navigate to={`/login?redirectTo=${location.pathname}`} state={{ from: location, err }} />
  }

  return children

}

export default PrivateRoute;
