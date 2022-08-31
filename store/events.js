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
        async fetch ({ commit }, params) {
            try {
                const response = await this.$axios.$get(storeUtils.getQuery('/entities', {
                    ...params.query,
                    type: 'event'
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
            return Object.values(state.items).map(item => {
                let thumbnail = ''
                let cover = ''
            
                if (item.image) {
                    if (item.image.medias.find(m => m.size == 's')) thumbnail = item.image.medias.find(m => m.size == 's').src
                    if (item.image.medias.find(m => m.size == 'm')) cover = item.image.medias.find(m => m.size == 'm').src
                }

                return {
                    ...item,
                    startDate: item.startDate ? moment(item.startDate) : '',
                    thumbnail, cover, link: item.meetupLink
                }
            })
        },
        find: (state, getters, root) => (search, raw = false) => {
            let items = raw ? Object.values(state.items) : getters.items
            return search ? storeUtils.searchItems(items, search, root.auth.user) : items
        },
        findOne: (state, getters) => (search, raw = false) => {
            let items = raw ? Object.values(state.items) : getters.items
            return items.find(item => item[Object.keys(search)[0]] == Object.values(search)[0])
        }
    }
}