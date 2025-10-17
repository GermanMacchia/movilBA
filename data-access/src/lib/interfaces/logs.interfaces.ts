export interface LogUsuario {
	cuil: string
	nombre: string
	email: string
}

export interface LogEntry {
	descripcion: string
	tipo_log: 'create' | 'write' | 'delete'
	created_at: string
	usuario: LogUsuario
}

export interface LogsResponse {
	data: LogEntry[]
	total: number
}
