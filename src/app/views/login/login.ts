import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '@src/app/core/store';
import { selectLoginLoading } from '@src/app/core/store/selectors';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'app-login',
    imports: [InputTextModule, FloatLabelModule, PasswordModule, FormsModule, CardModule, ButtonModule],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    host: {
        class: 'flex flex-col items-center justify-center gap-5 h-screen w-72 mx-auto',
        '(keydown.enter)': 'this.clave && this.cuit ? this.submit() : null',
    }
})
export class Login implements OnInit {
    private store = inject(Store)
    private messageService = inject(MessageService)

    cuit = ''
    clave = ''

    loading = signal<boolean>(false)

    ngOnInit() {
        this.store.select(selectLoginLoading).subscribe(this.loading.set)
    }

    submit = () => {
        if (!this.isValidForm()) return

        this.store.dispatch(login({cuit: this.cuit, clave: this.clave}))
    }

    isValidForm = () => {
        if (this.cuit && this.clave) return true

        this.messageService.add({
            severity: 'warn',
            summary: 'Datos insuficientes',
            detail: 'Algunos campos permanecen vacios'
        })

        return false
    }
}
