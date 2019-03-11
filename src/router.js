const routers = [{
        path: '/',
        redirect: '/admin',
    },
    {
        path: '/admin',
        name: '首页',
        meta: {
            title: '首页'
        },
        component: resolve => require(['./views/index.vue'], resolve),
        children: []
    }
];

export default routers;