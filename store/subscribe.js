import storeUtils from '@/utils/store-utils'

export default {
    namespaced: true,
    state: () => ({

    }),
    mutations: {

    },
    actions: {
        async checkout ({ state }, params) {
            try {
                const response = await this.$axios.$post('/subscribe', {
                    id: Math.random(),
                    amount: params.amount
                })
                
                if (response.status == 0) throw Error(response.errors[0])
                
                return response.data
            } catch (e) {
                console.error(e)
            }
        },
    }
}