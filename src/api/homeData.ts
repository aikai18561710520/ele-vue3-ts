import request from './index'
import type { IHomeInfo } from '@/types'
export function fetchHomePageData() {
	return request.get<IHomeInfo>('/home_page')
}
