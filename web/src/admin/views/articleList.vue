<template>
    <el-button :auto-insert-space="true" @click="router.push('./article')">添加文章</el-button>
    <div style="margin: 10px 0">
        <el-input style="width: 200px;" v-model="search.value" placeholder="搜索" clearable />
        <Category v-model:id1="search.cate_id1" v-model:id2="search.cate_id2" />
    </div>
    <el-table :data="tableData" row-key="_id" stripe style="width: 100%" empty-text="没有文章">
        <el-table-column type="index" width="50" />
        <el-table-column prop="title" label="标题" />
        <el-table-column label="封面">
            <template #default="scope">
                <el-image v-if="scope.row.img" style="width: 80px; height: 80px" :src="scope.row.img" fit="cover" />
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
                    @click="router.push('./article?id=' + scope.row._id)">编辑</el-button>
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
import { ref, reactive, onBeforeMount, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import Category from '../components/category.vue'
import http from '../../util/http'
const router = useRouter()
interface Article {
    _id: string
    cate_id1: string
    cate_id2: string
    title: string
    body: string
    description: String
    keyWords?: string[]
    img?: string
    createAt: string
    updateAt: string
}
// 搜索
const search = reactive({
    cate_id1: '',
    cate_id2: '',
    value: '',
    offset: 0,
})
// 总条数
const total = ref<number>(0)
// 表格数据
const tableData = ref<Article[]>([])
// 初始化
onBeforeMount(() => {
    getArticles();
})
// 监听搜索栏变化
watchEffect(async (onInvalidate) => {
    console.log({ ...search });
    onInvalidate(() => {
        getArticles({ ...search })
    })
})
// 获取文章列表
const getArticles = (params?: object) => {
    http.get('/article', { params: { ...params } }).then(res => {
        let { list, count } = res.data;
        tableData.value = list;
        total.value = count;
    })
}
// 删除文章
const del = async (id: string) => {
    await http.delete('/article/' + id);
    await getArticles({ ...search })
    ElMessage.success('删除成功')
}

</script>