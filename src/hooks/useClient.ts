import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../components/auth/AuthContext';
import { VERBOSITY } from '../lib/constants';
import { TRequest } from '../models/models';
import useNotifications from './useNotifications';

// const apiErrors = {
//     401: 'Unauthorized',
//     403: 'Forbidden',
//     404: 'Does not exist',
//     409: 'Request did not succeed',
//     422: 'Token is malformed',
//     500: 'Server error'
// }

export const prettyError = (err: Error): string => {
  return err.toString().replace('Error:', '');
};

export default function useClient(verbosity?: string) {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { token, setToken } = useContext(AuthContext);
  const setNotification = useNotifications();

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

      return fetch(`${request.path}`, reqOptions)
        .then((response) => {
          if (!response.ok) {
            //   Error Notifications
            setError(true);
            setLoading(false);
            if (response.status === 401) setToken('');
            switch (verbosity) {
              case VERBOSITY.SILENT:
                break;
              case VERBOSITY.NORMAL:
                setNotification({
                  message: `Error: ${response.status}`,
                  description: response.statusText.toString()
                });
                break;
              case VERBOSITY.VERBOSE:
                setNotification({
                  message: `Error: ${response.status} ${response.statusText}`,
                  description: response.statusText.toString(),
                  duration: 10
                });
                break;
              default:
                setNotification({
                  message: `Error: ${response.status}`,
                  description: response.statusText.toString()
                });
            }
            return response.json() as Promise<T>;
          }
          setSuccess(true);
          setLoading(false);
          // Success Notifications
          switch (verbosity) {
            case VERBOSITY.SILENT:
              break;
            case VERBOSITY.NORMAL:
              setNotification({
                message: `Success: ${response.statusText}`
              });
              break;
            case VERBOSITY.VERBOSE:
              setNotification({
                message: `Success: ${response.status} ${response.statusText}`,
                duration: 10
              });
              break;
            default:
              setNotification({
                message: `Success: ${response.statusText}`
              });
          }
          return response.json() as Promise<T>;
        })
        .catch((e) => {
          setError(true);
          setNotification({
            message: `Error: ${e}`
          });
          setLoading(false);
          return e as Promise<T>;
        });
    },
    [token, setNotification, verbosity, setToken]
  );

  return {
    fetchMe,
    loading,
    error,
    success
  };
}
