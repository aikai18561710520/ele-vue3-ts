import { ref, watch, onUnmounted, type Ref } from 'vue'
export function useDebounce<T>(value: Ref<T>, delay: number) {
	const debounceValue = ref(value.value)
	let timer: number | null = null
	const unwatch = watch(value, (nv) => {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			debounceValue.value = nv
		}, delay)
	})

	onUnmounted(() => {
		unwatch()
	})
	return debounceValue
}
