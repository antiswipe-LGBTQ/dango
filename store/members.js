import storeUtils from '@/utils/store-utils'
import moment from 'moment'

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
        async get ({ commit }, params) {
            try {
                const response = await this.$axios.$get(storeUtils.getQuery('/entities', {
                    ...params.query,
                    type: 'user'
                }))

                commit('updateOne', response.data)

                return response.data
            } catch (e) {
                console.error(e)
                return null
            }
        },
    },
    getters: {
        items: (state) => {
            return Object.values(state.items).map(item => {
                return {
                    ...item
                }
            })
        },
        find: (state, getters) => (search, raw = false) => {
            let items = raw ? Object.values(state.items) : getters.items
            return items
        },
        findOne: (state, getters) => (search, raw = false) => {
            let items = raw ? Object.values(state.items) : getters.items
            return items.find(item => item[Object.keys(search)[0]] == Object.values(search)[0])
        }
    }
}