export interface BillingAddress{
    id: string,
    number: number,
    street: string,
    district: string,
    city: string,
    state: string,
    country: string,
    cep: string,
    complement: string
}

export interface BillingAddressCreate{
    number: number,
    street: string,
    district: string,
    city: string,
    state: string,
    country: string,
    cep: string,
    complement: string
}

export interface BillingAddressUpdate{
    number: number,
    street: string,
    district: string,
    city: string,
    state: string,
    country: string,
    cep: string,
    complement: string
}