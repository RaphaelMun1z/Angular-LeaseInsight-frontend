import { CurrentUser } from "./user";

export interface Owner extends CurrentUser{
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