import {inject, Injectable, signal} from '@angular/core';
import {Auth} from '@interfaces';
import {Router} from '@angular/router';

export const ACCESS_VALUES = 'access_values'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private router = inject(Router)
    isPermissionGranted = signal<boolean>(false)
    auth = signal<Auth | null>(null)

    logout =() => {}

    setAccessValues = (auth: any) => {
        this.isPermissionGranted.set(true)
        this.auth.set(auth)
        localStorage.setItem(ACCESS_VALUES, JSON.stringify(auth))
        this.router.navigate([''])
    }
}
