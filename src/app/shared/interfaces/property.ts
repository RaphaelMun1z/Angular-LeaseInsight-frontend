/* export interface Property {
    id: string,
    residenceAddress: {
        street: string;
        district: string;
        city: string;
        state: string;
        country: string;
        cep: string;
        complement?: string; 
    };
    description: string;
    number: number,
    rentalValue: number;
    occupancyStatus: number; 
    propertyType: number; 
} */

interface ResidenceAddress {
    id: string;
    street: string;
    district: string;
    city: string;
    state: string;
    country: string;
    cep: string;
    complement: string;
}

export interface Property {
    id: string;
    propertyType: "HOUSE" | "APARTMENT" | "CONDO" | "TOWNHOUSE" | "OTHER";
    description: string;
    number: number;
    aptNumber: number | null;
    complement: string;
    numberBedrooms: number;
    numberBathrooms: number;
    numberSuites: number;
    totalArea: number;
    builtArea: number;
    garageSpaces: number;
    yearConstruction: string;
    occupancyStatus: "VACANT" | "OCCUPIED" | "UNDER_RENOVATION";
    marketValue: number;
    rentalValue: number;
    dateLastRenovation: string;
    residenceAddress: ResidenceAddress;
}