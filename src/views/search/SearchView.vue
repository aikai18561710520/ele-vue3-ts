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
		<div v-if="!searchValue" class="search-view__history">
			<div class="label">历史搜索</div>
			<transition-group name="list">
				<div
					class="history-tag"
					v-for="item in historyTags"
					:key="item"
					@click="tagClickHandle(item)"
				>
					{{ item }}
				</div>
				<div class="history-tag" key="arrow" @click="toggleHistoryTag">
					<Icon name="arrow-up" v-if="isHistoryTagShow"></Icon>
					<Icon name="arrow-down" v-else></Icon>
				</div>
			</transition-group>
		</div>
		<div v-else class="search-view__result">
			<div class="searching" v-if="noResultState === DOING">正在搜索...</div>
			<template v-if="noResultState === DONE">
				<div class="result-item" v-for="item in searchResult" :key="item.label">
					<Icon name="search" />
					<div class="name">{{ item.label }}</div>
					<div class="count">约{{ item.resultCound }}个结果</div>
				</div>
				<div class="no-result" v-if="!searchResult.length">暂无推荐~</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import OpSearch from '../home/components/OpSearch.vue'
import { fetchSearchData } from '@/api/searchData'
import { useToggle } from '@/hooks/useToggle'
import { useDebounce } from '@/hooks/useDebounce'
import type { ISearchResult } from '@/types'
import { ref, computed, watch } from 'vue'
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
const [isHistoryTagShow, toggleHistoryTag] = useToggle(false)
const historyTags = computed(() =>
	isHistoryTagShow.value ? HISTORY_TAGS : HISTORY_TAGS.slice(1, 5),
)
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
const tagClickHandle = (value: string) => {
	searchValue.value = value
	onSearch(value)
}
const deBounceValue = useDebounce(searchValue, 500)
watch(deBounceValue, (nv) => {
	if (!nv) {
		searchResult.value = []
		return
	}
	onSearch(nv)
})
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
	&__history {
		padding: var(--van-padding-sm);
		.label {
			margin-bottom: var(--van-padding-xs);
		}
		.history-tag {
			display: inline-block;
			font-size: 12px;
			border-radius: 10px;
			color: var(--van-gray-6);
			background-color: var(--van-gray-1);
			padding: 4px 8px;
			margin-right: 10px;
			margin-bottom: var(--van-padding-xs);
		}
	}
	&__result {
		.result-item {
			display: flex;
			align-items: center;
			font-size: 12px;
			padding: 10px;
			border-radius: 1px solid var(--van-gray-1);

			.name {
				flex: 1;
				padding-left: 6px;
			}
			.count {
				font-size: 12px;
				color: var(--van-gray-6);
			}
		}
		.no-result,
		.searching {
			font-size: 12px;
			padding: 100px 0;
			text-align: center;
			color: var(--van-gray-6);
		}
	}
}
.list-enter-active,
.list-leave-active {
	transition: all 0.8s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
</style>
