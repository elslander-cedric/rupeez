import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocatorComponent } from './locator/locator.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/locator'
  },
  {
    path: 'locator',
    component: LocatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
