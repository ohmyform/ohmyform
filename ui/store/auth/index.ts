import redux, { Reducer } from 'redux'

export interface AuthState {
  authenticated?: boolean
}

type ActionTypes = 'AUTH_INIT' | 'AUTH_LOGOUT' | 'AUTH_UPDATE_SETTINGS'
type Action = redux.Action<ActionTypes> & redux.AnyAction

export const actionTypes: { [key: string]: ActionTypes } = {
  INIT: 'AUTH_INIT',
  LOGOUT: 'AUTH_LOGOUT',
  UPDATE_SETTINGS: 'AUTH_UPDATE_SETTINGS',
}

const initialState: AuthState = {}

export const auth: Reducer<AuthState, Action> = (state = initialState): AuthState => {
  return state
}
