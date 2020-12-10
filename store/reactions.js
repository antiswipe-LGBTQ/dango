import storeUtils from '@/utils/store-utils'
import moment from 'moment'

export default {
    namespaced: true,
    state: () => ({
        items: {}
    }),
    mutations: {
        refresh (state, values) {
            state.items = storeUtils.refresh(values)
        }
    },
    actions: {
        async create ({ commit }, params) {
            try {
                const response = await this.$axios.$post('/entities', {
                    ...params,
                    type: 'reaction'
                })
                
                if (response.errors.length > 0) throw response.errors

                return response
            } catch (e) {
                console.error(e)
                return e
            }
        },
        async fetch ({ commit }, params) {
            try {
                const response = await this.$axios.$get(storeUtils.getQuery('/entities', {
                    ...params.query,
                    type: 'reaction'
                }))

                if (params.refresh !== false) commit('refresh', response.data)

                return response.data
            } catch (e) {
                console.error(e)
                return null
            }
        }
    },
    getters: {
        items: (state) => {
            return Object.values(state.items).map(item => item)
        },
        find: (state, getters) => (search = false, raw = false) => {
            let items = raw ? Object.values(state.items) : getters.items
            return search ? items.filter(item => item[Object.keys(search)[0]] == Object.values(search)[0]) : items
        },
        getCount: (state, getters) => (target) => {
            return getters.items.filter(i => i.target == target).reduce((prev, curr) => prev + curr.count, 0)
        }
    }
}