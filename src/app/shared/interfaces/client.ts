export interface Client {
    id: string,
    name: string,
    phone: string,
    email: string,
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
    id: string | null,
    name: string,
    phone: string,
    email: string,
    password: string,
    dateOfBirth: string,
    cpf: string,
    rg: string,
    registrationDate: string,
    tenantStatus: string,
    tenantBillingAddress: {
        id: string
    }
}