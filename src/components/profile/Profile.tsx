import { FC, useEffect, useState } from 'react'

import { AuthService } from '../../services/auth.service'
import { IGame, IUser } from '../../types/types'
import { toast } from 'react-toastify'
import { GameService } from '../../services/game.service'

const Profile: FC = () => {
	const [user, setUser] = useState<IUser>()
	const [btnLoginIsActive, setBtnLoginIsActive] = useState<boolean>(false)
	const [btnPasswordIsActive, setBtnPasswordIsActive] = useState<boolean>(false)
	const [newLogin, setNewLogin] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>('')
	const [games, setGames] = useState<[IGame]>()
	const [gameName, setGameName] = useState<string>('')
	const [gameVersion, setGameVersion] = useState<string>('')
	const [newGameVersion, setNewGameVersion] = useState<string>('')

	const getProfile = async () => {
		try {
			const data = await AuthService.getProfile()
			if (data) {
				const user = await AuthService.getUser(data.id)

				setUser(user)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}
	const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) =>
		setNewLogin(e.target.value)

	const changeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setNewPassword(e.target.value)

	const changeNewPasswordRepeat = (e: React.ChangeEvent<HTMLInputElement>) =>
		setNewPasswordRepeat(e.target.value)

	const changeNameGame = (e: React.ChangeEvent<HTMLInputElement>) =>
		setGameName(e.target.value)

	const changeVersionGame = (e: React.ChangeEvent<HTMLInputElement>) =>
		setGameVersion(e.target.value)

	const newVersionGame = (e: React.ChangeEvent<HTMLInputElement>) =>
		setNewGameVersion(e.target.value)

	const submitChangeLogin = async () => {
		try {
			if (user) {
				await AuthService.updateProfile(user?.id, {
					userName: newLogin,
				})
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}
	const submitChangePassword = async () => {
		try {
			if (newPassword === newPasswordRepeat && user) {
				await AuthService.updateProfile(user?.id, {
					password: newPassword,
				})
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	const submitCreateGame = async () => {
		try {
			if (user) {
				const gameData = {
					name: gameName,
					version: gameVersion,
					userId: user.id,
				}
				await GameService.createGame(gameData)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}
	const submitNewVersionGame = async (id: number) => {
		try {
			if (user) {
				const param = {
					userId: user.id,
					version: newGameVersion,
				}
				await GameService.updateGame(id, param)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}
	const findAllGames = async () => {
		try {
			if (user) {
				const data = await GameService.findAllGames()
				setGames(data)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}
	const deleteGame = async (id: number) => {
		try {
			if (user) {
				await GameService.removeGame(id)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	useEffect(() => {
		getProfile()
		findAllGames()
	}, [deleteGame])

	return (
		<>
			<div className="flex w-1/3 flex-col mx-auto gap-5 mt-10">
				<h1 className="input">{user?.email}</h1>
				<div>
					<h2 className="input mb-2">{user?.userName}</h2>
					<button
						className="btn btn-green mx-auto mb-2"
						onClick={() => setBtnLoginIsActive(!btnLoginIsActive)}
					>
						Change login
					</button>
					{btnLoginIsActive && (
						<form
							className="flex w-1/2 flex-col mx-auto gap-5"
							onSubmit={submitChangeLogin}
						>
							<input
								type="text"
								className="input"
								placeholder="new login"
								onChange={changeLogin}
							/>

							<button type="submit" className="btn btn-red mx-auto">
								Submit
							</button>
						</form>
					)}
				</div>
				<div className="flex-start">
					<button
						className="btn btn-green mx-auto mb-2"
						onClick={() => setBtnPasswordIsActive(!btnPasswordIsActive)}
					>
						Change password
					</button>
					{btnPasswordIsActive && (
						<form
							className="flex w-1/2 flex-col mx-auto gap-5"
							onSubmit={submitChangePassword}
						>
							<input
								type="text"
								className="input"
								placeholder="new password"
								onChange={changeNewPassword}
							/>
							<input
								type="text"
								className="input"
								placeholder="repeat password"
								onChange={changeNewPasswordRepeat}
							/>

							<button type="submit" className="btn btn-red mx-auto">
								Submit
							</button>
						</form>
					)}
				</div>
			</div>
			<div className="flex w-1/2 flex-col mx-auto gap-5 mt-10">
				<h2 className=" text-center mb-3">Create new Game</h2>
				<form
					className="flex w-1/2 flex-col mx-auto gap-5"
					onSubmit={submitCreateGame}
				>
					<input
						type="text"
						className="input"
						placeholder="Game name"
						onChange={changeNameGame}
					/>
					<input
						type="text"
						className="input"
						placeholder="Game version"
						onChange={changeVersionGame}
					/>
					<button type="submit" className="btn btn-green mx-auto">
						Submit
					</button>
				</form>
			</div>
			<div>
				<h2 className="text-center mt-8 text-lg">All Games</h2>
				{games?.length ? (
					<>
						<ul className="flex justify-between flex-wrap">
							{games.map((game) => {
								const { name, id, version } = game
								return (
									<li
										key={id}
										className="w-1/3 flex justify-between m-5 flex-wrap border border-slate-200 p-3 "
									>
										<div>
											<h3 className="text-4xl">Name:{name}</h3>
											<h4 className="text-2xl">Version:{version}</h4>
										</div>
										<div className="mt-3 flex items-start">
											<form
												className="flex  flex-col mx-auto gap-5 "
												onSubmit={() => submitNewVersionGame(id)}
											>
												<input
													type="text"
													className="input"
													placeholder="New game version"
													onChange={newVersionGame}
												/>
												<button type="submit" className="btn btn-green ">
													Submit
												</button>
											</form>
										</div>

										<button
											className="btn btn-red mx-auto mt-4"
											onClick={() => deleteGame(id)}
										>
											Delete this games
										</button>
									</li>
								)
							})}
						</ul>
					</>
				) : (
					<p>Games not found</p>
				)}
			</div>
		</>
	)
}

export default Profile
