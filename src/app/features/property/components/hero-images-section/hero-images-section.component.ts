import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { PropertyService } from '../../../../core/services/property.service';
import { Property } from '../../../../shared/interfaces/property';

@Component({
    selector: 'app-hero-images-section',
    imports: [CommonModule],
    templateUrl: './hero-images-section.component.html',
    styleUrl: './hero-images-section.component.scss'
})
export class HeroImagesSectionComponent implements OnChanges {
    @Input() property! : Property;
    images: string[] = [];
    errImg: string = "https://static.vecteezy.com/ti/vetor-gratis/p1/17173007-nao-pode-carregar-ilustracao-de-conceito-de-imagem-corrompida-de-design-plano-eps10-elemento-grafico-moderno-para-pagina-inicial-interface-do-usuario-de-estado-vazio-infografico-icone-vetor.jpg";
    
    constructor(private service: PropertyService) {}
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['property'] && changes['property'].currentValue) {
            this.images = [];
            
            if('images' in this.property && this.property.images.length > 0){
                this.property.images.forEach(file => {
                    this.uploadedImage(file.name).subscribe({
                        next: (imageUrl: string) => {
                            this.images = [...this.images, imageUrl];
                        },
                        error: (err: any) => {
                            this.images = [...this.images, this.errImg, this.errImg, this.errImg, this.errImg, this.errImg];
                            console.error('Erro ao carregar imagem', err);
                        }
                    });
                });
            }else{
                this.images = [...this.images, this.errImg, this.errImg, this.errImg, this.errImg, this.errImg];
            }
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
