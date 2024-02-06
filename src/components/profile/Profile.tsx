import { FC, useEffect, useState } from 'react'

import { AuthService } from '../../services/auth.service'
import { IUser } from '../../types/types'
import { toast } from 'react-toastify'

const Profile: FC = () => {
	const [user, setUser] = useState<IUser>()
	const [btnLoginIsActive, setBtnLoginIsActive] = useState<boolean>(false)
	const [btnPasswordIsActive, setBtnPasswordIsActive] = useState<boolean>(false)
	const [newLogin, setNewLogin] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>('')

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

	useEffect(() => {
		getProfile()
	}, [])

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
		</>
	)
}

export default Profile
