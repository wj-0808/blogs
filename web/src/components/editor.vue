<style></style>

<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" mode="default"
            @onCreated="handleCreated" @onBlur="handleChange" />
    </div>
</template>

<script setup lang='ts'>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
// 导入组件
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IDomEditor, IToolbarConfig } from '@wangeditor/core';
import http from '../util/http'

const emits = defineEmits(['update:html'])
const props = defineProps({
    html: {
        type: String,
        default: ''
    }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref<string>('');
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = props.html
    }, 0);

})
// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['group-video']
}
// 富文本配置
const editorConfig = {
    placeholder: '请输入你的想法吧...',
    scroll: true,
    MENU_CONF: {}
}
editorConfig.MENU_CONF['uploadImage'] = {
    // 文件大小限制
    maxFileSize: 1 * 1024 * 1024,
    // 上传token
    meta: {
        token: sessionStorage.getItem('token')
    },
    // 超时时间，默认为 10 秒
    timeout: 5 * 1000, // 5 秒
    // 上传进度的回调函数
    onProgress(progress: number) {  // TS 语法
        // onProgress(progress) {       // JS 语法
        // progress 是 0-100 的数字
        console.log('progress', progress)
    },
    async customUpload(file: File, insertFn) {  // TS 语法
        let formData = new FormData();
        formData.append('file', file)
        let { data } = await http.post('/upload/img', formData)
        insertFn(data.file.url)
    }
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: IDomEditor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
const handleChange = (editor: IDomEditor) => {
    emits('update:html', valueHtml.value)
}
</script>