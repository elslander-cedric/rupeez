import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocatorComponent } from './locator/locator.component';
import { AppShellComponent } from '@rupeez/app-shell/app-shell.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/locator',
    pathMatch: 'full'
  },
  {
    path: 'locator',
    component: LocatorComponent
  }/*,
  {
    path: '**',
    redirectTo: '/locator',
    pathMatch: 'full'
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
