import { Component, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-aside',
    imports: [RouterModule, DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass],
    templateUrl: './aside.component.html',
    styleUrl: './aside.component.scss'
})
export class AsideComponent {
    @ViewChild('drawerRef') drawerRef!: Drawer;
    
    closeCallback(e: Event): void {
        this.drawerRef.close(e);
    }
    
    visible: boolean = false;
}
