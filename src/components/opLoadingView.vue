<template>
	<div class="op-loading-view" v-if="loading">
		<slot name="template">
			<div class="loading-wrapper" v-if="type === 'loading'">
				<Loading />
			</div>
			<div class="skeleton-wrapper" v-if="type === 'skeleton'">
				<Skeleton :row="10" />
				<Skeleton title avatar :row="5"></Skeleton>
				<Skeleton title :row="5"></Skeleton>
			</div>
		</slot>	
	</div>
	<slot v-else></slot>
</template>

<script setup lang="ts">
import {Loading,Skeleton} from 'vant'
interface IProps {
	loading: boolean
	type:'loading' | 'skeleton'
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.op-loading-view {
	.loading-wrapper{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
	}
	.skeleton-wrapper{
		padding: 20px 10px;
	}
}
</style>