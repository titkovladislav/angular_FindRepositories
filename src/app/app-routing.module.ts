import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, ParamMap  } from '@angular/router';
import { DetalsComponent } from './pages/detals/detals/detals.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';

const routes: Routes = [
    { path: '', component: RepositoriesComponent},
    { path: 'detals/:id', component: DetalsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
