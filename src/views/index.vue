<template>
    <div class="page-layout">
        <!-- 导航栏 -->
        <Header></Header>
        <!-- 容器 -->
        <div class="page-container">
            <!-- 左侧菜单栏 -->
            <Sidebar></Sidebar>
            <div class="page-content">
                <!-- 路由容器 -->
                <transition name="fade" mode="out-in">
                    <div class="content">
                        <router-view></router-view>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/views/common/sidebar';
import Header from '@/views/common/header';

export default {
    components: {
        Sidebar,
        Header
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.page-layout {
    position: relative;
    height: 100%;
    .page-container {
        position: relative;
        min-height: calc(100% - 80px);
        min-height: -moz-calc(100% - 80px);
        min-height: -webkit-calc(100% - 80px);
        .page-content {
            height: 100%;
            width: 100%;
            padding: 20px 25px 10px 265px;
            background-color: white;
            .content {
                height: 92%;
                width: 100%;
            }
        }
    }
}
</style>