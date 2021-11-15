import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, takeUntil, map } from 'rxjs';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-detals',
  templateUrl: './detals.component.html',
  styleUrls: ['./detals.component.scss']
})
export class DetalsComponent implements OnInit, OnDestroy {

  
  item: any = {}
  searchForm: any = {
    titleKey: '',
    language: '',
    author: '',
  }

  private unsubscribe$: Subject<void> = new Subject();
  
  constructor(
    private route: ActivatedRoute,
    private repoService: RepoService,
  ) { }

  ngOnInit(): void {

    this.route.params
      .pipe(
       
        map( val =>  val['id']),
        takeUntil(this.unsubscribe$),

      )
      .subscribe( id => {
        this.searchForm.titleKey = id.split('&')[0]
        this.searchForm.author = `+user:${id.split('&')[1]}`
      })

    this.getItem()
   
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getItem(){
    this.repoService
      .getRepos(this.searchForm)
      .pipe(
        map(val => val.items[0]),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(val => {
        this.item = {
          title: val.name,
          avatar: val.owner.avatar_url,
          author: val.owner.login,
          language: val.language,
          url: val.html_url,
          created_at: val.created_at.substr(0,10),
          updated_at: val.updated_at.substr(0,10),
          description: val.description,
        }
      });
  }

}
