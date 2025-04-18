import { CurrentUser } from "./user";

export interface Employee extends CurrentUser{
}

export interface EmployeeCreate {
    name: string,
    phone: string,
    email: string,
    password: string;
}

export interface EmployeeUpdate {
    name: string,
    phone: string,
    email: string
}