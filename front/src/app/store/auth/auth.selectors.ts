import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.models';

export const selectAuth = createFeatureSelector<AuthState>("auth");


export const selectIsLoggedIn = createSelector(selectAuth, state => state?.isLoggedIn);
export const selectAuthUser = createSelector(selectAuth, state => state?.user);
export const selectToken = createSelector(selectAuth, state => state?.token);