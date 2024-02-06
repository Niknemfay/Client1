import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import {
	removeTokenFromLocalStorage,
	removeUserIdFromLocalStorage,
} from '../helpers/localstorage.helper'
import { toast } from 'react-toastify'
const Header: FC = () => {
	const isAuth = useAuth()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		removeUserIdFromLocalStorage('userId')
		toast.success('You logged out')
		navigate('/')
	}

	const isActiveBtn = (isActive: boolean) =>
		isActive ? 'text-white underline underline-offset-1' : 'text-white/50'
	return (
		<header className="flex items-center  bg-slate-800 p-4 shadow-sm backdrop-blur-sm text-lg">
			<Link to="/">
				<AiFillHome size={50} />
			</Link>
			{/*Menu  */}
			{isAuth && (
				<nav className="ml-auto mr-10 ">
					<ul className="flex items-center gap-5">
						<li>
							<NavLink
								to={'/'}
								className={({ isActive }) => isActiveBtn(isActive)}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/profile'}
								className={({ isActive }) => isActiveBtn(isActive)}
							>
								Profile
							</NavLink>
						</li>
					</ul>
				</nav>
			)}
			{/* Actions */}
			{isAuth ? (
				<button className="btn btn-red" onClick={logoutHandler}>
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					to={'auth'}
					className="py-2 text-white/50 hover:text-white ml-auto"
				>
					Log In / Sign In
				</Link>
			)}
		</header>
	)
}

export default Header
