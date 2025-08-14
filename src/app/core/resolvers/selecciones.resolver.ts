import { inject } from '@angular/core';
import { Router, type ResolveFn } from '@angular/router';
import { tipoVista } from '../interfaces/enums';

export const seleccionesResolver: ResolveFn<any> = (_route, _state) => {
    const router = inject(Router);
    const current = router.getCurrentNavigation();
    const fechas = [{ fecha: new Date(), nombre: 'Algo' }, { fecha: new Date(), nombre: 'Otra' }]

    const label = current?.extras?.state?.['label'];
    const items = current?.extras?.state?.['items'];
    const vista =
        label === 'Edición de fechas'
            ? tipoVista.CALENDARIO
            : label === 'Alertas por vencimientos'
                ? tipoVista.VENCIMIENTOS
                : tipoVista.LISTA

    if (vista !== tipoVista.LISTA)
        return { label, items, vista, fechas }


    return { label, items, vista };
};
