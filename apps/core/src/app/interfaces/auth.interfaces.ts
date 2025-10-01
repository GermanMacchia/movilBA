export interface AuthInfo {
    exp: number;
    iat: number;
    auth_time: number;
    jti: string;
    iss: string;
    sub: string;
    typ: string;
    azp: string;
    session_state: string;
    acr: string;
    'allowed-origins': string[];
    scope: string;
    sid: string;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
}

export enum Permissions {
    READ = 0b0001,
    WRITE = 0b0010,
    CREATE = 0b0100,
    DELETE = 0b1000
}

export enum Modulos {
    PERMISOS = 'permisos',
    RUTAP = 'rutap',
    RUTAX = 'rutax'
}

export interface ModuloRef {
    nombre: string
}

export interface PermissionEntry {
    permisos: number | string
    modulo: ModuloRef
}
