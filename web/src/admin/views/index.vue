<template>
    <div class="layout">
        <el-container>
            <el-header height="60px">Header</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-scrollbar>
                        <el-menu router>
                            <el-menu-item index="0" route="/category">
                                <span>类目</span>
                            </el-menu-item>
                            <el-menu-item index="1" route="/articleList">
                                <span>文章</span>
                            </el-menu-item>
                            <el-menu-item index="2" route="/workList">
                                <span>作品</span>
                            </el-menu-item>
                        </el-menu>
                    </el-scrollbar>
                </el-aside>
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
// 路由实列
const router = useRouter()
</script>