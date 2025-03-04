import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AdditionalFeatureStateService } from '../../../../../core/states/additional-feature.service';
import { AdditionalFeature } from '../../../../../shared/interfaces/additionalFeature';

import { ContentBlockComponent } from '../../../components/content-block/content-block.component';
import { DashboardBaseComponent } from '../../../components/dashboard-base/dashboard-base.component';
import { TablePropertiesFeaturesComponent } from '../../../components/tables/table-properties-features/table-properties-features.component';

@Component({
    selector: 'app-features',
    imports: [ContentBlockComponent, DashboardBaseComponent, TablePropertiesFeaturesComponent],
    templateUrl: './features.component.html',
    styleUrl: './features.component.scss'
})

export class FeaturesComponent implements OnInit {
    protected additionalFeatures$ = new Observable<AdditionalFeature[]>();
    additionalFeatures : AdditionalFeature[] = [];
    
    constructor(private additionalFeatureStateService: AdditionalFeatureStateService){
        this.additionalFeatureStateService.loadAdditionalFeatures();
    }
    
    ngOnInit(): void {
        this.additionalFeatures$ = this.additionalFeatureStateService.listenToAdditionalFeaturesChanges();
        this.additionalFeatures$.subscribe((data: AdditionalFeature[]) => {
            this.additionalFeatures = data;
        });
    }
}