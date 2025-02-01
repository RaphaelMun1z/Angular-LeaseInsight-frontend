interface PropertyAddress {
    id: string;
    street: string;
    district: string;
    city: string;
    state: string;
    country: string;
    cep: string;
    complement: string;
}

interface File {
    id: string,
    name: string,
    path: string,
    type: string,
    size: number
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
    residenceAddress: PropertyAddress;
    files: File[];
}

export interface PropertyMinimal {
    id: number;
    propertyType: string;
    numberBedrooms: number;
    totalArea: number;
    garageSpaces: number;
    rentalValue: number;
    residenceAddress: PropertyAddress;
}