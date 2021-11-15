import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
//import { Routes, RouterModule } from '@angular/router';
import { Repo } from './repo'
import { RepoService } from 'src/app/services/repo.service';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { select, State, Store } from '@ngrx/store';
import { addtitleKey, foundReposAction, loadAction, repositoriesSelector, searchQueryState } from 'src/app/reducers/searchQuery';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})


export class RepositoriesComponent implements OnInit {

  repos: any = [];
  //repos$: Observable<Array<repos>>;
  //repositories$ = this.store.pipe(select(repositoriesSelector));
  titleKey = new FormControl('');
  //repositories = (state: ) => state.users;
  //selectUsers = (state: State) => state.users;
  
  searchForm: any = {
    titleKey: '',
    language: '+language:javascript',
    author: '',
  };

  private unsubscribe$: Subject<void> = new Subject();
  
  constructor(
    private repoService: RepoService,
    private store: Store<searchQueryState>
    
  ) {
    
   }
  
  ngOnInit(): void {
    this.store.select(repositoriesSelector).subscribe(val => this.repos = val)
    //this.repos$ = this.store.select(repositoriesSelector)
    //this.getItems()
    this.store.dispatch(loadAction())

    this.titleKey.valueChanges
    .pipe(
      debounceTime(1300),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(val => {
      this.searchForm.titleKey = val;
      this.store.dispatch(addtitleKey({titleKey: val}));
      this.getItems();
    })
  }

  getItems(){
    this.repoService
      .getRepos(this.searchForm)
      .pipe(
        map(val => val['items']),
      )
      .subscribe((result: any[]) => {
        const tempArr: any[] = []
        result.map((item, index) => {
          let obj = {
            index: `${index + 1}.`,
            author: item.owner.login,
            name: item.name,
            description: item.description,
            link: item.html_url,
            id: item.id,
          }
          tempArr.push(obj)
        })
        this.store.dispatch(foundReposAction({repositories: tempArr}))
      });
  }

  getItemOne(){
    this.repoService.getFirstRepos().pipe(
      map(val => val['items']),
    )
    .subscribe((result: any[]) => {
      return console.log('getItemOne', result)
    })
  }
  
  addTitle(){
    this.getItemOne()
    //this.store.dispatch(addtitleKey({titleKey: this.test}))
    //console.log(this.searchForm);
    //this.store.select(repositoriesSelector).subscribe(val => console.log(val))
    //this.store.dispatch(loadAction())
    console.log('repos 2',this.repos)
  }

}