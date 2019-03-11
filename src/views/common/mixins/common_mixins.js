export default {
    methods: {
        /**
         * 显示信息，类型默认 success，时间默认 2.5 秒
         */
        showMsg(msg, type = 'success', second = 2.5) {
            const CONTENT = {
                content: msg,
                duration: second
            };
            switch(type) {
                case 'success':
                    this.$Message.success(CONTENT);
                    return;
                case 'warning':
                    this.$Message.warning(CONTENT);
                    return;
                case 'error':
                    this.$Message.error(CONTENT);
                    return;
            }
        },
        /**
         * 日期格式化函数
         */
        dateFormat(fmt, date) {
            date = new Date(date);
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S' : date.getMilliseconds()
            };
            if(/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for(let k in o) {
                if(new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                }
            }
            return fmt;
        }
    }
};