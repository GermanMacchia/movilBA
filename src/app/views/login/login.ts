import {Component, HostListener, inject, OnInit, signal} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {Store} from '@ngrx/store';
import {MessageService} from 'primeng/api';
import {login} from '@src/app/core/store';
import {selectLoginLoading} from '@src/app/core/store/selectors';

@Component({
    selector: 'app-login',
    imports: [InputTextModule, FloatLabelModule, PasswordModule, FormsModule, ButtonModule],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    host: {
        class: 'flex flex-col items-center justify-center gap-5 h-screen w-72 mx-auto',
        '(keydown.enter)': 'this.clave && this.email ? this.submit() : null',
    }
})
export class Login implements OnInit {
    private store = inject(Store)
    private messageService = inject(MessageService)

    email = ''
    clave = ''

    loading = signal<boolean>(false)

    ngOnInit() {
        this.store.select(selectLoginLoading).subscribe(this.loading.set)
    }

    submit = () => {
        if (!this.isValidForm()) return

        this.store.dispatch(login({email: this.email, clave: this.clave}))
    }

    isValidForm = () => {
        if (this.email && this.clave) return true

        this.messageService.add({
            severity: 'warn',
            summary: 'Datos insuficientes',
            detail: 'Algunos campos permanecen vacios'
        })

        return false
    }
}
