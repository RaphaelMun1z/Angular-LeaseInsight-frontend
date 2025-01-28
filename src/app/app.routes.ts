import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PropertiesComponent } from './features/properties/properties.component';
import { PropertyComponent } from './features/property/property.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ContactComponent } from './features/contact/contact.component';
import { LoginComponent } from './features/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LayoutComponent } from './core/layouts/layout/layout.component';
import { LayoutDashboardComponent } from './core/layouts/layout-dashboard/layout-dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { GeneralComponent } from './features/dashboard/components/general/general.component';
import { PropertiesComponent as PropertiesDashboardComponent } from './features/dashboard/components/properties/properties.component';
import { FinanceComponent } from './features/dashboard/components/finance/finance.component';
import { EmployeesComponent } from './features/dashboard/components/employees/employees.component';
import { ClientsComponent } from './features/dashboard/components/clients/clients.component';
import { NotificationsComponent } from './features/dashboard/components/notifications/notifications.component';
import { SuportComponent } from './features/dashboard/components/suport/suport.component';
import { ContractsComponent } from './features/dashboard/components/contracts/contracts.component';
import { TabComponent } from './features/dashboard/components/notifications/components/tab/tab.component';
import { ReadComponent } from './features/dashboard/components/notifications/components/read/read.component';
import { UnreadComponent } from './features/dashboard/components/notifications/components/unread/unread.component';
import { CreateClientComponent } from './features/dashboard/components/forms/create-client/create-client.component';
import { CreateEmployeesComponent } from './features/dashboard/components/forms/create-employees/create-employees.component';
import { CreateContractComponent } from './features/dashboard/components/forms/create-contract/create-contract.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
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
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard]
    },
    {
        path: 'dashboard',
        component: LayoutDashboardComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'geral',
                pathMatch: 'full'
            },
            {
                path: 'geral',
                component: GeneralComponent
            },
            {
                path: 'imoveis',
                component: PropertiesDashboardComponent
            },
            {
                path: 'financa',
                component: FinanceComponent
            },
            {
                path: 'funcionarios',
                component: EmployeesComponent
            },
            {
                path: 'funcionarios/criar',
                component: CreateEmployeesComponent
            },
            {
                path: 'clientes',
                component: ClientsComponent
            },
            {
                path: 'clientes/criar',
                component: CreateClientComponent
            },
            {
                path: 'contratos',
                component: ContractsComponent
            },
            {
                path: 'contratos/criar',
                component: CreateContractComponent
            },
            {
                path: 'notificacoes',
                component: NotificationsComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'lidos',
                        pathMatch: 'full'
                    },
                    {
                        path: 'lidos',
                        component: ReadComponent
                    },
                    {
                        path: 'nao-lidos',
                        component: UnreadComponent
                    },
                ]
            },
            {
                path: 'suporte',
                component: SuportComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
