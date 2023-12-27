import {$host} from './axios'
import jwt_decode  from 'jwt-decode'

export const registration = async (email: string, password: string, username: string) => {
    const {data} = await $host.post('api/user/registration', {email, password, username})
    return jwt_decode(data.token)
}

export const login = async (email: string, password: string) => {
    const {data} = await $host.post('api/user/login', {email, password})
    return jwt_decode(data.token)
}

export const auth = async (email: string, password: string) => {
    const {data} = await $host.post('api/user/login', {email, password})
    return jwt_decode(data.token)
}
