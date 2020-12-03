import Vue from 'vue'
import moment from 'moment'
import { ButtonBase, PopinBase, HelpersMixin } from '@instant-coffee/core'

import LinkBase from '@/components/base/LinkBase'

moment.locale('fr')

Vue.mixin({
    methods: {
        ...HelpersMixin.methods
    },
})

Vue.component('ButtonBase', ButtonBase)
Vue.component('PopinBase', PopinBase)
Vue.component('LinkBase', LinkBase)