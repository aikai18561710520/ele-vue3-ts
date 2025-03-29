<template>
	<div class="home-scroll-bar">
		<div class="home-scroll-bar__swipe">
			<div ref="containerRef">
				<div class="swipe-item" v-for="(item, index) in props.data" :key="index">
					<div class="scroll-bar__info" :class="`scroll-bar__info__${item.type}`">
						<span class="info-badge">{{ item.badge }}</span>
						<span class="info-detail" v-html="item.detail"></span>
						<span class="info-btn op-thin-border">{{ item.btn }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { IScrollBarInfo } from '@/types'
import { ref, onMounted } from 'vue'
import { useInterval, useTimeout } from '@/hooks/useTimeout'
interface IProps {
	// 滚动条的高度
	height?: number
	intervalTime?: number
	transitionTime?: number
	data: IScrollBarInfo[]
}
const props = withDefaults(defineProps<IProps>(), {
	height: 40,
	intervalTime: 3000,
	transitionTime: 1000,
})
const heightPx = `${props.height}px`
const containerRef = ref()
onMounted(() => {
	const container = containerRef.value
	const firstSwipeItemRef = container.children[0]
	const count = container.children.length
	container.style.height = `${count * props.height}px`
	let currentIndex = 0
	useInterval(() => {
		currentIndex++
		if (currentIndex >= count) {
			firstSwipeItemRef.style.transform = `translateY(${count * props.height}px)`
			const clear = useTimeout(() => {
				container.value.style.transition = ''
				container.value.style.transition = ''
				firstSwipeItemRef.style.transform = ''
				clear()
			}, props.transitionTime)
		}
		containerRef.value.style.transition = `transform ${props.transitionTime}ms`
		containerRef.value.style.transform = `translateY(${-currentIndex * props.height}px)`
		currentIndex %= count
	}, props.intervalTime)
})
</script>

<style lang="scss">
.home-scroll-bar {
	--bean-color: rgb(252, 164, 40);
	--hongbao-color: rgb(255, 68, 25);
	&__swipe {
		background: white;
		border-radius: 8px;
		margin: 5px 10px;
		font-size: 13px;
		position: relative;
		overflow: hidden;
		height: v-bind(heightPx);
		.swipe-item {
			height: v-bind(heightPx);
		}
	}
	.scroll-bar__info {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 10px;
		height: 100%;
		.info-badge {
			border-radius: 5px;
			padding: 2px 6px;
			font-size: 12px;
			margin-right: 6px;
			color: white;
		}
		.info-detail {
			flex: 1;
		}
		.info-btn {
			padding: 3px 14px;
			font-size: 12px;
			&op-thin-border::before {
				border-radius: 50px;
			}
		}
		.info-num {
			font-weight: bold;
			margin: 0 2px;
		}
		&__bean {
			.info-badge {
				background: var(--bean-color);
			}
			.info-btn {
				color: var(--bean-color);
				&:before {
					border-color: var(--bean-color);
				}
			}
			.info-num {
				color: var(--bean-color);
			}
		}
		&__hongbao {
			.info-badge {
				background: var(--hongbao-color);
			}
			.info-btn {
				color: var(--hongbao-color);
				&:before {
					border-color: var(--hongbao-color);
				}
			}
			.info-num {
				color: var(--hongbao-color);
			}
		}
	}
}
</style>
