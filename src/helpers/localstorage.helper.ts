export function getTokenFromLocalStorage(): string {
	const data = localStorage.getItem('token')
	const token: string = data ? JSON.parse(data) : ''
	return token
}
export function getUserIdFromLocalStorage(): string {
	const data = localStorage.getItem('userId')
	const userId: string = data ? JSON.parse(data) : ''
	return userId
}
export function setTokenToLocalStorage(key: string, token: string): void {
	localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocalStorage(key: string): void {
	localStorage.removeItem(key)
}
export function setUserIdToLocalStorage(key: string, token: string): void {
	localStorage.setItem(key, JSON.stringify(token))
}

export function removeUserIdFromLocalStorage(key: string): void {
	localStorage.removeItem(key)
}
