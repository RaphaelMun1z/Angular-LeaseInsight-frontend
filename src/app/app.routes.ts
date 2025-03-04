import { Routes } from '@angular/router';

// Guards
import { authGuard } from './core/guards/auth.guard';
import { admGuard } from './core/guards/adm.guard';
import { staffGuard } from './core/guards/staff.guard';
import { ownerGuard } from './core/guards/owner.guard';
import { tenantGuard } from './core/guards/tenant.guard';
import { guestGuard } from './core/guards/guest.guard';
import { propertyFormGuard } from './core/guards/forms/property-form.guard';
import { contractFormGuard } from './core/guards/forms/contract-form.guard';

// Core components
import { LayoutComponent } from './core/layouts/layout/layout.component';
import { LayoutDashboardComponent } from './core/layouts/layout-dashboard/layout-dashboard.component';

import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { UnauthorizedComponent } from './core/components/unauthorized/unauthorized.component';

// Public pages
import { HomeComponent } from './features/home/home.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ContactComponent } from './features/contact/contact.component';
import { LoginComponent } from './features/login/login.component';
import { PropertiesComponent } from './features/properties/properties.component';
import { PropertyComponent } from './features/property/property.component';

// Profile section
import { ProfileComponent } from './features/profile/profile.component';
import { DetailsComponent as DetailsProfileComponente } from './features/profile/details/details.component';
import { InvoicesComponent as InvoicesProfileComponente } from './features/profile/invoices/invoices.component';
import { ContractsComponent as ContractsProfileComponente } from './features/profile/contracts/contracts.component';
import { ReportsComponent as ReportsProfileComponente } from './features/profile/reports/reports.component';
import { PropertiesComponent as PropertiesProfileComponente } from './features/profile/properties/properties.component';

// Dashboard sections
import { GeneralComponent } from './features/dashboard/sections/general/general.component';
import { PropertiesComponent as PropertiesDashboardComponent } from './features/dashboard/sections/properties/properties.component';
import { FinanceComponent } from './features/dashboard/sections/finance/finance.component';
import { EmployeesComponent } from './features/dashboard/sections/employees/employees.component';
import { ClientsComponent } from './features/dashboard/sections/clients/clients.component';
import { SuportComponent } from './features/dashboard/sections/suport/suport.component';
import { ContractsComponent } from './features/dashboard/sections/contracts/contracts.component';
import { OwnersComponent } from './features/dashboard/sections/owners/owners.component';
import { AddressesComponent } from './features/dashboard/sections/properties/addresses/addresses.component';
import { FeaturesComponent } from './features/dashboard/sections/properties/features/features.component';
import { InvoicesComponent } from './features/dashboard/sections/invoices/invoices.component';
import { BillingAddressesComponent } from './features/dashboard/sections/clients/billing-addresses/billing-addresses.component';

// Dashboard components
import { NotificationsComponent } from './features/dashboard/components/notifications/notifications.component';

// Notification subcomponents
import { ReadComponent } from './features/dashboard/components/notifications/components/read/read.component';
import { UnreadComponent } from './features/dashboard/components/notifications/components/unread/unread.component';

// Forms - Create
import { CreateClientComponent } from './features/dashboard/components/forms/create/create-client/create-client.component';
import { CreateEmployeeComponent } from './features/dashboard/components/forms/create/create-employee/create-employee.component';
import { CreateContractComponent } from './features/dashboard/components/forms/create/create-contract/create-contract.component';
import { CreatePropertyComponent } from './features/dashboard/components/forms/create/create-property/create-property.component';
import { CreatePropertyAddressComponent } from './features/dashboard/components/forms/create/create-property-address/create-property-address.component';
import { CreatePropertyFeatureComponent } from './features/dashboard/components/forms/create/create-property-feature/create-property-feature.component';
import { CreateOwnerComponent } from './features/dashboard/components/forms/create/create-owner/create-owner.component';
import { CreateInvoiceComponent } from './features/dashboard/components/forms/create/create-invoice/create-invoice.component';
import { CreateClientBillingAddressComponent } from './features/dashboard/components/forms/create/create-client-billing-address/create-client-billing-address.component';
import { CreatePropertyFeatureAddComponent } from './features/dashboard/components/forms/create/create-property-feature-add/create-property-feature-add.component';

