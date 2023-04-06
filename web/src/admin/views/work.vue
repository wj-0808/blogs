<style>
.avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
</style>

<template>
    <Back content="作品" />
    <el-form label-position="top" ref="ruleFormRef" label-width="100px" status-icon :rules="rules" :model="form"
        style="max-width: 800px">
        <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title" placeholder="Please input" clearable />
        </el-form-item>
        <el-form-item label="描述：" prop="description">
            <el-input v-model="form.description" placeholder="Please input" clearable />
        </el-form-item>
        <el-form-item label="封面：">
            <el-upload class="uploader" :http-request="uploadImg" :show-file-list="false" :on-success="handleSuccess">
                <img v-if="form.img" :src="form.img" class="avatar" />
                <i v-else class="fa fa-plus-square-o font-plus" size="200px"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="文件：" prop="workUrl">
            <el-upload class="uploader" :http-request="uploadWork" :show-file-list="false" :on-success="handleSuccess">
                <a v-if="form.workUrl" :href="form.workUrl" target="_blank" rel="noopener noreferrer">链接</a>
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
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router';
// 导入组件
import Back from '../components/goBack.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import http from '../../util/http'

const form = reactive({
    title: '',
    description: '',
    keyWords: [],
    img: '',
    workUrl: ''
})
const route = useRoute()
onBeforeMount(async () => {
    let { id } = route.query;
    if (id) await getArticle(id)
})
// 获取作品信息
const getArticle = (id) => {
    http.get('/work/' + id).then(res => {
        const article = res.data.article;
        ['title', 'workUrl', 'description', 'keyWords', 'img'].forEach(key => {
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
    title: noEmpty('作品标题不能为空'),
    workUrl: noEmpty('请上传作品'),
    description: noEmpty('描述不能为空'),
})
// 上传图片
const uploadImg = async (res) => {
    let { file } = res
    let formData = new FormData();
    formData.append('file', file)
    let { data } = await http.post('/upload/img', formData)
    form.img = data.file.url
}
// 上传作品文件
const uploadWork = async (res) => {
    let { file } = res
    let formData = new FormData();
    formData.append('file', file)
    let { data } = await http.post('/upload/work', formData)
    form.workUrl = data.work.url
}
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
                http.put('/work/' + route.query.id, formData).then(res => {
                    ElMessage.success('提交成功')
                })
            } else {
                http.post('/work', formData).then(res => {
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