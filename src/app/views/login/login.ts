import {Component} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';

@Component({
    selector: 'app-login',
    imports: [InputTextModule, FloatLabelModule, PasswordModule, FormsModule, ButtonModule],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    host: {
        class: 'flex flex-col items-center justify-center gap-5 h-screen w-72 mx-auto'
    }
})
export class Login {
    value = ''
    value2 = ''
}
