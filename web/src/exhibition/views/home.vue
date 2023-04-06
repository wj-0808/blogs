<style lang="less">
.bg {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    background-image:
        radial-gradient(closest-side, rgb(167, 191, 157), rgba(235, 244, 231, 0)),
        radial-gradient(closest-side, rgba(209, 222, 116, 1), rgba(209, 222, 116, 0)),
        radial-gradient(closest-side, rgba(239, 216, 137, 1), rgba(239, 216, 137, 0)),
        radial-gradient(closest-side, rgba(234, 190, 194, 1), rgba(234, 190, 194, 0)),
        radial-gradient(closest-side, rgb(197, 210, 163), rgba(197, 210, 163, 0));
    background-size:
        130vmax 130vmax,
        80vmax 80vmax,
        90vmax 90vmax,
        110vmax 110vmax,
        90vmax 90vmax;
    background-position:
        -80vmax -80vmax,
        60vmax -30vmax,
        10vmax 10vmax,
        -30vmax -10vmax,
        50vmax 50vmax;
    background-color: rgb(188, 217, 176);
    animation: gradientMove 5s linear infinite;
    backdrop-filter: blur(100px);

    &::after {
        content: '';
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }


}

.message {
    position: absolute;
    top: 20%;
    left: 20%;
    z-index: 10;
    color: white;

    h1 {
        display: inline-block;
        color: white;
        font-size: 50px;
        letter-spacing: 10px;
    }

    p {
        font-size: 20px;
        margin-top: 10px;
        text-indent: 60px;
        letter-spacing: 2px;
    }
}

.btns {
    position: absolute;
    bottom: 30%;
    z-index: 10;
    display: flex;
    justify-content: center;
    width: 100%;

    .btn {
        margin: 0 30px;
        font-size: 20px;
        letter-spacing: 2px;
        border: none;
        padding: 20px 70px;
        border-radius: 50px;
        color: white;
        cursor: pointer;
        position: relative;
        transform-style: preserve-3d;
        transition: ease-in-out 2s;

        &::before,
        &::after {
            content: "";
            border: 5px solid white;
            border-radius: 50px;
            position: absolute;
            left: 5%;
            top: 10%;
            right: 5%;
            bottom: 10%;

        }

        &::before {
            transform: translateZ(20px);
        }

        &::after {
            transform: translateZ(-20px);
        }

        &:hover {
            transform: rotateX(360deg);
        }
    }

    .btn-l {
        background-image: linear-gradient(45deg, #243949 0%, #517fa4 100%);
    }

    .btn-r {
        background-image: linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%);
    }
}

@keyframes gradientMove {

    0%,
    100% {
        background-size:
            130vmax 130vmax,
            80vmax 80vmax,
            90vmax 90vmax,
            110vmax 110vmax,
            90vmax 90vmax;
        background-position:
            -80vmax -80vmax,
            60vmax -30vmax,
            10vmax 10vmax,
            -30vmax -10vmax,
            50vmax 50vmax;
    }

    25% {
        background-size:
            100vmax 100vmax,
            90vmax 90vmax,
            100vmax 100vmax,
            90vmax 90vmax,
            60vmax 60vmax;
        background-position:
            -60vmax -90vmax,
            50vmax -40vmax,
            0vmax -20vmax,
            -40vmax -20vmax,
            40vmax 60vmax;
    }

    50% {
        background-size:
            80vmax 80vmax,
            110vmax 110vmax,
            80vmax 80vmax,
            60vmax 60vmax,
            80vmax 80vmax;
        background-position:
            -50vmax -70vmax,
            40vmax -30vmax,
            10vmax 0vmax,
            20vmax 10vmax,
            30vmax 70vmax;
    }

    75% {
        background-size:
            90vmax 90vmax,
            90vmax 90vmax,
            100vmax 100vmax,
            90vmax 90vmax,
            70vmax 70vmax;
        background-position:
            -50vmax -40vmax,
            50vmax -30vmax,
            20vmax 0vmax,
            -10vmax 10vmax,
            40vmax 60vmax;
    }
}
</style>

<template>
    <div class="bg">
        <section class="message">
            <h1 class="author">荏苒</h1>
            <p>个人学习笔记</p>
        </section>
        <div class="btns">
            <router-link to="/list">
                <button class="btn btn-l">查看笔记</button>
            </router-link>
            <a href="../../../admin.html" target="_blank">
                <button class="btn btn-r">个人管理</button>
            </a>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import http from '../../util/http';

// onBeforeMount(() => {
//     http.get('/').then(res => {
//         console.log(res);
//     })
// })


</script>
