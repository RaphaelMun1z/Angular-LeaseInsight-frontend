import { Property } from "./property";

export interface Contract {
    id: string;
    contractStartDate: string; 
    contractEndDate: string; 
    defaultRentalValue: number;
    contractStatus: "ACTIVE" | "INACTIVE" | "PENDING" | "TERMINATED" | "";
    tenant: {
        name: string;
    },
    residence: Property
}

export interface ContractCreate {
    residence: {
        id: string
    },
    tenant: {
        id: string
    },
    contractStartDate: string,
    contractEndDate: string,
    defaultRentalValue: number,
    contractStatus: string,
    invoiceDueDate: number
}