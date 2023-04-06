<style></style>

<template>
    <el-select-v2 v-model="cate_id1" :options="cate_id1_options" placeholder="请选择一级类目" />
    <el-select-v2 v-show="cate_id2_options.length" v-model="cate_id2" :options="cate_id2_options" placeholder="请选择二级类目" />
</template>

<script setup lang='ts'>
import { ref, watch, onBeforeMount } from 'vue'
import http from '../../util/http'

const props = defineProps<{ id1: string, id2: string }>()
const emtis = defineEmits(['update:id1', 'update:id2'])

const cate_id1 = ref<string>('')
const cate_id1_options = ref([])
const cate_id2 = ref<string>('')
const cate_id2_options = ref([])

onBeforeMount(() => {
    getCategorie();
})

watch(cate_id1, async (newV, oldV) => {
    if (!cate_id1.value) {
        cate_id2.value = '';
        cate_id2_options.value = [];
        return
    }
    getCategorie(newV);
    emtis('update:id1', newV)
})
watch(cate_id2, async (newV, oldV) => {
    emtis('update:id2', newV)
})
// 获取目录
const getCategorie = (id?: string) => {
    let url = '/category'
    if (id) url += '/' + id
    cate_id2.value = '';
    http.get(url).then(res => {
        let list = res.data.list.map((it) => ({
            value: it._id,
            label: it.name
        }))
        list.unshift({ value: '', label: '全部' })
        if (id) cate_id2_options.value = list
        else cate_id1_options.value = list
    })
}
</script>