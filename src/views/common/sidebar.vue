<template>
    <!-- 左侧菜单 -->
    <div class="page-sidebar">
        <Menu class="side-menu" theme="light" :open-names="openName">
            <template v-for="(menu, index) in menuList">
                <template v-if="menu.children">
                    <Submenu :name="menu.id" :key="index">
                        <template slot="title">
                            <Icon :type="menu.icon" />
                            {{ menu.name }}
                        </template>
                        <MenuItem v-for="(item, index) in menu.children" :key="index" :to="item.to || ''" :name="item.id">{{ item.name }}</MenuItem>
                    </Submenu>
                </template>
                <template v-else>
                    <MenuItem :name="menu.id" :key="index" :to="menu.to || ''">{{ menu.name }}</MenuItem>
                </template>
            </template>
        </Menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuList: [
                {
                    id: 'example',
                    name: '栗子',
                    children: [
                        { id: 'example-1', name: '栗子', to: 'example-1' },
                        { id: 'example-2', name: '栗子', to: 'example-2' }
                    ]
                }
            ],
            // 当前展开菜单
            openName: ['example']
        };
    },
    created() {}
};
</script>

<style lang="scss" scoped>
.page-sidebar {
    position: absolute;
    top: 0;
    height: 100%;
    box-sizing: border-box;
    .side-menu {
        height: inherit;
    }
}
</style>