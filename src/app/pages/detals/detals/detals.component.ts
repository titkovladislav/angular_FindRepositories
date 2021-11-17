import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, map } from 'rxjs';
import { RepoService } from 'src/app/services/repo.service';
import { repositoriesSelector } from "../../../reducers/searchQuery";
import { Store } from "@ngrx/store";
import { mergeMap } from "rxjs/operators";

@Component({
  selector: 'app-detals',
  templateUrl: './detals.component.html',
  styleUrls: ['./detals.component.scss']
})
export class DetalsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repoService: RepoService,
    private store: Store
  ) { }

  repository: any = {}
  private unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {

    this.store.select(repositoriesSelector)
      .pipe(
        mergeMap(repositories => {
          return this.route.params
            .pipe(
              map( ({ id }) =>  {
                return repositories.find((repository: any) => repository.id === +id)
              }),
              takeUntil(this.unsubscribe$)
            )
        })
      )
      .subscribe(repo => this.repository = repo)
  }

  goHome(){
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
