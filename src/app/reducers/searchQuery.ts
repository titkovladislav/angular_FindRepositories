import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
//import { selectFeature}

export const addtitleKey = createAction('[SEARCHQUERY] changeTitleKey', props<{titleKey: string}>());
export const addlanguageKey = createAction('[SEARCHQUERY] languageKey');
export const addauthorKey = createAction('[SEARCHQUERY] authorKey');
export const loadAction = createAction('LOADDATA');
export const foundReposAction = createAction('[SEARCHQUERY] foundRepos', props<{repositories: any}>());

export interface searchQueryState {
    filter: {
        titleKey: string;
        languageKey: string;
        authorKey: string;
    };
    loadPage: boolean;
    repositories: any[];
}

export const initialState: searchQueryState = {
    filter: {
        titleKey: '',
        languageKey: '',
        authorKey: '',
    },
    loadPage: false,
    repositories: [],
}

// export interface initialStateF {
//     filter: {
//         titleKey: '',
//         languageKey: '',
//         authorKey: '',
//     },
//     repositories: []
    
// }

// export interface AppState {
//     feature: searchQueryState;
//   }

export const searchQueryReducer = createReducer(
    initialState,
    on(addtitleKey, (state, action) => {

        return {
            ...state,
            filter: { ...state.filter, titleKey: action.titleKey }
        }
    }),
    on(foundReposAction, (state, action)  => {
            
        return {
            ...state,
            repositories: action.repositories
        }
    }),
    on(loadAction, (state, action)  => {
            
        return {
            ...state,
            loadPage: true,
        }
    })
)

//Selectors

export const selectFeature = createFeatureSelector<searchQueryState>("searchQuery")
export const repositoriesSelector = createSelector(
    selectFeature,
    state => {
        console.log(state.repositories, 60)
        return state.repositories
    }
);
export const filterSelector = createSelector(
    selectFeature,
    state => {
        return state.filter
    }
)

//Effect

