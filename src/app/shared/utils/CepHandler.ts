import { inject } from "@angular/core";

import { CepService } from "../../core/services/cep.service";
import { MessageService } from "primeng/api";

export class CepHandler {
    private cep!: string;
    private street!: string;
    private district!: string;
    private city!: string;
    private state!: string;
    
    private service = inject(CepService);
    private messageService = inject(MessageService);
    
    constructor() {}
    
    public getCep(): string {
        return this.cep;
    }
    
    public setCep(cep: string): void {
        this.cep = cep;
    }
    
    public getStreet(): string {
        return this.street;
    }
    
    public setStreet(street: string): void {
        this.street = street;
    }
    
    public getDistrict(): string {
        return this.district;
    }
    
    public setDistrict(district: string): void {
        this.district = district;
    }
    
    public getCity(): string {
        return this.city;
    }
    
    public setCity(city: string): void {
        this.city = city;
    }
    
    public getState(): string {
        return this.state;
    }
    
    public setState(state: string): void {
        this.state = state;
    }
    
    public setAddress(cep: string){
        this.service.getAddressByCep(cep).subscribe({
            next: (data) => {
                if(!data.erro){
                    this.setStreet(data.logradouro);
                    this.setDistrict(data.bairro);
                    this.setCity(data.localidade);
                    this.setState(data.estado);
                }else{
                    this.messageService.add({ severity: 'warn', summary: 'Erro', detail: 'CEP inválido', life: 3000 });
                }
            },
            error: (err) => {
                console.error('Erro ao buscar endereço: ', err);
            }
        });
    }
}