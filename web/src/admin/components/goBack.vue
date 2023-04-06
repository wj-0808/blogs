<template>
    <el-page-header @back="goBack" title="返回" :content="props.content"></el-page-header>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
    content: string
}>()
const goBack = () => {
    router.go(-1)
}
</script>