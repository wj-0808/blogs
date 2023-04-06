<style lang="less">
.cateory {
    &-childern {
        box-sizing: border-box;
        margin: 20px;
    }
}
</style>

<template>
    <el-button style="margin-bottom: 10px;" type="primary" plain @click="add">新增一级类目</el-button>
    <el-table :data="data.tableData" :border="true" style="width: 100%" row-key="_id" empty-text="没有类目">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="状态">
            <template #default="scope">
                <el-switch v-model="scope.row.status" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    size="small" @change="categoryChange(scope.row)" />
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" type="info" plain @click="categoryChange(scope.row, true)">修改类目</el-button>
                <el-button v-if="!scope.row.parent" size="small" type="primary" plain
                    @click="add(scope.row._id)">添加子类</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang='ts'>
import { reactive, onBeforeMount } from 'vue'
import http from '../../util/http'
import { ElMessage, ElMessageBox } from 'element-plus'
import { isString } from '../../util/util'
interface Cateory {
    _id: string
    name: string
    index: number
    status: boolean
    parent?: string
    childern?: Cateory[]
    createAt: string
    updateAt: string
}
interface Content {
    name?: string
    status?: boolean
}
const data = reactive({
    tableData: []
})
// 初始化
onBeforeMount(async () => {
    await getCategories()
})
// 修改类目
const categoryChange = async (category: Cateory, editName: boolean = false) => {
    let { _id, name, status } = category;
    if (editName) name = await setName('修改类目', name)
    await edit(_id, { name, status })
    getCategories()
}
// 输入类目名称
const setName = async (message: string, defaultName: string = '') => {
    let name: string;
    await ElMessageBox.prompt('请输入类目名', message, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: defaultName
    })
        .then(({ value }) => name = value)
        .catch(() => console.warn('用户取消操作'))
    return name
}
// 获取类目
const getCategories = async () => {
    let list = new Map();
    await http.get('/category/all').then(res => {
        res.data.list.forEach((cate: { parent: string; children: Cateory[]; _id: string; }) => {
            if (!cate.parent) {
                // 一级目录
                cate.children = []
                list.set(cate._id, cate)
            }
            else {
                let cateParent = list.get(cate.parent);
                cateParent.children.push(cate)
            }
        });
    })
    data.tableData = Array.from(list.values())
}
// 添加类目
const add = async (id?: string) => {
    let name = await setName('添加类目')
    if (!name) return ElMessage.warning('类名不能为空')
    let formData = { name }
    if (isString(id)) formData['parent'] = id
    http.post('/category', formData).then(res => {
        ElMessage.success('添加成功');
        getCategories()
    }).catch(err => {
        ElMessage.error('添加失败')
    })
}
// 修改类目
const edit = async (id: string, formData: Content) => {
    if (!formData.name) return ElMessage.warning('类名不能为空')
    await http.put('/category/' + id, formData).then(res => {
        ElMessage.success('修改成功')
    }).catch(err => {
        ElMessage.error('修改失败')
    })
}
</script>