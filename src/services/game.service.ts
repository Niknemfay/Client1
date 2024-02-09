import { instance } from '../api/axios.api'
import { IGameData, IResponseDataGame, IGame } from '../types/types'

export const GameService = {
	async createGame(
		gameData: IGameData,
	): Promise<IResponseDataGame | undefined> {
		const { data } = await instance.post<IResponseDataGame>('game', gameData)
		return data
	},
	async findAllGames(): Promise<[IGame] | undefined> {
		const { data } = await instance.get<[IGame]>('game')
		return data
	},
	async findOneGame(id: number): Promise<IGame | undefined> {
		const { data } = await instance.get<IGame>(`game/${id}`)
		return data
	},
	async updateGame(id: number, param: object): Promise<IGame | undefined> {
		const { data } = await instance.patch<IGame>(`game/${id}`, param)
		return data
	},
	async removeGame(id: number) {
		const { data } = await instance.delete(`game/${id}`)
		return data
	},
}
