<style></style>

<template>
    <el-input v-model="password" />
    <el-button @click="submit">登录</el-button>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import http from '../../util/http'
const router = useRouter()
const password = ref(null)
const submit = () => {
    if (password.value !== '123456') return alert("密码错误")
    http.post('/login', { password: password.value }).then(res => {
        const token = res.data.token
        if (!token) return
        sessionStorage.setItem('token', token);
        router.push('./')
    })
}
</script>