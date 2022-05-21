export type TRequest = {
    method: string
    path: string
    data?: any
    token?: string
}

export const prettyError = (err: Error): string => {
    return err.toString().replace('Error:', '')
}

export const fetchMe = async <T>(request: TRequest): Promise<T> => {

    var headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    if (request.token) {
        headers.append('Authorization', `Bearer ${request.token}`)
    }
    const reqOptions = {
        method: request.method,
        headers: headers,
        body: JSON.stringify(request.data) || undefined
    }
    let response = await fetch(`${request.path}`, reqOptions)
    if (!response.ok) {
        let errResponse = await response.json()
        throw new Error(errResponse.message)
    }
    return response.json() as Promise<T>
}
