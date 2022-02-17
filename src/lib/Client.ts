class Client {
    token: string

    constructor() {
        this.token = localStorage.getItem('token') || ""
    }

    removeToken(): void {
        this.token = ""
        localStorage.setItem('token', "")
    }

    isLoggedIn(): boolean {
        return !!this.token
        // TODO: build out token validation
    }

    logout(): void {
        this.removeToken()
    }

    async fetchMe<T>(method: string, path: string, data?: any): Promise<T> {
        var headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')

        if (this.token) {
            headers.append('Authorization', `Bearer ${this.token}`)
        }
        const reqOptions = {
            method: method,
            headers: headers,
            body: JSON.stringify(data) || undefined
        }
        let response = await fetch(`${path}`, reqOptions)
        if (!response.ok) {
            let errResponse = await response.json()
            throw new Error(errResponse.message)
        }
        return response.json() as Promise<T>
    }

    prettyError(err: Error): string {
       return err.toString().replace('Error:', '')
    }
}

export const client = new Client()