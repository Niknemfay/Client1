import { instance } from '../api/axios.api'
import { IUserData, IResponseUserData, IUser, IUserLogin } from '../types/types'

export const AuthService = {
	async registration(
		userData: IUserData,
	): Promise<IResponseUserData | undefined> {
		const { data } = await instance.post<IResponseUserData>('user', userData)
		return data
	},
	async login(userData: IUserLogin): Promise<IUser | undefined> {
		const { data } = await instance.post<IUser>('auth/login', userData)
		return data
	},
	async getProfile(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('auth/profile')

		if (data) return data
	},
	async getUser(id: number): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>(`user/${id}`)
		if (data) return data
	},
	async updateProfile(id: number, param: object) {
		const { data } = await instance.patch(`user/${id}`, param)
		if (data) return true
	},
}
