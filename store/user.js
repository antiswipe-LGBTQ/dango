export default {
    namespaced: true,
    actions: {
        async requestPassword ({ commit }, email) {
            try {
                const response = await this.$axios.$post('/user/reset', {
                    email
                })

                if (response.errors.length > 0) throw Error(response.errors[0])

                return response
            } catch (e) {
                console.error(e)
                return false
            }
        },
        async resetPassword ({ commit }, data) {
            try {
                const response = await this.$axios.$post('/user/reset/confirm', {
                    ...data
                })

                if (response.errors.length > 0) throw Error(response.errors[0])

                return response
            } catch (e) {
                console.error(e)
                return false
            }
        },
    }
}