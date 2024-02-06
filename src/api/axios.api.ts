import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'
export const instance = axios.create({
	baseURL: 'https://server1-idmh.onrender.com/api',
	headers: {
		Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
	},
})
