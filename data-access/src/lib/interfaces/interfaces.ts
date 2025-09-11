

export interface Usuario {
    nombre: string
    rol: string
}

export interface Auth {
    usuario: Usuario
}

export interface Session {
    success:       boolean;
    authenticated: boolean;
    user:          User;
    session:       SessionClass;
}

export interface SessionClass {
    expires: Date;
}

export interface User {
    id:    string;
    email: string;
    name:  string;
}