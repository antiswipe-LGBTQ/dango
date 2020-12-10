import Cookies from 'js-cookie'
import Faker from 'faker'
import shortid from 'shortid'

export default {
    namespaced: true,
    state: () => ({
        info: {
            id: ''
        }
    }),
    mutations: {
        setIdentity (state) {
            let id = Cookies.get('identity-id')

            if (!id) {
                id = Faker.random.word().toLowerCase() + '-' + shortid.generate()
                Cookies.set('identity-id', id)
            }
                
            state.info = {
                ...state.info,
                id: id
            }
        }
    },
    actions: {
    }
}