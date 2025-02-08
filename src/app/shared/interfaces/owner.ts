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