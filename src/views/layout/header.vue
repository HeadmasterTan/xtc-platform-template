<template>
    <!-- 导航栏 -->
    <div class="page-header">
        <!-- 系统或者品牌介绍 -->
        <div class="brand">
            <img src="" class="logo" />
            <span>{{projectName}}</span>
        </div>
        <!-- 用户登录信息 -->
        <div class="user-info">
            <Avatar icon="ios-person" size="large" />
            <span class="username">user-name</span> 丨
            <a href="http://admin.eebbk.com/webadmin-cas/logout" class="logout">退出</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.page-header {
    width: 100%;
    height: 80px;
    background-color: rgb(51, 51, 51);
    position: relative;
    .brand {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 240px;
        height: 100%;
        color: #fff;
        background-color: #333;
        font-size: 22px;
        font-weight: 600;
        .logo {
            width: 50px;
            height: 50px;
            margin: 10px;
        }
    }
    .user-info {
        float: right;
        position: absolute;
        top: 20px;
        right: 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #657180;
        font-size: 16px;
        padding: 0 10px;
        .username, .logout {
            color: #fff;
        }
        .username {
            margin-left: 10px;
        }
        .logout:hover {
            color: #fff;
        }
    }
}
</style>