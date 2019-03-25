let util = {};

util.title = function(env) {
    let title = '{{projectName}}';
    window.document.title = title;
};

export default util;