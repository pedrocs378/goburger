import { USER_LOGGED_IN, USER_LOGGED_OUT, User, AuthActionTypes } from './actionTypes'

export function login (user: User): AuthActionTypes {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export function logout (): AuthActionTypes {
    return {
        type: USER_LOGGED_OUT
    }
}