import { Feature } from "./feature";
import { Owner } from "./owner";
import { PropertyAddress } from "./propertyAddress";

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
    occupancyStatus: string;
    marketValue: number;
    rentalValue: number;
    dateLastRenovation: string;
    residenceAddress: PropertyAddress;
    files: File[];
    fullAddress?: string;
    features?: Feature[];
    owner?: Owner;
}

export interface PropertyMinimal {
    id: number;
    propertyType: string;
    numberBedrooms: number;
    totalArea: number;
    garageSpaces: number;
    rentalValue: number;
    residenceAddress: PropertyAddress;
    images: File[];
    fullAddress?: string;
}

export interface PropertyCreate {
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
    residenceAddress: string;
    owner: string;
    images: File[];
}

export interface AddFeature {
    property: {
        id: string 
    },
    feature: {
        id: string
    }
}