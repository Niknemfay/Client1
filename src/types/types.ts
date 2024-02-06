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
export interface IImage {
	id: number
	largeImageURL: string
	webformatURL: string
	tags: string
}
export interface IImages {
	images: []
}

export interface IComment {
	id: number
	text: string
	createdAt: string | undefined
	updatedAt: string | undefined
	image: IImage
	user: IResponseUser
	file: string | undefined
}
export interface IComments {
	comments: []
}
export interface ICommentsAnswer {
	id: number
	text: string
	createdAt: string | undefined
	updatedAt: string | undefined
	comment: ICommentInICommentsAnswer
	user: IResponseUser
	file: string | undefined
}
export interface ICommentsAnswers {
	commentsAnswers: []
}
export interface ICommentInICommentsAnswer {
	id: number
	text: string
	createdAt: string | undefined
	updatedAt: string | undefined
	file: string | undefined
}
