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
                    type: 'page'
                }))

                commit('updateOne', response.data[0])

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
                let thumbnail = ''
                let cover = ''
            
                if (item.image) {
                    if (item.image.medias.find(m => m.size == 's')) thumbnail = item.image.medias.find(m => m.size == 's').src
                    if (item.image.medias.find(m => m.size == 'm')) cover = item.image.medias.find(m => m.size == 'm').src
                }

                return {
                    ...item,
                    thumbnail, cover
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