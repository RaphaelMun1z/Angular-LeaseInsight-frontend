import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdditionalFeature, AdditionalFeatureCreate } from '../../shared/interfaces/additionalFeature';

@Injectable({
    providedIn: 'root'
})

export class AdditionalFeatureService { 
    private url = environment.api;
    
    constructor(private http: HttpClient) { }
    
    getAdditionalFeatures(): Observable<AdditionalFeature[]> {
        return this.http.get<AdditionalFeature[]>(this.url + "/additional-features");
    }
    
    getAdditionalFeatureById(id: string): Observable<AdditionalFeature> {
        return this.http.get<AdditionalFeature>(this.url + "/additional-features/" + id);
    }

    saveAdditionalFeature(feature: AdditionalFeatureCreate): any {
        return this.http.post<AdditionalFeature>(this.url + "/additional-features", feature);
    }
}
