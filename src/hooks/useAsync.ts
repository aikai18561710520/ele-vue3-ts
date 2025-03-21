import { ref } from 'vue'

export function useAsync<T>(asayncFn: () => Promise<T>, initValue: T, immediate = true) {
	const pending = ref(false)
	const error = ref(null)
	const data = ref(initValue)
	const execute = function () {
		pending.value = true
		asayncFn()
			.then((response) => {
				data.value = response
				pending.value = false
			})
			.catch((err) => {
				error.value = err.value
				pending.value = false
			})
	}
	if (immediate) {
		execute()
	}
	return {
		pending,
		error,
		execute,
		data,
	}
}
