<template>
	<div class="search-view" @click="emit('cancel')">搜索页</div>
</template>

<script setup lang="ts">
interface IEmits {
	(e: 'cancel'): void
}
const emit = defineEmits<IEmits>()
</script>
<style lang="scss" scoped>
.search-view {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999;
	background-color: white;
}
</style>
