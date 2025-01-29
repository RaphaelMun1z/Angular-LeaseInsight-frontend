export interface Contract {
    id: string;
    contractStartDate: string; 
    contractEndDate: string; 
    defaultRentalValue: number;
    contractStatus: "ACTIVE" | "INACTIVE" | "PENDING" | "TERMINATED" | "";
    tenant: {
        name: string;
    },
    residence: {
        number: number;
        residenceAddress: {
            street: string;
            district: string;
            city: string;
            state: string;
            country: string
        }
    }
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