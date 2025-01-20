import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testimonial } from '../interfaces/testimonial';

@Injectable({
    providedIn: 'root'
})

export class TestimonialService {
    private dataUrl = 'assets/db/testimonials.json';
    
    constructor(private http: HttpClient) { }
    
    getAll(): Observable<Testimonial[]> {
        return this.http.get<Testimonial[]>(this.dataUrl);
    }
}
