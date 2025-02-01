import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Property } from '../../../../shared/interfaces/property';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../../../core/services/property.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-hero-images-section',
    imports: [CommonModule],
    templateUrl: './hero-images-section.component.html',
    styleUrl: './hero-images-section.component.scss'
})
export class HeroImagesSectionComponent implements OnChanges {
    @Input() property! : Property;
    images: string[] = [];
    
    constructor(private service: PropertyService) {}
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['property'] && changes['property'].currentValue) {
            this.images = [];
            
            this.property.files.forEach(file => {
                this.uploadedImage(file.name).subscribe({
                    next: (imageUrl: string) => {
                        this.images.push(imageUrl);
                        console.log(this.images);
                    },
                    error: (err: any) => {
                        console.error('Erro ao carregar imagem', err);
                    }
                });
            });
        }
    }
    
    uploadedImage(fileName: string): Observable<string> {
        return new Observable<string>((observer) => {
            this.service.getPropertyImageByImageName(fileName).subscribe({
                next: (res: Blob) => {
                    const imageUrl = URL.createObjectURL(res);
                    observer.next(imageUrl);
                    observer.complete();
                },
                error: (err: any) => {
                    console.error('Erro ao carregar imagem', err);
                    observer.error(err);
                }
            });
        });
    }
    
    getPropertyType(type: string): string {
        switch (type) {
            case 'HOUSE':
            return 'Casa';
            case 'CONDO':
            return 'Condomínio';
            case 'FARM':
            return 'Fazenda';
            case 'WAREHOUSE':
            return 'Galpão';
            case 'COMMERCIAL_APARTMENT':
            return 'Sala Comercial';
            case 'RETAIL_STORE':
            return 'Loja';
            case 'APARTMENT':
            return 'Apartamento';
            case 'LAND_PLOT':
            return 'Terreno';
            default:
            return 'Desconhecido';
        }
    }
}
