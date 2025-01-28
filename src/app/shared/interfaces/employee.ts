export interface Employee {
    id: string,
    name: string,
    phone: string,
    email: string
}

export interface EmployeeCreate {
    name: string,
    phone: string,
    email: string,
    password: string;
}