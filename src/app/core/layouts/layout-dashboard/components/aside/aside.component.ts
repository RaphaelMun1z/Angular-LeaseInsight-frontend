import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthUserService } from '../../../../services/authUser.service';
import { CurrentUser } from '../../../../../shared/interfaces/user';

import { StyleClass } from 'primeng/styleclass';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { Drawer } from 'primeng/drawer';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-aside',
    imports: [CommonModule, RouterModule, DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass],
    templateUrl: './aside.component.html',
    styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit{
    protected currentUser$ = new Observable<CurrentUser | null>();
    currentUser!: CurrentUser;
    
    @ViewChild('drawerRef') drawerRef!: Drawer;
    
    private authUserService = inject(AuthUserService);
    constructor() {}
    
    ngOnInit() {
        this.currentUser$ = this.authUserService.listenToAuthUser();
        this.currentUser$.subscribe({
            next: (data: CurrentUser | null) => {
                if (data) {
                    this.currentUser = data;
                }
            },
            error: (err: any) => {
                console.log("Erro: " + err);
            }
        });
    }
    
    closeCallback(e: Event): void {
        this.drawerRef.close(e);
    }
    
    visible: boolean = false;
}
