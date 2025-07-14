import { Routes } from '@angular/router';
import { Register } from './auths/components/register/register';
import { Login } from './auths/components/login/login';

export const routes: Routes = [
    { path: 'register', component: Register },
    {path: 'login', component: Login}
];
