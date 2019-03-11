import Vue from 'vue';
import Vuex from 'vuex';

import basic from './common/basic';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        basic
    }
});