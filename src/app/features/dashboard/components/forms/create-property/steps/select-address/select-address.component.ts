import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreatePropertyComponent } from '../../create-property.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-select-address',
    imports: [],
    templateUrl: './select-address.component.html',
    styleUrl: './select-address.component.scss'
})

export class SelectAddressComponent implements OnInit {
    form!: FormGroup;
    
    router = inject(Router);
    private formContainer = inject(CreatePropertyComponent);
    
    ngOnInit(): void {
        this.form = this.formContainer.getStep2Form();
    }
}