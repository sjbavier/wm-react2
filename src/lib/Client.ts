import clientFetch from "./clientFetch"

class Client {
    token: string

    constructor(){
        this.token = localStorage.getItem('token') || ""
    }

    removeToken(): void{
        this.token = ""
        localStorage.setItem('token', "")
    }

    isLoggedIn(): boolean{
        return !!this.token
        // TODO: build out token validation
    }

    logout(): void{
        this.removeToken()
    }

    async login(data: object, cb: object){
        const fetchOptions = {
            method : 'POST',
            path: '/auth/login',
            data: JSON.stringify(data),
            cb: cb
        }

        await clientFetch( fetchOptions )
    }

}

export const client = new Client()