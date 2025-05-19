import { Routes } from '@angular/router';

export const routes: Routes = [

    {path:'' , redirectTo:'home' , pathMatch:'full'},
    {path:'home' , loadComponent:()=>import('./features/pages/home/home.component').then((c)=>c.HomeComponent) 
    , title:'home'},
    {path:'details/:id' , loadComponent:()=>import('./features/pages/details/details.component').then((c)=>c.DetailsComponent) 
    , title:'details'}

];
