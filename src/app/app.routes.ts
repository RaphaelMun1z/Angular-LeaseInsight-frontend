import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { propertyFormGuard } from './core/guards/property-form.guard';
import { contractFormGuard } from './core/guards/contract-form.guard';

import { LayoutComponent } from './core/layouts/layout/layout.component';
import { LayoutDashboardComponent } from './core/layouts/layout-dashboard/layout-dashboard.component';

import { HomeComponent } from './features/home/home.component';
import { PropertiesComponent } from './features/properties/properties.component';
import { PropertyComponent } from './features/property/property.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ContactComponent } from './features/contact/contact.component';
import { LoginComponent } from './features/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { GeneralComponent } from './features/dashboard/sections/general/general.component';
import { PropertiesComponent as PropertiesDashboardComponent } from './features/dashboard/sections/properties/properties.component';
import { FinanceComponent } from './features/dashboard/sections/finance/finance.component';
import { EmployeesComponent } from './features/dashboard/sections/employees/employees.component';
import { ClientsComponent } from './features/dashboard/sections/clients/clients.component';
import { NotificationsComponent } from './features/dashboard/components/notifications/notifications.component';
import { SuportComponent } from './features/dashboard/sections/suport/suport.component';
import { ContractsComponent } from './features/dashboard/sections/contracts/contracts.component';
import { ReadComponent } from './features/dashboard/components/notifications/components/read/read.component';
import { UnreadComponent } from './features/dashboard/components/notifications/components/unread/unread.component';
import { CreateClientComponent } from './features/dashboard/components/forms/create-client/create-client.component';
import { CreateEmployeesComponent } from './features/dashboard/components/forms/create-employees/create-employees.component';
import { CreateContractComponent } from './features/dashboard/components/forms/create-contract/create-contract.component';
import { SelectPropertyComponent } from './features/dashboard/components/forms/create-contract/steps/select-property/select-property.component';
import { SelectClientComponent } from './features/dashboard/components/forms/create-contract/steps/select-client/select-client.component';
import { DetailsComponent } from './features/dashboard/components/forms/create-contract/steps/details/details.component';
import { ConfirmComponent } from './features/dashboard/components/forms/create-contract/steps/confirm/confirm.component';
import { CreatePropertyComponent } from './features/dashboard/components/forms/create-property/create-property.component';
import { CharacteristicsComponent } from './features/dashboard/components/forms/create-property/steps/characteristics/characteristics.component';
import { SelectOwnerComponent } from './features/dashboard/components/forms/create-property/steps/select-owner/select-owner.component';
import { SelectAddressComponent } from './features/dashboard/components/forms/create-property/steps/select-address/select-address.component';
import { ConfirmationComponent } from './features/dashboard/components/forms/create-property/steps/confirmation/confirmation.component';
import { CreatePropertyAddressComponent } from './features/dashboard/components/forms/create-property-address/create-property-address.component';
import { CreatePropertyFeatureComponent } from './features/dashboard/components/forms/create-property-feature/create-property-feature.component';
import { OwnersComponent } from './features/dashboard/sections/owners/owners.component';
import { CreateOwnerComponent } from './features/dashboard/components/forms/create-owner/create-owner.component';
import { AddressesComponent } from './features/dashboard/sections/properties/addresses/addresses.component';
import { FeaturesComponent } from './features/dashboard/sections/properties/features/features.component';
import { InvoicesComponent } from './features/dashboard/sections/invoices/invoices.component';
import { CreateInvoiceComponent } from './features/dashboard/components/forms/create-invoice/create-invoice.component';
import { CreateClientBillingAddressComponent } from './features/dashboard/components/forms/create-client-billing-address/create-client-billing-address.component';
import { BillingAddressesComponent } from './features/dashboard/sections/clients/billing-addresses/billing-addresses.component';
import { CreatePropertyFeatureAddComponent } from './features/dashboard/components/forms/create-property-feature-add/create-property-feature-add.component';
import { ProfileComponent } from './features/profile/profile.component';
import { InvoicesComponent as InvoicesProfileComponente } from './features/profile/invoices/invoices.component';
import { DetailsComponent as DetailsProfileComponente } from './features/profile/details/details.component';

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
                path: 'imovel/:id',
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
                path: 'perfil',
                component: ProfileComponent,
                canActivate: [authGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'detalhes',
                        pathMatch: 'full'
                    },
                    {
                        path: 'detalhes',
                        component: DetailsProfileComponente
                    },
                    {
                        path: 'faturas',
                        component: InvoicesProfileComponente
                    }
                ]
            },
            {
                path: '**',
                component: NotFoundComponent
            }
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
                component: PropertiesDashboardComponent,
            },
            {
                path: 'imoveis/criar',
                component: CreatePropertyComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'caracteristicas',
                        pathMatch: 'full'
                    },
                    {
                        path: 'caracteristicas',
                        component: CharacteristicsComponent
                    },
                    {
                        path: 'selecionar-endereco',
                        component: SelectAddressComponent,
                        canActivate: [propertyFormGuard]
                    },
                    {
                        path: 'selecionar-proprietario',
                        component: SelectOwnerComponent,
                        canActivate: [propertyFormGuard]
                    },
                    {
                        path: 'confirmacao',
                        component: ConfirmationComponent,
                        canActivate: [propertyFormGuard]
                    },
                ]
            },
            {
                path: 'imoveis/enderecos',
                component: AddressesComponent
            },
            {
                path: 'imoveis/endereco/criar',
                component: CreatePropertyAddressComponent
            },
            {
                path: 'imoveis/caracteristicas',
                component: FeaturesComponent
            },
            {
                path: 'imoveis/caracteristicas/criar',
                component: CreatePropertyFeatureComponent
            },
            {
                path: 'imoveis/caracteristicas/adicionar',
                component: CreatePropertyFeatureAddComponent
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
                path: 'clientes/enderecos-de-cobranca',
                component: BillingAddressesComponent
            },
            {
                path: 'clientes/endereco-de-cobranca/criar',
                component: CreateClientBillingAddressComponent
            },
            {
                path: 'proprietarios',
                component: OwnersComponent
            },
            {
                path: 'proprietarios/criar',
                component: CreateOwnerComponent
            },
            {
                path: 'contratos',
                component: ContractsComponent
            },
            {
                path: 'contratos/criar',
                component: CreateContractComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'selecionar-imovel',
                        pathMatch: 'full'
                    },
                    {
                        path: 'selecionar-imovel',
                        component: SelectPropertyComponent
                    },
                    {
                        path: 'selecionar-cliente',
                        component: SelectClientComponent,
                        canActivate: [contractFormGuard]
                    },
                    {
                        path: 'detalhes',
                        component: DetailsComponent,
                        canActivate: [contractFormGuard]
                    },
                    {
                        path: 'confirmacao',
                        component: ConfirmComponent,
                        canActivate: [contractFormGuard]
                    },
                ]
            },
            {
                path: 'faturas',
                component: InvoicesComponent,
            },
            {
                path: 'faturas/criar',
                component: CreateInvoiceComponent,
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
    }
];
