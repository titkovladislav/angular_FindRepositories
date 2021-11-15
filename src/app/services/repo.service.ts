import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RepositoriesComponent } from '../pages/repositories/repositories.component';
import { Repo } from '../pages/repositories/repo'
import { REPOS } from '../pages/repositories/mock-repo'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addtitleKey, filterSelector } from 'src/app/reducers/searchQuery';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  
  

  //titleKey$ = this.store.select(titleKeySelector);
  
  getRepos(filter:any): Observable<any> {
    //const filter = {}
    // const filter = {
    //   titleKey: '',
    //   language: '+language:javascript',
    //   author: '',
    // };
    
    //console.log('titleKey$', this.titleKey$)
    //console.log('service', searchForm)
    return this.http.get(`https://api.github.com/search/repositories?q=${filter.titleKey}${filter.language}${filter.author}`);
  }

  getFirstRepos(): Observable<any> {

    return this.http.get(`https://api.github.com/search/repositories?q='a'`);
  }

  constructor(
    private http: HttpClient,
    private store: Store
  ) { 
    
  }
}
