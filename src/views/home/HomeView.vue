<template>
	<div>
		<transition name="fade">
			<SearchView v-if="isShowSearchView" @cancel="toggleSearchView"></SearchView>
		</transition>

		<HomeTop :recomments="recommentList" @searchClick="toggleSearchView" />
		{{ pending }}
		{{ data }}
	</div>
</template>

<script setup lang="ts">
import HomeTop from './components/HomeTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/hooks/useToggle'
import { useAsync } from '@/hooks/useAsync'
import { fetchHomePageData } from '@/api/homeData'
import type { IHomeInfo } from '@/types'
const recommentList = [
	{
		value: 1,
		label: '牛腩',
	},
	{
		value: 2,
		label: '煲仔饭',
	},
]
const [isShowSearchView, toggleSearchView] = useToggle(false)
const { pending, data } = useAsync(fetchHomePageData, {} as IHomeInfo)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
