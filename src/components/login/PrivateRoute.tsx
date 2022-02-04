import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { client } from '../../lib/Client'


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation()
  const isLoggedIn: Boolean = client.isLoggedIn()

  if( !isLoggedIn ) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children

}

export default PrivateRoute;
