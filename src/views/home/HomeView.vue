<template>
	<div>
		<transition name="fade">
			<SearchView v-if="isShowSearchView" @cancel="toggleSearchView"></SearchView>
		</transition>

		<HomeTop :recomments="recommentList" @searchClick="toggleSearchView" />
		<OpLoadingView :loading="pending" type="skeleton">
			<div class="home-page__banner">
				<img v-for="(item, index) in data.banner" :key="index" :src="item.imgUrl" alt="" />
			</div>
		</OpLoadingView>
		<OpGridNav :items="data.transformer" @itemClick="handleGridNavClick" />
		<opScrollBar
			:data="data.scrollBarInfoList.length ? data.scrollBarInfoList : []"
		></opScrollBar>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HomeTop from './components/HomeTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/hooks/useToggle'
import { useAsync } from '@/hooks/useAsync'
import { fetchHomePageData } from '@/api/homeData'
import type { IHomeInfo, ITranstormer } from '@/types'
import OpLoadingView from '@/components/opLoadingView.vue'
import OpGridNav from '@/components/opGridNav.vue'
import opScrollBar from '@/components/opScrollBar.vue'

const handleGridNavClick = (item: any) => {
	console.log('clicked:', item)
}

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
