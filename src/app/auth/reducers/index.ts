import { isDevMode } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer, createReducer, on } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AuthActions } from '../action-types';
import { User } from '../model/user.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
}

export const reducers: ActionReducerMap<any> = {
  router: routerReducer,
};

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: undefined,
  })),
);

export const metaReducers: MetaReducer<any>[] = isDevMode() ? [] : [];
