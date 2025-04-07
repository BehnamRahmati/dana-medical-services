type TUser = {
	id: string
	name: string
	email: string
	hashedPassword?: string
	image: string
	role: 'USER' | 'ADMIN' | 'MODERATOR'
	createdAt: Date
	updatedAt: Date
	articles: TArticles[]
	likedArticles: TArticles[]
	bookmarkedArticles: TArticles[]
}
type TArticles = {
	id: string
	title: string
	content: string
	thumbnail: string
	slug: string
	excerpt: string
	views: number
	readTime: number
	status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
	createdAt: Date
	updatedAt: Date
	category: TCategory
	tags: TTag[]
	author: TUser
	likes: TUser[]
	bookmarks: TUser[]
	userId: string
	categoryId: string
	_count: {
		likes: number
		comments: number
		bookmarks: number
	}
}

type TServices = {
	id: string
	title: string
	content: string
	thumbnail: string
	slug: string
	excerpt: string
	views: number
	readTime: number
	status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
	createdAt: Date
	updatedAt: Date
	author: TUser
	likes: TUser[]
	bookmarks: TUser[]
	userId: string
}

type TCategory = {
	id: string
	name: string
	slug: string
	articles: TArticles[]
	createdAt: Date
	updatedAt: Date
}

type TTag = {
	id: string
	name: string
	slug: string
	articles: TArticles[]
	createdAt: Date
	updatedAt: Date
}

type TComment = {
	id: string
	content: string
	approved: boolean
	article: TArticles
	user: TUser
	likes: TUser[]
	parent: TComment
	replies: TComment[]
	service: TServices
	createdAt: Date
	updatedAt: Date
	articleId: string
	userId: string
	serviceId: string
	commentId: string
}

type TMenu = {
	id: string
	name: string
	links: TLink[]
	parent: TMenu
	Menu: TMenu[]
	menuId: string
	createdAt: string
	updatedAt: string
}

type TLink = {
	id: string
	name: string
	url: string
	menus: TMenu[]
	createdAt: Date
	updatedAt: Date
}

export { type TArticles, type TCategory, type TComment, type TLink, type TMenu, type TServices, type TTag, type TUser }
