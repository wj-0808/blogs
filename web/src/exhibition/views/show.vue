<style></style>

<template></template>

<script setup lang='ts'>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import http from '../../util/http';
const route = useRoute()
const router = useRouter()
const { id, type } = route.query;

onBeforeMount(() => {
    if (type == 'article') getArticle()
    else getWork()
})

const getArticle = () => {
    http.get('/article/' + id).then(res => {
        console.log(res);
    })
};
const getWork = () => {
    http.get('/work/' + id).then(res => {
        console.log(res);
    })
}
</script>