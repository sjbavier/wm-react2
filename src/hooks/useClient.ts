import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../components/auth/AuthContext';
import { TRequest } from '../models/models';
import { useHandleNotifications } from './useNotifications';

// const apiErrors = {
//     401: 'Unauthorized',
//     403: 'Forbidden',
//     404: 'Does not exist',
//     409: 'Request did not succeed',
//     422: 'Token is malformed',
//     500: 'Server error'
// }

export default function useClient(verbosity?: string) {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { token, setToken } = useContext(AuthContext);
  const { handleResponse } = useHandleNotifications();

  const fetchMe = useCallback(
    async <T>(request: TRequest): Promise<T> => {
      setLoading(true);

      var headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      if (token) headers.append('Authorization', `Bearer ${token}`);

      const reqOptions = {
        method: request.method,
        headers: headers,
        body: JSON.stringify(request.data) || undefined
      };

      return fetch(`${request.path}`, reqOptions).then((response) => {
        if (!response.ok) {
          //   Error Notifications
          setError(true);
          setLoading(false);
          if (response.status === 401) setToken('');
          handleResponse({ response, verbosity });
          return response.json() as Promise<T>;
        } else {
          setSuccess(true);
          setLoading(false);
          // success notifications
          handleResponse({ response, verbosity });

          return response.json() as Promise<T>;
        }
      });
    },
    [token, verbosity, setToken, handleResponse]
  );

  return {
    fetchMe,
    loading,
    error,
    success
  };
}
