<template>
	<router-view />
	<Tabbar v-model="active">
		<tabbar-item name="home" icon="home-o">首页</tabbar-item>
		<tabbar-item name="order" icon="bars">订单</tabbar-item>
		<tabbar-item name="me" icon="contact-o">我的</tabbar-item>
	</Tabbar>
</template>

<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const active = ref(route.name as string)
watch(active, (nv) => {
	router.push({ name: nv })
})
</script>

<style scoped></style>
