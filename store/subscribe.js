import storeUtils from '@/utils/store-utils'

export default {
    namespaced: true,
    state: () => ({

    }),
    mutations: {

    },
    actions: {
        async checkout ({ state }) {
            try {
                const response = await this.$axios.$post('/subscribe', {
                    id: Math.random()
                })
                
                if (response.status == 0) throw Error(response.errors[0])
                
                return response.data
            } catch (e) {
                console.error(e)
            }
        },
    }
}