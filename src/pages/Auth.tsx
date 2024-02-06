import { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import {
	setTokenToLocalStorage,
	setUserIdToLocalStorage,
} from '../helpers/localstorage.helper'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Auth: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [userName, setUserName] = useState<string>('')
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value)
	const changePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value)
	const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) =>
		setUserName(e.target.value)
	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const data = await AuthService.registration({ email, password, userName })
			if (data) {
				toast.success('Account has been created')
				setIsLogin(!isLogin)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}
	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const data = await AuthService.login({ email, password })
			if (data) {
				setTokenToLocalStorage('token', data.token)
				setUserIdToLocalStorage('userId', data.id.toString())
				dispatch(login(data))
				toast.success('You logged success')
				navigate('/')
				setIsLogin(!isLogin)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<div className="mt-40 flex flex-col justify-center bg-slate-900 text-white">
			<h1 className="text-center text-xl mb-10 ">
				{isLogin ? 'Login' : 'Registration'}
			</h1>
			<form
				className="flex w-1/3 flex-col mx-auto gap-5"
				onSubmit={isLogin ? loginHandler : registrationHandler}
			>
				{!isLogin && (
					<input
						type="text"
						className="input"
						placeholder="User name"
						onChange={changeUserName}
					/>
				)}

				<input
					type="text"
					className="input"
					placeholder="Email"
					onChange={changeEmail}
				/>
				<input
					type="text"
					className="input"
					placeholder="Password"
					onChange={changePassword}
				/>
				<button type="submit" className="btn btn-green mx-auto">
					Submit
				</button>
			</form>
			<div className="flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						You don't have an account?
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	)
}
export default Auth
