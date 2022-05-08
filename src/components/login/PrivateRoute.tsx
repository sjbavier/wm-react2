import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { IAuth } from '../auth/useAuth'
import { AuthContext } from '../auth/AuthContext'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { err, isLoggedIn } = useContext<IAuth>(AuthContext);
  let location = useLocation()
  if( !isLoggedIn ) {
    return <Navigate to="/login" state={{ from: location, err }} />
  }

  return children

}

export default PrivateRoute;
