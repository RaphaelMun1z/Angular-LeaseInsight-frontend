import { CurrentUser } from "./user"

export interface Client extends CurrentUser {
    dateOfBirth: string,
    cpf: string,
    rg: string,
    registrationDate: string,
    tenantStatus: string,
    tenantBillingAddress: ClientBillingAddress
}

interface ClientBillingAddress {
    id: string,
    street: string,
    district: string,
    city: string,
    state: string,
    country: string,
    cep: string,
    complement: string,
    number: number
}

export interface ClientCreate {
    name: string,
    phone: string,
    email: string,
    dateOfBirth: string,
    cpf: string,
    rg: string,
    tenantStatus: string,
    tenantBillingAddress: {
        id: string
    }
}

export interface ClientUpdate {
    name: string,
    phone: string,
    email: string,
    dateOfBirth: string,
    tenantStatus: string
}