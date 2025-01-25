export interface Property {
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
    number: number,
    rentalValue: number;
    occupancyStatus: number; 
    propertyType: number; 
}