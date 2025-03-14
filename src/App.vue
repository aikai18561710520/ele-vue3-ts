<script setup lang="ts">
import tabbar from './views/tabs/TabsView.vue'
</script>
<template>
	<RouterView />
</template>

<style scoped>
@import 'normalize.css';
#app {
	/* 字体抗锯齿 */
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
