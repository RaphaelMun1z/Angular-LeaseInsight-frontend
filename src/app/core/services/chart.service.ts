import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    
    constructor() { }
    
    transitionComplete(){
        return true;
    }

    preset(){
        return true;
    }
}
