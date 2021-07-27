import axios from 'axios';
import {UserProfileType, UserType} from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '0f602aa3-6d23-4407-a5f8-35ff88297517'
    }
})

export const appAPI = {
    getUsers(currentPage: number = 1, count: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${count}`)
            .then(response => response.data)
    },
    toggleFollow(user: UserType) {
        return !user.followed ?
            (instance.post(`follow/${user.id}`, {})
                .then(response => response.data.resultCode))
            :
            (instance.delete(`follow/${user.id}`)
                .then(response => response.data.resultCode))
    },
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status })
    },
    savePhoto(photo: File) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put(`profile/photo`, formData)
    },
    saveProfile(profile: UserProfileType) {
        return instance.put(`profile`, profile)
    }
}

export const authAPI = {
    me() {
        return instance.get('auth/me')
            .then(response => response.data)
    },
    login({email, password, rememberMe = false, captcha = undefined}: authLoginType) {
        return instance.post('/auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete('/auth/login')
            .then(response => response.data)
    },
    getCaptcha() {
        return instance.get('/security/get-captcha-url')
            .then(response => response.data.url)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}

type authLoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}