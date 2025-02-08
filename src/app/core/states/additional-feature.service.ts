import { inject, Injectable } from '@angular/core';
import { AdditionalFeatureService } from '../services/additionalFeature.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AdditionalFeature } from '../../shared/interfaces/additionalFeature';

@Injectable({
    providedIn: 'root'
})

export class AdditionalFeatureStateService {
    private aditionalFeatures$ = new BehaviorSubject<AdditionalFeature[]>([]);
    private aditionalFeatureService = inject(AdditionalFeatureService);
    
    constructor() { }
    
    loadAdditionalFeatures(){
        this.aditionalFeatureService
        .getAdditionalFeatures()
        .pipe(take(1))
        .subscribe(aditionalFeatures => this.shareAdditionalFeaturees(aditionalFeatures))
    }
    
    private shareAdditionalFeaturees(aditionalFeatures: AdditionalFeature[]){
        this.aditionalFeatures$.next(aditionalFeatures);
    }
    
    listenToChanges(): Observable<AdditionalFeature[]>{
        return this.aditionalFeatures$.asObservable();
    }
    
    addAdditionalFeature(aditionalFeatures: AdditionalFeature){
        const currentAdditionalFeatures = this.aditionalFeatures$.value;
        this.aditionalFeatures$.next([...currentAdditionalFeatures, aditionalFeatures]);
    }
}
