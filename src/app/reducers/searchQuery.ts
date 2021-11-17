import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

export const addTitleKey = createAction('[SEARCHQUERY] changeTitleKey', props<{titleKey: string}>());
export const addLanguageKeyAction = createAction('[SEARCHQUERY] languageKey', props<{languageKey: string}>());
export const loadRepositoriesAction = createAction('[LOADDATA] loadRepositories');
export const setRepositoriesAction = createAction('[SEARCHQUERY] foundRepos', props<{repositories: any}>());

export interface FilterI {
  titleKey: string;
  languageKey: string;
};

export interface searchQueryState {
    filter: FilterI;
    repositories: any[];
};

export const initialState: searchQueryState = {
    filter: {
        titleKey: 'a',
        languageKey: '',
    },
    repositories: [],
};

export const searchQueryReducer = createReducer(
    initialState,
    on(setRepositoriesAction, (state, action)  => {

      return {
        ...state,
        repositories: action.repositories
      }
    }),
    on(addTitleKey, (state, action) => {

        return {
            ...state,
            filter: { ...state.filter, titleKey: action.titleKey }
        }
    }),
    on(addLanguageKeyAction, (state, action)  => {

      return {
        ...state,
        filter: { ...state.filter, languageKey: action.languageKey }
      }
    }),
);

//Selectors

export const selectFeature = createFeatureSelector<searchQueryState>("searchQuery")
export const repositoriesSelector = createSelector(
    selectFeature,
    state => {
        return state.repositories
    }
);
export const filterSelector = createSelector(
    selectFeature,
    state => {
        return state.filter
    }
)

