function clientFetch( method: string, path: string, cb: any ) {
    const token = localStorage.getItem('token')
    const headers = new Headers()
    interface RequestOptions {
        method: string,
        headers: object,
        redirect: string
    }
    const reqOptions: RequestOptions = {
        method: method,
        headers: headers,
        redirect: 'follow'
    }
    if( token ) {
        headers.append('Authorization', `Bearer ${token}`)
    }
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json' )

    return fetch(`localhost:5000${path}`, reqOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(cb)
        .catch((error) => console.log(error.message))
}


function checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error); // eslint-disable-line no-console
      throw error;
    }
}

function parseJSON(response: any) {
    return response.json();
}

export default clientFetch