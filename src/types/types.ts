export interface IUserData {
	userName: string
	email: string
	password: string
}
export interface IUserLogin {
	email: string
	password: string
}

export interface IResponseUser {
	email: string | undefined
	userName: string | undefined
	createdAt: string | undefined
	updatedAt: string | undefined
	avatar: string | undefined
	id: number | undefined
	password: string
}
export interface IResponseUserData {
	token: string
	user: IResponseUser
}
export interface IUser {
	id: number
	email: string
	avatar: string
	userName: string
	token: string
}
export interface IGameData {
	name: string
	version: string
}
export interface IResponseDataGame {
	id: number | undefined
	name: string
	version: string
	createdAt: string | undefined
	updatedAt: string | undefined
}

export interface IGame {
	id: number
	name: string
	version: string
	createdAt: string | undefined
	updatedAt: string | undefined
}
