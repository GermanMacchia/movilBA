export interface Entidad {
	id: number
	nombre: string
	nombre_corto: any | string
	razon_social: any | string
	cuit: string
	tipo_entidad: string
	total_lineas: string
	total_ramales: string
	total_vehiculos: string
	total_personas: string
	estado_operacional: string
	telefonos: Telefono[]
	correos: Correo[]
	telefono_principal: any
	email_principal: any | string
}

export interface Vehiculo {
	entidad_id: number
	entidad_nombre: string
	entidad_nombre_corto: string
	entidad_cuit: string
	vehiculo_id: number
	dominio: string
	numero_serie_chasis: any
	numero_serie_motor: any
	numero_serie_carroceria: any
	fecha_ultima_actualizacion: Date
	interno: any
	valor_litro: any
	estado_vehiculo: string
	tipo_vehiculo: string
	subtipo_vehiculo: string
	carroceria_modelo: any
	cantidad_asientos: any
	fabricante_carroceria: any
	chasis_modelo: any
	fabricante_chasis: any
	motor_modelo: any
	fabricante_motor: any
	asignacion_fecha_desde: Date
	asignacion_fecha_hasta: any
	asignacion_observaciones: string
	numero_linea: number
	color_linea: any
	linea_fecha_desde: Date
	linea_fecha_hasta: any
}

export interface Linea {
	entidad_id: number
	linea_id: number
	numero_linea: number
	color_linea: any
	detalles: Detalles
}

export interface Detalles {
	notas: any
	paradas: any
	ramales: Ramal[]
	documentos: any
	recorridos: any
	asignaciones: any
}

export interface Ramal {
	id: number
	ramal: string
	color_linea: any
	cabecera_destino: string
	cabecera_partida: string
}

export interface Correo {
	id: number
	correo: string
	tipo_correo: any | string
	es_primario: boolean
	observaciones: any | string
}

export interface Telefono {
	id: number
	numero: string
	tipo_telefono: string
	es_primario: boolean
	observaciones: any | string
}
