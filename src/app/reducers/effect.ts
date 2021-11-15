import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RepoService } from '../services/repo.service';
import { foundReposAction, loadAction } from './searchQuery';

@Injectable()
export class dataEffect {
  loadData$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loadAction.type),
        switchMap(() => {
          console.log('fsfsfsf')
          return this.repoService.getFirstRepos().pipe(
            tap(console.log),
            map(val => val['items']),
            map((result: any[]) => {
              const tempArr: any[] = [];
              result.forEach((item, index) => {
                let obj = {
                  index: `${index + 1}.`,
                  author: item.owner.login,
                  name: item.name,
                  description: item.description,
                  link: item.html_url,
                  id: item.id,
                };
                tempArr.push(obj);
              });
              return foundReposAction({repositories: tempArr}) 
            })
          )
        }
         
        )
      );
    },
    { dispatch: false }
  );
  constructor(private action$: Actions, private repoService: RepoService, private store: Store) {
    //this.store.select(filterSelector).subscribe(val => this.filter = val)
  }
}
