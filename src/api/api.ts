import axios from 'axios';
import {UserType} from '../types/types';


export const getUsers = (currentPage: number = 1, count: number = 10) => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${count}`, {
        withCredentials: true
    })
        .then(response => response.data)
}

export const toggleFollowAPI = (user: UserType, toggleFollowFn: (userId: string) => void) => {
    !user.followed ?
        (axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
            withCredentials: true,
            headers: {
                'API-KEY': '9b61cb41-6326-4a3b-b5b4-20d19c98a067'
            }
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    toggleFollowFn(user.id)
                }
            })) :
        (axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
            withCredentials: true,
            headers: {
                'API-KEY': '9b61cb41-6326-4a3b-b5b4-20d19c98a067'
            }

        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    toggleFollowFn(user.id)
                }
            }))
}

export const authMe = (authFn: (id: string, email: string, login:string) => void) => {
    axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
        withCredentials: true
    })
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                authFn(id, email, login)
            }
        })
}