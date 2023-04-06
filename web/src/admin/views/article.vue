<style scoped>
.avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.font-plus {
    font-size: 40px;
    color: rgb(220, 223, 230);
}
</style>

<template>
    <Back content="文章" />
    <el-form label-position="top" ref="ruleFormRef" label-width="100px" status-icon :rules="rules" :model="form"
        style="max-width: 800px">
        <el-form-item label="类目：" prop="cate_id2">
            <Category v-model:id1="form.cate_id1" v-model:id2="form.cate_id2" />
        </el-form-item>
        <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title" placeholder="Please input" clearable />
        </el-form-item>
        <el-form-item label="描述：" prop="description">
            <el-input v-model="form.description" placeholder="Please input" clearable />
        </el-form-item>
        <el-form-item label="内容：" prop="body">
            <Editor v-if="form.body || !$route.query.id" v-model:html="form.body" />
        </el-form-item>
        <el-form-item label="封面：">
            <el-upload class="-uploader" :http-request="upload" :show-file-list="false" :on-success="handleSuccess">
                <img v-if="form.img" :src="form.img" class="avatar" />
                <i v-else class="fa fa-plus-square-o font-plus" size="200px"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="关键字：">
            <div>
                <el-button size="small" @click="addKey">添加</el-button>
                <div>
                    <el-tag v-for="(tag, i) in form.keyWords " :key="i" @close="delKey(i)"
                        :type="['', 'success', 'info', 'warning', 'danger'][i % 5]" size="small" style="margin-right: 5px;"
                        closable>
                        {{ tag }}
                    </el-tag>
                </div>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit(ruleFormRef)">确定</el-button>
            <!-- <el-button @click="goBack">取消</el-button> -->
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router';
// 导入组件
import Category from '../components/category.vue'
import Editor from '../../components/editor.vue'
import Back from '../components/goBack.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import http from '../../util/http'

const form = reactive({
    cate_id1: '',
    cate_id2: '',
    title: '',
    description: '',
    body: '',
    keyWords: [],
    img: ''
})
const route = useRoute()
onBeforeMount(async () => {
    let { id } = route.query;
    if (id) await getArticle(id)
})
// 获取文章信息
const getArticle = (id) => {
    http.get('/article/' + id).then(res => {
        const article = res.data.article;
        ['title', 'body', 'description', 'cate_id1', 'cate_id2', 'keyWords', 'img'].forEach(key => {
            form[key] = article[key]
        })
    })
}
// 表单实列
const ruleFormRef = ref<FormInstance>()
// 表单验证规则
const noEmpty = (message: string, even: string = 'blur') => {
    return { required: true, message, trigger: even }
}
const rules = reactive<FormRules>({
    title: noEmpty('文章标题不能为空'),
    body: [noEmpty('内容不能为空'), { min: 20, message: '长度不能少于20字', trigger: 'blur' }],
    description: noEmpty('描述不能为空'),
    cate_id1: noEmpty('一级类目不能为全部', 'change'),
    cate_id2: noEmpty('二级类目不能为全部', 'change'),
})
const upload = async (res) => {
    let { file } = res
    let formData = new FormData();
    formData.append('file', file)
    let { data } = await http.post('/upload/img', formData)
    form.img = data.file.url
}
// 上传图片
const handleSuccess = () => {
    ElMessage.success('上传成功')
}
// 添加关键字
const addKey = async () => {
    await ElMessageBox.prompt('请输入关键字', '关键字', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
    })
        .then(({ value }) => form.keyWords.push(value))
        .catch(() => console.warn('用户取消操作'))
}
// 删除关键字
const delKey = (e) => {
    form.keyWords.splice(0, 1)
}
const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            let formData = { ...form };
            console.log(formData);
            if (route.query.id) {
                http.put('/article/' + route.query.id, formData).then(res => {
                    ElMessage.success('提交成功')
                })
            } else {
                http.post('/article', formData).then(res => {
                    ElMessage.success('提交成功')
                })
            }
        } else {
            ElMessage.warning('输入不完整')
        }
    })

}
// 返回
const router = useRouter()
const goBack = () => {
    console.log('goBack')
    router.go(-1)
}
</script>