// Forms - Create (Contract Steps)
import { SelectPropertyComponent } from './features/dashboard/components/forms/create/create-contract/steps/select-property/select-property.component';
import { SelectClientComponent } from './features/dashboard/components/forms/create/create-contract/steps/select-client/select-client.component';
import { DetailsComponent } from './features/dashboard/components/forms/create/create-contract/steps/details/details.component';
import { ConfirmComponent } from './features/dashboard/components/forms/create/create-contract/steps/confirm/confirm.component';

// Forms - Create (Property Steps)
import { CharacteristicsComponent } from './features/dashboard/components/forms/create/create-property/steps/characteristics/characteristics.component';
import { SelectOwnerComponent } from './features/dashboard/components/forms/create/create-property/steps/select-owner/select-owner.component';
import { SelectAddressComponent } from './features/dashboard/components/forms/create/create-property/steps/select-address/select-address.component';
import { ConfirmationComponent } from './features/dashboard/components/forms/create/create-property/steps/confirmation/confirmation.component';

// Forms - Update
import { UpdateClientComponent } from './features/dashboard/components/forms/update/update-client/update-client.component';
import { UpdateOwnerComponent } from './features/dashboard/components/forms/update/update-owner/update-owner.component';
import { UpdateEmployeeComponent } from './features/dashboard/components/forms/update/update-employee/update-employee.component';
import { UpdateInvoiceComponent } from './features/dashboard/components/forms/update/update-invoice/update-invoice.component';
import { UpdateClientBillingAddressComponent } from './features/dashboard/components/forms/update/update-client-billing-address/update-client-billing-address.component';
import { UpdatePropertyAddressComponent } from './features/dashboard/components/forms/update/update-property-address/update-property-address.component';
import { UpdatePropertyFeatureComponent } from './features/dashboard/components/forms/update/update-property-feature/update-property-feature.component';
import { UpdateContractComponent } from './features/dashboard/components/forms/update/update-contract/update-contract.component';
import { UpdatePropertyComponent } from './features/dashboard/components/forms/update/update-property/update-property.component';

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
                path: 'login',
                component: LoginComponent,
                canActivate: [guestGuard]
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
                        component: InvoicesProfileComponente,
                        canActivate: [tenantGuard],
                    },
                    {
                        path: 'contratos',
                        component: ContractsProfileComponente,
                        canActivate: [tenantGuard],
                    },
                    {
                        path: 'relatos',
                        component: ReportsProfileComponente
                    },
                    {
                        path: 'propriedades',
                        component: PropertiesProfileComponente,
                        canActivate: [ownerGuard],
                    }
                ]
            },
            {
                path: 'dashboard',
                component: LayoutDashboardComponent,
                canActivate: [authGuard, staffGuard],
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
                        path: 'imoveis/atualizar/:id',
                        component: UpdatePropertyComponent,
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
                        path: 'imoveis/endereco/atualizar/:id',
                        component: UpdatePropertyAddressComponent
                    },
                    {
                        path: 'imoveis/caracteristicas',
                        component: FeaturesComponent
                    },
                    {
                        path: 'imoveis/caracteristicas/atualizar/:id',
                        component: UpdatePropertyFeatureComponent
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
                        component: EmployeesComponent,
                        canActivate: [admGuard],
                    },
                    {
                        path: 'funcionarios/criar',
                        component: CreateEmployeeComponent,
                        canActivate: [admGuard],
                    },
                    {
                        path: 'funcionarios/atualizar/:id',
                        component: UpdateEmployeeComponent,
                        canActivate: [admGuard],
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
                        path: 'clientes/atualizar/:id',
                        component: UpdateClientComponent
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
                        path: 'clientes/enderecos-de-cobranca/atualizar/:id',
                        component: UpdateClientBillingAddressComponent
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
                        path: 'proprietarios/atualizar/:id',
                        component: UpdateOwnerComponent
                    },
                    {
                        path: 'contratos',
                        component: ContractsComponent
                    },
                    {
                        path: 'contratos/atualizar/:id',
                        component: UpdateContractComponent
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
                        path: 'faturas/atualizar/:id',
                        component: UpdateInvoiceComponent,
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
                path: 'acesso-negado',
                component: UnauthorizedComponent
            },
            {
                path: '**',
                component: NotFoundComponent
            }
        ]
    }
];
