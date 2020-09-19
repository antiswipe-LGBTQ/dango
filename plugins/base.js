import Vue from 'vue'
import moment from 'moment'

import ButtonBase from '@/components/base/ButtonBase'
import LinkBase from '@/components/base/LinkBase'

moment.locale('fr')

const BasePlugin = {
    
    install (Vue, options) {
        Vue.randomBetween = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
    }
}

Vue.component('ButtonBase', ButtonBase)
Vue.component('LinkBase', LinkBase)
Vue.use(BasePlugin)