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
        async fetch ({ commit }) {
            try {
                const response = await this.$axios.$get(storeUtils.getQuery('/entities', {
                    type: 'user'
                }))

                commit('refresh', response.data)

                return response.data
            } catch (e) {
                console.error(e)
                return null
            }
        },
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
                    ...item,
                    isSubscriber: item.subscriptions ? item.subscriptions.reduce((t, s) => t += s.succeeded ? 1 : 0, 0) > 0 : false
                }
            })
        },
        find: (state, getters) => (search, raw = false) => {
            let items = raw ? Object.values(state.items) : getters.items
            return search ? items.filter(item => item[Object.keys(search)[0]] == Object.values(search)[0]) : items
        },
        findOne: (state, getters) => (search, raw = false) => {
            let items = raw ? Object.values(state.items) : getters.items
            return items.find(item => item[Object.keys(search)[0]] == Object.values(search)[0])
        }
    }
}