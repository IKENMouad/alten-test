import { Action, createReducer, on } from '@ngrx/store';

import { AuthActions, LogoutAction } from './auth.actions';
import { AuthState } from './auth.models';

export const initialState: AuthState = {
    isLoggedIn: !!localStorage.getItem('token'),
    user: JSON.parse("" + localStorage.getItem("userData")) || undefined,
    token: localStorage.getItem('token'),
};

const reducer = createReducer(
    initialState,
    on(AuthActions.request, (state,): AuthState => ({ ...state, })),
    on(AuthActions.success, (state, action): AuthState => ({ ...state, token: action.token, isLoggedIn: true, user: action.user })),
    on(AuthActions.failed, (state): AuthState => ({ ...state, isLoggedIn: false, user: undefined, token: "" })),


    on(LogoutAction, (): AuthState =>  {
        localStorage.clear();
        return { ...initialState, };
    } ),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
    return reducer(state, action);
}