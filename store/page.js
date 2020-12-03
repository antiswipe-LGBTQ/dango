export default {
    namespaced: true,
    state: () => ({
        body: {
            classes: []
        }
    }),
    mutations: {
        addClasses (state, classes) {
            state.body.classes = [ ...state.body.classes, ...classes]
        },
    }
}