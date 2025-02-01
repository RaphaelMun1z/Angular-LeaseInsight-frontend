import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ContractFormService } from '../services/forms/contract-form.service';

export const contractFormGuard: CanActivateFn = (route, state) => {
    const contractFormService = inject(ContractFormService);
    const router = inject(Router);
    
    if (!route.url || route.url.length === 0) {
        router.navigate(['/dashboard/contratos/criar/selecionar-imovel']);
        return false;
    }
    
    const step = route.url[route.url.length - 1]?.path;
    
    if (!contractFormService.isStepAllowed(step)) {
        router.navigate(['/dashboard/contratos/criar/selecionar-imovel']);
        return false;
    }
    
    return true;
}
