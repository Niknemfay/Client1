import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'

import Auth from '../pages/Auth'
import ProtectedRoute from '../components/ProtectedRoute'
import Profile from '../components/profile/Profile'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},

			{
				path: 'profile',
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},

			{
				path: 'auth',
				element: <Auth />,
			},
		],
	},
])
