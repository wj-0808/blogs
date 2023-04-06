<style></style>

<template>
    <el-button :auto-insert-space="true" @click="router.push('./work')">添加作品</el-button>
    <div style="margin: 10px 0">
        <el-input style="width: 200px;margin: 10px 0" v-model="search.value" placeholder="搜索" clearable />
    </div>
    <el-table :data="tableData" row-key="_id" stripe style="width: 100%" empty-text="没有文章">
        <el-table-column type="index" width="50" />
        <el-table-column prop="title" label="标题" />
        <el-table-column label="封面">
            <template #default="scope">
                <el-image v-if="scope.row.img" style="width: 80px; height: 80px" :src="scope.row.img" fit="cover" />
                <span v-else>无</span>
            </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column label="关键字">
            <template #default="scope">
                <el-tag v-for="(tag, i) in scope.row.keyWords " :type="['', 'success', 'info', 'warning', 'danger'][i % 5]"
                    style="margin-right: 5px;" :key="i">
                    {{ tag }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" type="primary" plain
                    @click="router.push('./work?id=' + scope.row._id)">编辑</el-button>
                <el-popconfirm @confirm="del(scope.row._id)" title="确认删除吗？多可惜！" confirm-button-text="是"
                    cancel-button-text="不了">
                    <template #reference>
                        <el-button size="small" type="danger" plain>删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="pagination" background layout="prev, pager, next" :total="total"
        v-model:current-page="search.offset" />
</template>

<script setup lang='ts'>
import { ref, reactive, onBeforeMount, watchEffect } from 'vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import http from '../../util/http';
interface Work {
    _id: string
    title: string
    workUrl: string
    description: String
    keyWords?: string[]
    img?: string
    createAt: string
    updateAt: string
}
const router = useRouter()
// 表格数据
const tableData = ref<Work[]>([])
// 搜索
const search = reactive({
    offset: 0,
    value: '',
})
// 总条数
const total = ref<number>(0)

// 初始化
onBeforeMount(() => {
    getWorks()
})
// 监听搜索栏变化
watchEffect(async (onInvalidate) => {
    console.log({ ...search });
    onInvalidate(() => {
        getWorks({ ...search })
    })
})
// 获取表格数据
const getWorks = (params?: object) => {
    http.get('/work', { params: { ...params } }).then(res => {
        let { list, count } = res.data;
        tableData.value = list;
        total.value = count;
    })
}
// 删除作品
const del = async (id: string) => {
    await http.delete('/work/' + id);
    await getWorks({ ...search })
    ElMessage.success('删除成功')
}
</script>