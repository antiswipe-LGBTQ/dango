export default function ({ store, redirect }) {
    if (store.state.auth.user) {
        return redirect(process.env.BASE_URL)
    }
}