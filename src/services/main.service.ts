import axios, { AxiosError, type AxiosResponse } from "axios";
import { AuthService } from "./auth.service";

const client = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status: number) => {
        return status >= 200 && status < 300
    }
})

export class MainService {

    static async login(email: string, password: string) {
        console.log('login checkpoint 1')
        
        return await client.request({
            url: '/user/login',
            method: 'post',
            data: {
                email: email,
                password: password
            }
        })
    }

    static async register(email: string, password: string, name: string) {
        return await client.request({
            url: '/user/register',
            method: 'post',
            data: {
                name: name,
                email: email,
                password: password
            }
        })
    }

    static async deleteUser(email: string) {
        return await client.request({
            url: '/user/delete',
            method: 'put',
            data: {
                email: email
            }
        })
    }

    static async createNewSpot(location: string, name: string, description: string = '', email: string) {
        
        return await this.useAxios('/spot/create', 'post', {
                name: name,
                location: location,
                description: description
            }
        )
    }

    static async useAxios<T>(url: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', data: any = {}) {
        
        console.log(url)

        let rsp: AxiosResponse

        try {
            console.log("login checkpoint 2")
            rsp = await client.request<T>({
                url: url,
                method: method,
                headers: {
                    'Authorization': `Bearer ${AuthService.getAccessToken()}`
                },
                data: data
            }) as AxiosResponse
        } catch (e) {
            rsp = (e as AxiosError).response as AxiosResponse
        }

        if (rsp == undefined) {
            throw new Error('BACKEND_BROKE')
        }

        if (rsp.status == 403 || rsp.status == 401) {
            try {
                const tokenRequest = await client.request({
                    url: '/user/refresh',
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${AuthService.getAccessToken()}` 
                    }
                })

                AuthService.createAuth(tokenRequest.data)

                rsp = await client.request<T>({
                    url: url,
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${AuthService.getAccessToken()}`
                    },
                    data: data
                })

            } catch(e) {
                AuthService.removeAuth()
                throw new Error('REFRESH_FAILED')
            }
        }

        if (rsp.status == 404) {
            throw new Error('NOT_FOUND')
        }

        return rsp
    }
}