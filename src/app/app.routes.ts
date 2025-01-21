import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PropertiesComponent } from './features/properties/properties.component';
import { PropertyComponent } from './features/property/property.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ContactComponent } from './features/contact/contact.component';
import { LoginComponent } from './features/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'imoveis',
        component: PropertiesComponent
    },
    {
        path: 'imovel',
        component: PropertyComponent
    },
    {
        path: 'nosso-time',
        component: AboutUsComponent
    },
    {
        path: 'contato',
        component: ContactComponent
    },
    {
        path: 'acessar',
        component: LoginComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
