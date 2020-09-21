import storeUtils from '@/utils/store-utils'
import SUBSCRIBERS from '@/static/api/subscribers'

export default {
    namespaced: true,
    state: () => ({
        items: {}
    }),
    mutations: {
        updateOne (state, value) {
            state.items = storeUtils.updateOne(state, value)
        },
        refresh (state, values) {
            state.items = storeUtils.refresh(values)
        }
    },
    actions: {
        async fetch ({ commit }, params) {
            // const response = await this.$axios.$get(storeUtils.getQuery('/articles', params))
            const response = SUBSCRIBERS
            if (!params || params.refresh !== false) commit('refresh', response.subscribers)

            return response.subscribers
        }
    }
}