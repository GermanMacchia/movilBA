import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-seleccion-date',
    imports: [DatePickerModule, FormsModule, InputTextModule, SelectModule],
    templateUrl: './seleccion-date.html',
    host: {
        class: 'flex flex-col gap-5 w-[40rem] text-left'
    }
})
export class SeleccionDate implements OnInit {
    activatedRoute = inject(ActivatedRoute)
    seleccion = signal<string>('')
    items = signal<MenuItem[]>([])
    showInputs = input<boolean>(false)
    fechas = signal<{ fecha: Date, nombre: string }[]>([])

    date: Date | undefined
    fechaSeleccionada: { fecha: Date, nombre: string } | undefined


    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.seleccion.set(data['seleccion'].label)
            this.items.set(data['seleccion'].items)
            this.fechas.set(data['seleccion'].fechas)
        })
    }
}
