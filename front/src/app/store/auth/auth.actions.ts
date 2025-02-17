import { createAction, createActionGroup, props } from '@ngrx/store';


export const AuthActions = createActionGroup({
  source: '[Auth]: token',
  events: {
    request: props<{ username: string, password: string, }>(),
    success: props<{ token: string, user: any }>(),
    failed: props<{ error: string }>(),
  },
});

export const LogoutAction = createAction('[Auth] Logout');