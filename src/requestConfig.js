/**
 * 全局请求设置
 * 配置参考Axios中文文档 https://www.kancloud.cn/yunye/axios/234845
 */
import axios from 'axios';
import config from './config/config';

export default {
    axios: axios,
    bootConfig(vueInstance) {
        if (config.env === 'development') {
            axios.defaults.baseURL = '后端地址后缀';
            // example
            // axios.defaults.baseURL = '/push';
        } else if (config.env === 'testing') {
            axios.defaults.baseURL = '测试环境后端地址';
        } else if (config.env === 'production') {
            axios.defaults.baseURL = '正式环境后端地址';
        }

        // 全局请求头设置 Content-Type = application/json
        axios.defaults.headers['Content-Type'] = 'application/json';

        // 默认20秒超时时间
        axios.defaults.timeout = 20 * 1000;

        // 截取 url
        let matchUrl = function (url) {
            let start = url.search(/(\/后端地址后缀\/)|(\/测试或正式环境地址后缀\/)/);
            // example
            // let start = url.search(/(\/push\/)|(\/back\/)/);
            let end = url.search(/\?/);
            return url.slice(start, end === -1 ? undefined : end + 1);
        };

        // 添加请求拦截器
        axios.interceptors.request.use(config => {

            // 在发送请求之前做些什么
            if (config.method === 'get') {
                config.data = true;
            }
            return config;
        }, error => {
            vueInstance.$Modal.error({
                title: '温馨提示',
                content: '请求配置错误' + JSON.stringify(error)
            });
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        axios.interceptors.response.use(response => {
            // 未登陆的情况下跳转到登陆接口
            if (response.request.responseURL.indexOf('http://admin.eebbk.com/webadmin-cas/login') !== -1) { //
                //应该由业务服务器提供登陆接口，用来登陆统一后台
                location.href = axios.defaults.baseURL + '/index';
                return;
            }
            let resData = response.data;

            // 如果没有成功，就统一进行错误处理
            if (!(resData && resData.code === '000001')) {
                console.log('接口地址：' + matchUrl(response.request.responseURL) + '\n错误码: ' + resData.code + '\n原因：' + resData.desc);
                vueInstance.$Modal.error({
                    title: '操作失败',
                    content: '原因：' + resData.desc
                });
                return Promise.reject(resData);
            }
            // return resData.data;
            return Promise.resolve(resData.data);

        }, error => {
            if (error.response.status) {
                switch (error.response.status) {
                    // 401: 未登录
                    // 未登录则跳转登录页面，并携带当前页面的路径
                    // 在登录成功后返回当前页面，这一步需要在登录页操作。
                    case 401:
                        location.href = 'http://admin.eebbk.com/webadmin-cas/login?service=' + encodeURIComponent(axios.defaults.baseURL + '/index');
                        break;
                    // 403 token过期
                    // 跳转登录页面
                    case 403:
                        vueInstance.$Modal.error({
                            title: '温馨提示',
                            content: '登录过期，请重新登录'
                        });
                        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                        setTimeout(() => {
                            location.href = 'http://admin.eebbk.com/webadmin-cas/login?service=' + encodeURIComponent(axios.defaults.baseURL + '/index');
                        }, 1000);
                        break;
                    // 404请求不存在
                    case 404:
                        vueInstance.$Modal.error({
                            title: '温馨提示',
                            content: `${matchUrl(error.response.request.responseURL)}：网络请求不存在`
                        });
                        break;
                    // 其他错误，直接抛出错误提示
                    default:
                        vueInstance.$Modal.error({
                            title: '温馨提示',
                            content: `${matchUrl(error.response.request.responseURL)}：接口异常`
                        });
                }
                return Promise.reject(error.response);
            }
            return Promise.reject(error);
        });
    }
};