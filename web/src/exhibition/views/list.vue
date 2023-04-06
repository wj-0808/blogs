<style lang="less">
.list-bg {
    min-height: 100vh;
    background-color: rgba(147, 209, 172, 0.5);
}

.content {
    position: relative;
    left: 50%;
    top: 5vh;
    transform: translateX(-50%);
    width: 70%;
}

.item {
    display: flex;
    margin: 10px;
    box-sizing: border-box;
    cursor: pointer;

    &-text {
        flex: 1 1 auto;
    }

    img {
        flex: 0 0 auto;
        width: 120px;
        height: 80px;
        margin-left: 24px;
        background-color: #fff;
        border-radius: 4px;
        object-fit: cover;
    }
}
</style>

<template>
    <div class="list-bg">
        <el-tabs tab-position="left" class="content" @tab-click="tabClick">
            <el-tab-pane label="文章">
                <template v-if="dataList.article.length">
                    <div v-for="article in dataList.article" @click="router.push('./show?type=article&id=' + article._id)"
                        class="item">
                        <div class="item-text">
                            <p>{{ article.title }}</p>
                            <p>{{ article.description }}</p>
                            <p>{{ dayjs(article.createAt).fromNow() }}</p>
                        </div>
                        <img v-if="article.img" :src="article.img" alt="文章封面">
                    </div>
                </template>
                <el-empty v-else description="没有文章" />
            </el-tab-pane>
            <el-tab-pane lazy label="作品">
                <template v-if="dataList.work.length">
                    <div v-for="work in dataList.work" class="item" @click="router.push('./show?type=article&id=' + work._id)">
                        <div class="item-text">
                            <p>{{ work.title }}</p>
                            <p>{{ work.description }}</p>
                            <p>{{ dayjs(work.createAt).fromNow() }}</p>
                        </div>
                        <img v-if="work.img" :src="work.img" alt="文章封面">
                    </div>
                </template>
                <el-empty v-else description="没有作品" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { ElMessage } from 'element-plus'
import http from '../../util/http';
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const router = useRouter()
const dataList = reactive({
    article: [],
    work: []
})
const search = reactive({
    article: { offset: 0 },
    work: { offset: 0 }
})
const noMore = ref<boolean>(false)
onBeforeMount(() => {
    getArticles();
    getWorks()
    console.log(dayjs);
})

const tabClick = (e) => {
    console.log(e.index);
}

// 获取作品数据
const getWorks = (params?: object) => {
    http.get('/work', { params: { ...params } }).then(res => {
        let { list, count } = res.data;
        if (!list.length) ElMessage.warning('已经加载完了')
        dataList.work = list
    })
}
// 获取文章列表
const getArticles = (params?: object) => {
    http.get('/article', { params: { ...params } }).then(res => {
        let { list, count } = res.data;
        if (!list.length) ElMessage.warning('已经加载完了')
        dataList.article = list
    })
}
</script> 