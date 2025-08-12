import {MenuItem} from 'primeng/api';

export interface Usuario{
    nombre: string
    rol: string
}

export interface Auth{
    usuario: Usuario
}

export interface DataJSON{
    modulos: MenuItem[],
    secciones: MenuItem[],
    opciones:MenuItem[]
}
