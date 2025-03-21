export interface ISearchRecomment {
	value: number
	label: string
}

export interface ISearchResultList {
	list: ISearchResult[]
}

export interface ISearchResult {
	type: number
	label: string
	resultCound: number
}
export interface IHomeInfo {
	banner: IBanner
	searchRecomments: ISearchRecomment[]
	transformer: ITranstormer[]
	countDown: ICountDown
	activities: string[]
}
interface IBanner {
	imgUrl: string
}
interface ITranstormer {
	imgUrl: string
	label: string
}
interface ICountDown {
	time: number
	goods: IGood
}
