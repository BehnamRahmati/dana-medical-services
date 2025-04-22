type TRole = 'USER' | 'ADMIN' | 'SUPERADMIN' | 'EXPERT'
type TStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
type TRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED'

type TUser = {
	id: string
	name: string
	email: string
	emailVerified?: Date
	hashedPassword?: string
	image: string
	role: TRole
	isOnline: boolean
	lastActive?: Date
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pushSubscription?: any
	deviceReady: boolean
	createdAt: Date
	updatedAt: Date
	articles: TArticle[]
	comments: TComment[]
	services: TService[]
	requests: TRequest[]
	likes: TLike[]
	views: TView[]
	bookmarks: TBookmark[]
	_count: {
		likes: number
		bookmarks: number
		comments: number
		requests: number
	}
}

type TLike = {
	id: string

	// relations
	user: TUser
	article?: TArticle
	service?: TService
	comment?: TComment

	// times
	createdAt: Date
	updatedAt: Date
	// relation identifiers
	userId: string
	articleId?: string
	serviceId?: string
	commentId?: string
}

type TView = {
	id: string

	// relations
	user?: TUser
	article?: TArticle
	service?: TService

	// fields
	ipAddress?: string
	userAgent?: string

	// times
	createdAt: Date
	updatedAt: Date

	// relation identifiers
	userId?: string
	articleId?: string
	serviceId?: string
}

type TBookmark = {
	id: string

	// relations
	user: TUser
	article?: TArticle
	service?: TService

	// times
	createdAt: Date
	updatedAt: Date
	// relation identifiers
	userId: string
	articleId?: string
	serviceId?: string
}

type TFile = {
	id: string
	filename: string
	size: number
	url: string
	createdAt: Date
	updatedAt: Date
	article?: TArticle
	service?: TService
	articleId?: string
	serviceId?: string
}

type TArticle = {
	id: string
	title: string
	content: string
	thumbnail: string
	images: TFile[]
	slug: string
	excerpt: string
	views: TView[]
	read: number
	status: TStatus
	createdAt: Date
	updatedAt: Date
	category: TCategory
	tags: TTag[]
	author: TUser
	comments: TComment[]
	likes: TLike[]
	bookmarks: TBookmark[]
	userId: string
	categoryId: string
	_count?: {
		likes: number
		comments: number
		bookmarks: number
	}
}

type TServiceItem = {
	id: string
	title: string
	description: string
	price: number
	discount?: number
	service: TService
	serviceId: string
	createdAt: Date
	updatedAt: Date
}

type TService = {
	id: string
	title: string
	content: string
	thumbnail: string
	images: TFile[]
	slug: string
	excerpt: string
	read: number
	status: TStatus
	createdAt: Date
	updatedAt: Date
	author: TUser
	category?: TCategory
	comments: TComment[]
	serviceItems: TServiceItem[]
	likes: TLike[]
	views: TView[]
	bookmarks: TBookmark[]
	requests: TRequest[]
	userId: string
	categoryId?: string
	_count?: {
		likes: number
		comments: number
		bookmarks: number
	}
}

type TCategory = {
	id: string
	name: string
	slug: string
	image?: string
	articles: TArticle[]
	services: TService[]
	createdAt: Date
	updatedAt: Date
}

type TTag = {
	id: string
	name: string
	slug: string
	image?: string
	articles: TArticle[]
	createdAt: Date
	updatedAt: Date
}

type TComment = {
	id: string
	content: string
	approved: boolean
	article?: TArticle
	user: TUser
	likes: TLike[]
	parent?: TComment
	replies: TComment[]
	service?: TService
	createdAt: Date
	updatedAt: Date
	articleId?: string
	userId: string
	serviceId?: string
	commentId?: string
	_count?: { likes: number }
}

type TMenu = {
	id: string
	name: string
	links: TLink[]
	parent?: TMenu
	menu: TMenu[]
	menuId?: string
	createdAt: Date
	updatedAt: Date
}

type TLink = {
	id: string
	name: string
	url: string
	menu: TMenu
	menuId: string
	createdAt: Date
	updatedAt: Date
}

type TSocial = {
	id: string
	name: string
	url: string
	icon: string
	createdAt: Date
	updatedAt: Date
}

type TRequest = {
	id: string
	name: string
	email?: string
	phone: string
	notes?: string
	service: TService
	expert: TUser
	status: TRequestStatus
	requestedDate: Date
	requestedTime: string
	createdAt: Date
	updatedAt: Date
	serviceId: string
	expertId: string
}

export {
	type TArticle,
	type TBookmark,
	type TCategory,
	type TComment,
	type TFile,
	type TLike,
	type TLink,
	type TMenu,
	type TRequest,
	type TRequestStatus,
	type TRole,
	type TService,
	type TServiceItem,
	type TSocial,
	type TStatus,
	type TTag,
	type TUser,
	type TView,
}
