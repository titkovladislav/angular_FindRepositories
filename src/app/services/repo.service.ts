import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterI } from 'src/app/reducers/searchQuery';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private http: HttpClient) {}

  getRepos({ titleKey, languageKey }: FilterI): Observable<any> {
    return this.http.get(`https://api.github.com/search/repositories`, { params: { q: titleKey, languageKey } });
  }
}
