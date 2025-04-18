export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export interface CurrentUser {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
    authorities: string[];
}

export interface CurrentTenant extends CurrentUser {
    rg: string;
    cpf: string;
}