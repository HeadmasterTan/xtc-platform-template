import axios from 'axios';
import qs from 'qs';

export const GET = function (url) {
    return function (params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error); // 抛出 error
            });
        });
    };
};

export const POST = function (url) {
    return function (params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    };
};

export const DELETE = function (url) {
    return function (data) {
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                data // delete 请求使用的是 data 而非 params
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    };
};

export const PUT = function (url) {
    return function (params) {
        return new Promise((resolve, reject) => {
            axios.put(url, params).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    };
};