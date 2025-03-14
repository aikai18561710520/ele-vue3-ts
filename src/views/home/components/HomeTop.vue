<template>
	<div class="home-top">
		<div class="top">
			<Icon name="location-o" size="20" />
			<div class="location">翡翠城小区(沿街楼)</div>
			<Icon class-prefix="shopcart-icon van-icon" name="shopping-cart-o" size="24" />
			<Icon class-prefix="comment-icon van-icon" name="comment-o" size="24" badge="9+" />
		</div>
		<!-- <Search
			shape="round"
			placeholder="霸王茶姬 买2赠1"
			background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 240))"
		>
			<template #right-icon>
				<div>搜索</div>
			</template>
		</Search> -->
		<op-search
			shape="round"
			placeholder="霸王茶姬 买2赠1"
			background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 240))"
			@inputClick="emit('searchClick')"
		>
			<template #right-icon>
				<div @click="emit('searchClick')">搜索</div>
			</template>
		</op-search>
		<div class="serch-recomments">
			<div class="tag" v-for="item in recomments" :key="item.value">
				{{ item.label }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Icon, Search } from 'vant'
import OpSearch from './OpSearch.vue'
import type { ISearchRecomment } from '@/types'
import { ref } from 'vue'
interface IProps {
	recomments: ISearchRecomment[]
}

defineProps<IProps>()
interface IEmits {
	(e: 'searchClick'): void
}
const emit = defineEmits<IEmits>()
</script>

<style scoped lang="scss">
.home-top {
	background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 240));
	.top {
		display: flex;
		align-items: center;
		align-content: center;
		padding: 10px 10px 0 10px;
		line-height: 1.5;
		font-size: 15px;
		font-weight: bold;
		color: white;
	}
	.location {
		flex: 1;
	}
	.comment-icon {
		margin-left: 10px;
	}
	.shopcart-icon {
		transform: translateY(-2px);
	}
	.serch-recomments {
		display: flex;
		padding: 0 10px 8px;
		color: white;
		.tag {
			background: rgba(242, 242, 242, 0.3);
			font-size: 12px;
			border-radius: 10px;
			padding: 2px 8px;
			margin-right: 10px;
		}
	}
}
</style>
<style lang="scss">
.home-top {
	.van-field__right-icon {
		margin-right: 0;
	}
}
</style>
