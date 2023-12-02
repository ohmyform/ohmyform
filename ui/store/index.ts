import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { auth, AuthState } from './auth'

export interface State {
  auth: AuthState
}

const root = (state: State, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload } as State
  }

  const combined = combineReducers({
    auth,
  })

  return combined(state, action)
}

const makeStore = () => {
  return createStore(root, undefined, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: false })
