import request from './index'
import type { ISearchResultList } from '@/types'
export function fetchSearchData(key = '') {
	return request.get<ISearchResultList>('/home_search', {
		params: {
			_label_like: key,
		},
	})
}
