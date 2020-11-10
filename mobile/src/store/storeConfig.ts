import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { AppState } from './actions/actionTypes'
import userReducer from './reducers/user'

const reducers = combineReducers<AppState>({
    user: userReducer
})

const middleware = applyMiddleware(thunk)

export const store = createStore(reducers, middleware)
export type RootState = ReturnType<typeof reducers>