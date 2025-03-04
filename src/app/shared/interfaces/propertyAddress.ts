export interface PropertyAddress {
    id: string;
    street: string;
    district: string;
    city: string;
    state: string;
    country: string;
    cep: string;
    complement: string;
}

export interface PropertyAddressCreate {
    street: string;
    district: string;
    city: string;
    state: string;
    country: string;
    cep: string;
    complement: string;
}

export interface PropertyAddressUpdate {
    street: string;
    district: string;
    city: string;
    state: string;
    country: string;
    cep: string;
    complement: string;
}