// auth.service.ts
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Cache } from 'cache-manager'
import { jwtDecode } from 'jwt-decode'
import { AuthInfo } from '../app/interfaces'
import { Usuario } from '../app/models/usuario.model'
import { UsuarioRepository } from '../usuarios/usuarios.repository'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@Inject('CACHE_MANAGER')
		private cacheManager: Cache,
		private usuarioRepository: UsuarioRepository,
		private readonly config: ConfigService
	) {}

	async login(user: any) {
		await this.usuarioRepository.updateUsuarioLogon(user.id)
		return this.generateToken(user)
	}

	generateToken(user: any) {
		const { nombre, permisos, id } = user
		const payload = { id, nombre, permisos }
		const expire = this.config.get<number>('app.jwt.expire')

		return {
			access_token: this.jwtService.sign(payload),
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() / 1000) + expire,
			usuario: {
				id,
				nombre,
			},
			permisos,
		}
	}

	async refresh(token: string) {
		try {
			token = token.startsWith('Bearer ') ? token.slice(7) : token
			const secret = this.config.get<string>('app.jwt.secret')
			const decoded = this.jwtService.verify(token, { secret })
			return this.generateToken(decoded)
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
		}
	}

	async validateUser(cuil: string, password: string) {
		const user = await this.usuarioRepository.findByCuil(cuil)

		if (!user) return

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) return

		delete user.password
		return { ...user }
	}

	async revokeToken(token: string, exp: number) {
		const ttl = Math.floor(exp - Date.now() / 1000)
		await this.cacheManager.set(`blacklist:${token}`, '1', ttl * 1000)
	}

	async isRevoked(token: string): Promise<boolean> {
		return !!(await this.cacheManager.get(`blacklist:${token}`))
	}

	/**
	 * @param access_token
	 * @returns usuario
	 * Utilizado en roles guard para recobrar información
	 */
	async decodeUsuario(access_token: string): Promise<Usuario> {
		const decoded: AuthInfo = jwtDecode(access_token)
		return await this.usuarioRepository.findByCuil(decoded.preferred_username)
	}
}
