<template>
	<div class="grid-nav">
		<div class="grid-nav__wrapper" :style="gridStyle">
			<div
				v-for="(item, index) in items"
				:key="index"
				class="grid-nav__item"
				@click="handleItemClick(item)"
			>
				<div class="grid-nav__icon">
					<img :src="item.imgUrl" alt="" />
				</div>
				<div class="grid-nav__text">{{ item.label }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface GridNavItem {
	imgUrl: string
	label: string
}

interface Props {
	items: GridNavItem[]
	columns?: number
	gap?: number
}

const props = withDefaults(defineProps<Props>(), {
	columns: 5,
	gap: 8,
})
const emit = defineEmits<{
	(e: 'itemClick', item: GridNavItem): void
}>()

const gridStyle = computed(() => ({
	'grid-template-columns': `repeat(${props.columns}, 1fr)`,
	gap: `${props.gap}px`,
}))

const handleItemClick = (item: GridNavItem) => {
	emit('itemClick', item)
}
</script>

<style lang="scss" scoped>
.grid-nav {
	width: 100%;
	padding: 16px;
	background: #fff;
	border-radius: 8px;
	box-sizing: border-box;
	&__wrapper {
		display: grid;
	}

	&__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
	}

	&__icon {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 8px;
		background: #f5f5f5;
		border-radius: 50%;
	}

	&__text {
		font-size: 12px;
		color: #333;
	}
}
</style>
