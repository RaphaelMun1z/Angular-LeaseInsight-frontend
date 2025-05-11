import { CurrentUser } from "./user";

export interface Adm extends CurrentUser {
}

export interface AdmUpdate {
    name: string,
    phone: string,
    email: string
}