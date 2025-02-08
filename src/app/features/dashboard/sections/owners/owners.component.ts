import { Component, OnInit } from '@angular/core';
import { ContentBlockComponent } from '../../components/content-block/content-block.component';
import { DashboardBaseComponent } from '../../components/dashboard-base/dashboard-base.component';
import { TableOwnersComponent } from '../../components/views/table-owners/table-owners.component';
import { Owner } from '../../../../shared/interfaces/owner';
import { Observable } from 'rxjs';
import { OwnerStateService } from '../../../../core/states/owner-state.service';

@Component({
    selector: 'app-owners',
    imports: [ContentBlockComponent, DashboardBaseComponent, TableOwnersComponent],
    templateUrl: './owners.component.html',
    styleUrl: './owners.component.scss'
})

export class OwnersComponent implements OnInit {
    protected owners$ = new Observable<Owner[]>();
    owners : Owner[] = [];
    
    constructor(private ownerStateService: OwnerStateService){
        this.ownerStateService.loadOwners();
    }
    
    ngOnInit(): void {
        this.getOwners();
        this.owners$.subscribe((data: Owner[]) => {
            this.owners = data;
        });
    }
    
    getOwners(){
        this.owners$ = this.ownerStateService.listenToChanges();
    }
}
