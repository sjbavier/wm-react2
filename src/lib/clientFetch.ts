interface ClientFetchOptions {
    method: string
    path: string
    data?: any
    cb: any
}

async function clientFetch( opts: ClientFetchOptions ) {
    const token = localStorage.getItem('token')
    var headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json' )

    if( token ) {
        headers.append('Authorization', `Bearer ${token}`)
    }
    const reqOptions = {
        method: opts.method,
        headers: headers,
        body: opts.data || undefined
    }


    return fetch(`${opts.path}`, reqOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(opts.cb)
        .catch((error) => console.log(error.message))
}


function checkStatus(response: any) {
    let status = response.status
    if (status >= 200 && status < 300) {
        return response
    } else {
        return response
    }
}

function parseJSON(response: any) {
    return response.json();
}  

export default clientFetch