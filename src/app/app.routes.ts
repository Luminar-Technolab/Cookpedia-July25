import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Recipes } from './recipes/recipes';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Register } from './register/register';
import { UserCollection } from './user-collection/user-collection';
import { UserProfile } from './user-profile/user-profile';
import { ViewRecipe } from './view-recipe/view-recipe';
import { Pnf } from './pnf/pnf';

export const routes: Routes = [
    //lazy load module :  http://localhost:4200/admin
    {
        path:'admin', loadChildren:()=>import('./admin/admin-module').then(module=>module.AdminModule)
    },
    // home : http://localhost:4200/
    {
        path:'', component:Home,title:"Home"
    },
    // recipes : http://localhost:4200/
    {
        path:'recipes', component:Recipes,title:"All Recipes"
    },
    // ablou : http://localhost:4200/
    {
        path:'about', component:About,title:"About"
    },
    // contact : http://localhost:4200/
    {
        path:'contact', component:Contact,title:"Contact"
    },
    // login : http://localhost:4200/
    {
        path:'login', component:Login,title:"Login"
    },
    // register : http://localhost:4200/
    {
        path:'register', component:Register,title:"Register"
    },
    // user collection : http://localhost:4200/
    {
        path:'user/collection', component:UserCollection,title:"Collections"
    },
    // profile : http://localhost:4200/
    {
        path:'user/profile', component:UserProfile,title:"Profile"
    },
    // view recipe : http://localhost:4200/
    {
        path:'recipes/:id/view', component:ViewRecipe,title:"Recipe"
    },
    // pnf : http://localhost:4200/
    {
        path:'**', component:Pnf,title:"Page Not Found"
    }
];
