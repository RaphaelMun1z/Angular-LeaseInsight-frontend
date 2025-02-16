import { Client } from "./client";
import { Property } from "./property";

export interface Report {
    id: string,
    description: string,
    date: string,
    reportType: string,
    residence: Property,
    tenant: Client
}