import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { searchQueryReducer, searchQueryState } from './searchQuery';


export interface State {
  searchQuery: searchQueryState,
}

export const reducers: ActionReducerMap<State> = {
  searchQuery: searchQueryReducer,
};

//export const selectFeature = (state: State) => state.searchQuery;

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
