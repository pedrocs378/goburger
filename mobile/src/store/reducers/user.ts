import { USER_LOGGED_IN, USER_LOGGED_OUT, User, AuthActionTypes } from '../actions/actionTypes'

const initialState: User = {
    id: -1,
    name: "",
    email: "",
    phone: "",
    uf: "",
    cep: "",
    city: "",
    street: "",
    number: "",
    neighborhood: "",
    token: "",
}

function reducer(state = initialState, action: AuthActionTypes): User {
    switch(action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                phone: action.payload.phone,
                uf: action.payload.uf,
                cep: action.payload.cep,
                city: action.payload.city,
                street: action.payload.street,
                number: action.payload.number,
                neighborhood: action.payload.neighborhood,
                token: action.payload.token,
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                id: -1,
                name: "",
                email: "",
                phone: "",
                uf: "",
                cep: "",
                city: "",
                street: "",
                number: "",
                neighborhood: "",
                token: "",
            }
        default:
            return state
    }
    
}

export default reducer