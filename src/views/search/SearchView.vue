<template>
	<div class="search-view">
		<OpSearch
			show-action
			shape="round"
			placeholder="请输入搜索关键词"
			v-model="searchValue"
			@search="onSearch"
			@cancel="emit('cancel')"
			@clear="onClear"
		></OpSearch>
		<div class="search-view__result">
			<div class="result-item" v-for="item in searchResult" :key="item.label">
				<Icon name="search" />
				<div class="name">{{ item.label }}</div>
				<div class="count">约{{ item.resultCound }}个结果</div>
			</div>
			<div class="no-result" v-if="!searchResult.length">暂无搜索结果</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import OpSearch from '../home/components/OpSearch.vue'
import { fetchSearchData } from '@/api/searchData'
import type { ISearchResult } from '@/types'
import { ref } from 'vue'
import { Icon } from 'vant'
interface IEmits {
	(e: 'cancel'): void
}
const emit = defineEmits<IEmits>()
const [INIT, DONE, DOING] = [-1, 0, 1]
const HISTORY_TAGS = [
	'披萨',
	'栗子',
	'切果NOW',
	'炒飯',
	'出前一丁',
	'玉米',
	'牛腩',
	'土豆煽飯',
	'烧烤',
	'水果',
]
const searchValue = ref('')
const searchResult = ref([] as ISearchResult[])
const noResultState = ref(INIT)
const onSearch = async (v?: string | number) => {
	try {
		noResultState.value = DOING
		const data = await fetchSearchData(v as string)
		console.log(data)

		searchResult.value = data.list
	} finally {
		noResultState.value = DONE
	}
}
const onClear = () => {
	console.log('触发清空')
}
</script>
<style lang="scss" scoped>
.search-view {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999;
	background-color: white;
	&__result {
		.result-item {
			display: flex;
			align-items: center;

			font-size: 12px;
			padding: 10px;
			border-radius: 1px solid var(--van-grat-1);
		}
		.name {
			flex: 1;
			padding-left: 6px;
		}
		.count {
			font-size: 12px;
			color: --van-grat-6;
		}
	}
}
</style>
