import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserCreateComponent } from './pages/user/user-create/user-create.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    title: 'Usuários'
  },
  {
    path: 'users/create',
    component: UserCreateComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];
