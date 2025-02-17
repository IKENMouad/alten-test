import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { LogoutAction, } from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
    private readonly store = inject(Store);

    readonly authUser$ = this.store.select(AuthSelectors.selectAuthUser);
    readonly isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
    readonly token$ = this.store.select(AuthSelectors.selectToken);

    logout() {
        this.store.dispatch(LogoutAction());
    }
}