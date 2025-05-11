import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import L from 'leaflet';
import { environment as env } from '../../../../environments/environment';

@Component({
    selector: 'app-map',
    imports: [],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss'
})

export class MapComponent implements OnInit, OnDestroy {
    map: any;
    @Input() address: string = '';
    
    constructor(
        private router: Router
    ) { }
    
    ngOnInit(): void {
        const lat = 0;
        const lng = 0;
        
        this.map = L.map('mapa', {
            scrollWheelZoom: false
        }).setView([lat, lng], 1);
        
        L.tileLayer(env.MAPA_TILE_LAYER, {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.map);
        
        this.getCoordinatesFromAddress(this.address)
        .then(coords => {
            this.map.setView([coords.lat, coords.lon], coords.zoom);
            L.marker([coords.lat, coords.lon]).addTo(this.map).bindPopup(coords.msg).openPopup();
        });
        
        const mapElement = document.getElementById('mapa');
        if (mapElement) {
            mapElement.addEventListener('mouseenter', () => {
                this.map.scrollWheelZoom.enable();
            });
            
            mapElement.addEventListener('mouseleave', () => {
                this.map.scrollWheelZoom.disable();
            });
        }
    }
    
    ngOnDestroy() {
        this.map.invalidateSize();
    }
    
    addMarkers(lat: number, lon: number, desc: string) {
        L.marker([lat, lon]).addTo(this.map)
        .bindPopup(desc)
        .openPopup();
    }
    
    getCoordinatesFromAddress(address: string): Promise<{ lat: number, lon: number, zoom: number, msg: string }> {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        
        return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                console.log('Endereço não encontrado');
                return {
                    lat: -14.2350,
                    lon: -51.9253,
                    zoom: 3,
                    msg: 'Endereço não encontrado'
                };
            }
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                zoom: 15,
                msg: "Endereço encontrado"
            };
        });
    }
}