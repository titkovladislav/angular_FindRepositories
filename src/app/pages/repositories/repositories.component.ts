import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { RepoService } from 'src/app/services/repo.service';
import { Subject, takeUntil} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addTitleKey,
  loadRepositoriesAction,
  repositoriesSelector,
  searchQueryState,
  addLanguageKeyAction
} from 'src/app/reducers/searchQuery';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})

export class RepositoriesComponent implements OnInit, OnDestroy {
  constructor(
    private repoService: RepoService,
    private store: Store<searchQueryState>,
  ) { }

  private unsubscribe$: Subject<void> = new Subject();

  repositories$ = this.store.select(repositoriesSelector)
    .pipe(takeUntil(this.unsubscribe$));
  titleKey = new FormControl('');
  languageKey = new FormControl('');

  ngOnInit() {

    this.store.select(repositoriesSelector)
      .subscribe(({ length }) => {
        if (!length) {
          this.store.dispatch(loadRepositoriesAction());
        }
      });

    // this.repositories$.subscribe(repositories => repositories);

    this.titleKey.valueChanges
    .pipe(
      debounceTime(1300),
      takeUntil(this.unsubscribe$),
    )
    .subscribe(input => {
      this.store.dispatch(addTitleKey({ titleKey: input }));
    });

    this.languageKey.valueChanges
      .pipe(
        debounceTime(1300),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(input => {
        this.store.dispatch(addLanguageKeyAction({ languageKey: input }));
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
