export interface Entidades {
    id: number;
    nombre: string;
    nombre_corto: null | string;
    razon_social: null | string;
    cuit: string;
    tipo_entidad: string;
    total_lineas: string;
    total_ramales: string;
    total_vehiculos: string;
    total_personas: string;
    estado_operacional: string;
    telefonos: Telefono[];
    correos: Correo[];
    telefono_principal: null;
    email_principal: null | string;
}

export interface Correo {
    id: number;
    correo: string;
    tipo_correo: null | string;
    es_primario: boolean;
    observaciones: null | string;
}

// export enum EstadoOperacional {
//     OperadorDeTransporte = "Operador de Transporte",
//     RegistroBásico = "Registro Básico",
// }

export interface Telefono {
    id: number;
    numero: string;
    tipo_telefono: string;
    es_primario: boolean;
    observaciones: null | string;
}

// export enum TipoEntidad {
//     CapitalMixtoPúblicoPrivado = "Capital mixto (público/privado)",
//     Cooperativa = "Cooperativa",
//     SociedadAnónima = "Sociedad Anónima",
// }
