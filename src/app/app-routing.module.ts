import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { UserFormContainerComponent } from './components/user-form-container/user-form-container.component';
import { BookFormContainerComponent } from './components/book-form-container/book-form-container.component';
import { MatchesListContainerComponent } from './components/matches-list-container/matches-list-container.component';
import { PasswordlessAuthComponent } from './components/passwordless-auth/passwordless-auth.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './services/guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'sign-up',
    component: PasswordlessAuthComponent
  },
  {
    path: 'login',
    component: WelcomeComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: UserContainerComponent
  },
  {
    path: 'match_request_form',
    canActivate: [AuthGuard],
    component: BookFormContainerComponent
  },
  {
    path: 'match_request_list',
    canActivate: [AuthGuard],
    component: MatchesListContainerComponent
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
