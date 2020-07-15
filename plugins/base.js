import Vue from 'vue'

import ButtonBase from '@/components/base/ButtonBase'

const BasePlugin = {
    
    install (Vue, options) {
        Vue.randomBetween = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
    }
}

Vue.component('ButtonBase', ButtonBase)
Vue.use(BasePlugin)