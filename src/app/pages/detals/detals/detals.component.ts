import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepoService } from 'src/app/services/repo.service';
import { repositoriesSelector } from "../../../reducers/searchQuery";
import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs/operators";

@Component({
  selector: 'app-detals',
  templateUrl: './detals.component.html',
  styleUrls: ['./detals.component.scss']
})
export class DetalsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repoService: RepoService,
    private store: Store
  ) {}

  repository$ = this.store.select(repositoriesSelector)
    .pipe(
      mergeMap(repositories => {
        return this.route.params
          .pipe(
            map( ({ id }) =>  {
              return repositories.find((repository: any) => repository.id === +id)
            })
          )
      })
    );

  goHome() {
    this.router.navigate(['']);
  }
}

