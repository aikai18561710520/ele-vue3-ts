<template>
	<div>
		<SearchView v-if="isShowSearchView" @cancel="toggleSearchView"></SearchView>
		<HomeTop :recomments="recommentList" @searchClick="toggleSearchView" />
	</div>
</template>

<script setup lang="ts">
import HomeTop from './components/HomeTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/hooks/useToggle'
import { reactive } from 'vue'
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
</script>

<style scoped>
.home-root {
	font-size: 39px;
}
</style>
