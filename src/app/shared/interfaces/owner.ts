export interface Owner {
    id: string;
    name: string;
    phone: string;
    email: string;
}

export interface OwnerCreate {
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface OwnerUpdate {
    name: string;
    phone: string;
    email: string;
}