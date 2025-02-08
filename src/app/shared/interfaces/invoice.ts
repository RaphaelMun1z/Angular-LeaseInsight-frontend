export interface Invoice {
    id: string,
    rentalStartDate: string,
    rentalEndDate: string,
    rentalValue: number,
    paymentStatus: number,
    contractId: string,
    residenceId: string
}

export interface InvoiceCreate {
    rentalStartDate: string,
    rentalEndDate: string,
    rentalValue: number,
    paymentStatus: number,
    contractId: string,
    residenceId: string
}