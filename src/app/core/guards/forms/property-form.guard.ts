import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PropertyFormService } from '../../services/stepped-forms/property-form.service';

export const propertyFormGuard: CanActivateFn = (route, state) => {
    const propertyFormService = inject(PropertyFormService);
    const router = inject(Router);
    
    if (!route.url || route.url.length === 0) {
        router.navigate(['/dashboard/imoveis/criar/caracteristicas']);
        return false;
    }
    
    const step = route.url[route.url.length - 1]?.path;
    
    if (!propertyFormService.isStepAllowed(step)) {
        router.navigate(['/dashboard/imoveis/criar/caracteristicas']);
        return false;
    }
    
    return true;
}
