export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

export interface User {
    id: number
    name: string
    email: string
    phone: string
    uf: string
    cep: string
    city: string
    street: string
    number: string
    neighborhood: string
    token: string
}

interface OnLoginAction {
    type: typeof USER_LOGGED_IN
    payload: User
}

interface OnLogoutAction {
    type: typeof USER_LOGGED_OUT
}

export type AuthActionTypes = OnLoginAction | OnLogoutAction

export type AppState = {
    user: User
}