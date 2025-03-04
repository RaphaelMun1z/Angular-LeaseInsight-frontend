import { inject, Injectable } from '@angular/core';
import { AdditionalFeatureService } from '../services/additionalFeature.service';
import { BehaviorSubject, catchError, Observable, take, throwError } from 'rxjs';
import { AdditionalFeature } from '../../shared/interfaces/additionalFeature';

@Injectable({
    providedIn: 'root'
})

export class AdditionalFeatureStateService {
    private aditionalFeatures$ = new BehaviorSubject<AdditionalFeature[]>([]);
    
    private additionalFeatureService = inject(AdditionalFeatureService);
    
    // Get All
    loadAdditionalFeatures(){
        this.additionalFeatureService
        .getAdditionalFeatures()
        .pipe(take(1))
        .subscribe(aditionalFeatures => this.shareAdditionalFeatures(aditionalFeatures))
    }
    
    private shareAdditionalFeatures(aditionalFeatures: AdditionalFeature[]){
        this.aditionalFeatures$.next(aditionalFeatures);
    }
    
    listenToAdditionalFeaturesChanges(): Observable<AdditionalFeature[]>{
        return this.aditionalFeatures$.asObservable();
    }
    
    // Get By Id
    loadAdditionalFeature(id: string): Observable<AdditionalFeature | null> {
        return this.additionalFeatureService.getAdditionalFeatureById(id).pipe(
            take(1), 
            catchError(error => {
                return throwError(() => error);
            })
        );
    }
    
    // Add Additional Feature
    addAdditionalFeature(aditionalFeatures: AdditionalFeature){
        const currentAdditionalFeatures = this.aditionalFeatures$.value;
        this.aditionalFeatures$.next([...currentAdditionalFeatures, aditionalFeatures]);
    }
}
