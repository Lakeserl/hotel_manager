import { Dashboard } from './features/admin/components/dashboard/dashboard';
import { Routes } from '@angular/router';
import { Register } from './auths/components/register/register';
import { Login } from './auths/components/login/login';

export const routes: Routes = [
    {
        path: 'admin', 
        children: [
        {
            path: 'dashboard1',
            loadComponent: () => import('./features/admin/components/dashboard1/dashboard1').then(m => m.Dashboard1)
        },
        {
                path: 'dashboard',
            loadComponent: () => import('./features/admin/components/dashboard/dashboard').then(m => m.Dashboard)
        },
        {
            path: 'rooms',
            loadComponent: () => import('./features/admin/components/rooms/rooms').then(m => m.Rooms)
        },
        {
            path: 'reservations',
            loadComponent: () => import('./features/admin/components/reservations/reservations').then(m=> m.Reservations)
        }
    ]
    },
    {
        path: 'customers', 
        children: [
            {
                path: 'rooms',
            loadComponent: () => import('./features/customers/components/rooms/rooms').then(m => m.Rooms)
            },
            {
                path: 'bookings',
                loadComponent: () => import('./features/customers/components/bookings/bookings').then(m=> m.Bookings)
            }
        ]
    },
    { path: 'register', component: Register },
    {path: 'login', component: Login}
];
