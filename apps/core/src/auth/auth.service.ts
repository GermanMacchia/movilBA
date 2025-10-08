import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { jwtDecode } from 'jwt-decode'
import { AuthInfo } from '../app/interfaces'
import { Usuario } from '../app/models/usuario.model'
import { UsuarioRepository } from '../usuarios/usuarios.repository'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@Inject(CACHE_MANAGER)
		private cacheManager: Cache,
		private usuarioRepository: UsuarioRepository,
		private readonly config: ConfigService
	) { }

	async login(user: any) {
		await this.usuarioRepository.updateUsuarioLogon(user.id)
		return this.generateToken(user)
	}

	generateToken(user: any) {
		const { nombre, id, cuil, permisos } = user
		const payload = { id, cuil, nombre }
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
			const slicedToken = token.startsWith('Bearer ') ? token.slice(7) : token
			const secret = this.config.get<string>('app.jwt.secret')
			const decoded = this.jwtService.verify(slicedToken, { secret })
			await this.addToBlackList(token)
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
		return user
	}

	async logout(token: string) {
		await this.addToBlackList(token);
		return { message: 'ok', status: HttpStatus.ACCEPTED };
	}

	async addToBlackList(token: string) {
		await this.cacheManager.set(token, true, this.config.get('app.jwt.expire') * 1000);
	}

	async isTokenBlackListed(token: string): Promise<boolean> {
		const isBlackListed = await this.cacheManager.get(token);
		return !!isBlackListed
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
