import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { RepoService } from '../services/repo.service';
import {
  FilterI,
  filterSelector,
  loadRepositoriesAction,
  setRepositoriesAction
} from './searchQuery';

@Injectable()
export class dataEffect {

  constructor(private action$: Actions, private repoService: RepoService, private store: Store) {}

  loadData$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loadRepositoriesAction.type),
        switchMap(() => this.store.select(filterSelector)),
        switchMap((filter: FilterI) => {
          return this.repoService.getRepos(filter)
            .pipe(
              map(data => data['items']),
              map((result: any[]) => {
                const repositories: any[] = [];
                result.forEach((item, index) => {
                  const repository = {
                    index: `${index + 1}.`,
                    authorName: item.owner.login,
                    avatar: item.owner.avatar_url,
                    title: item.name,
                    language: item.language,
                    description: item.description,
                    created_at: item.created_at.substr(0,10),
                    updated_at: item.updated_at.substr(0,10),
                    url: item.html_url,
                    id: item.id,
                  };
                  repositories.push(repository);
                });
                return this.store.dispatch(setRepositoriesAction({ repositories: repositories }));
              })
            )
        })
      );
    },
    { dispatch: false }
  );
}
