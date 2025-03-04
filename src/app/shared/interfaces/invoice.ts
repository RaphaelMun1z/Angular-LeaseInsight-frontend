import { Contract } from "./contract"
import { Property } from "./property"

export interface Invoice {
    id: string,
    rentalStartDate: string,
    rentalEndDate: string,
    rentalValue: number,
    paymentStatus: string,
    contractId: string,
    residenceId: string
}

export interface InvoiceFull {
    id: string,
    rentalStartDate: string,
    rentalEndDate: string,
    rentalValue: number,
    paymentStatus: string,
    contract: Contract
}

export interface InvoiceCreate {
    rentalStartDate: string,
    rentalEndDate: string,
    rentalValue: number,
    paymentStatus: string,
    contractId: string,
    residenceId: string
}

export interface InvoiceUpdate {
    paymentStatus: string,
}