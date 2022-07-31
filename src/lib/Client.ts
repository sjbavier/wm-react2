export type TRequest = {
  method: string;
  path: string;
  data?: any;
  token?: string;
};

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

export const fetchMe = async <T>(request: TRequest): Promise<T> => {
  var headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  if (request.token) {
    headers.append('Authorization', `Bearer ${request.token}`);
  }
  const reqOptions = {
    method: request.method,
    headers: headers,
    body: JSON.stringify(request.data) || undefined
  };
  let response = await fetch(`${request.path}`, reqOptions);
  if (!response.ok) {
    let errResponse = await response.json();
    throw errResponse.msg;
  }
  return response.json() as Promise<T>;
};
