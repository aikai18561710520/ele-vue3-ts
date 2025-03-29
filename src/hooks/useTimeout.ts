import { onUnmounted } from 'vue'
export function useTimeout(fn: () => void, delay: number) {
	const timer = setTimeout(() => {
		fn()
	}, delay)
	const clear = () => {
		if (timer) {
			clearTimeout(timer)
		}
	}
	onUnmounted(clear)
	return clear
}
export function useInterval(fn: () => void, delay: number) {
	const timer = setInterval(() => {
		fn()
	}, delay)
	const clear = () => {
		if (timer) {
			clearInterval(timer)
		}
	}
	onUnmounted(clear)
	return clear
}