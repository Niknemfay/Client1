import { FC } from 'react'
import { useAuth } from '../hooks/useAuth'
import img from '../assets/0_QOZm9X5er1Y0r5-t.webp'
interface Props {
	children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({ children }) => {
	const isAuth = useAuth()
	return (
		<>
			{isAuth ? (
				children
			) : (
				<div className="min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10">
					<span className="text-2xl">To view this page you must be logged</span>
					<img src={img} alt="img" />
				</div>
			)}
		</>
	)
}

export default ProtectedRoute
