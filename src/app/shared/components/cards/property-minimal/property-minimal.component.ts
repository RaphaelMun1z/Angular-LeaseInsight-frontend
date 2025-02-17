import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { PropertyService } from '../../../../core/services/property.service';
import { Property, PropertyMinimal } from '../../../interfaces/property';

import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-property-minimal',
    imports: [CommonModule, GalleriaModule, ImageModule, RouterModule, CarouselModule, ButtonModule, TagModule, DividerModule],
    templateUrl: './property-minimal.component.html',
    styleUrl: './property-minimal.component.scss'
})
export class PropertyMinimalComponent implements OnChanges {
    @Input() propertyMinimal! : Property | PropertyMinimal;
    images: string[] = [];
    errImg: string = "https://static.vecteezy.com/ti/vetor-gratis/p1/17173007-nao-pode-carregar-ilustracao-de-conceito-de-imagem-corrompida-de-design-plano-eps10-elemento-grafico-moderno-para-pagina-inicial-interface-do-usuario-de-estado-vazio-infografico-icone-vetor.jpg";
    loadingImages: boolean = true;

    constructor(private service: PropertyService) {}
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['propertyMinimal'] && changes['propertyMinimal'].currentValue) {
            this.images = [];
            if('images' in this.propertyMinimal && this.propertyMinimal.images.length > 0){
                this.propertyMinimal.images.forEach(file => {
                    this.uploadedImage(file.name).subscribe({
                        next: (imageUrl: string) => {
                            this.loadingImages = true;
                            this.images = [...this.images, imageUrl];
                            this.loadingImages = false;
                        },
                        error: (err: any) => {
                            this.images = [...this.images, this.errImg];
                            this.loadingImages = false;
                            //console.error('Erro ao carregar imagem', err);
                        }
                    });
                });
            }else{
                this.images = [...this.images, this.errImg];
                this.loadingImages = false;
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
                    observer.error(err);
                }
            });
        });
    }
    
    getPropertyType(type: string) {
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
    
    responsiveOptions: any[] = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];
}
