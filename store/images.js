import storeUtils from '@/utils/store-utils'
import IMAGES from '@/static/api/images'

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
            const response = IMAGES
            if (!params || params.refresh !== false) commit('refresh', response.images)

            return response.images
        }
    }
}