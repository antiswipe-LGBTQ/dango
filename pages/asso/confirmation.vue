<template>
    <div class="Page pv-150">
        <div class="Wrapper--xs text-center">
            <div v-if="user">
                <p class="ft-2xl-bold color-cherry text-center">
                    Merci d'avoir adhéré {{ user.name }} !
                </p>

                <p>Tu devrais recevoir un e-mail de confirmation sous peu.</p>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    name: 'ConfirmationPage',
    data: () => ({
        user: null
    }),
    async mounted () {
        let id = Cookies.get('user-id')
        let intentId = this.$route.query.payment_intent

        console.log(intentId)
        
        await this.$store.dispatch('subscribe/confirm', intentId)
        this.user = await this.$store.dispatch('members/get', { query: { _id: id }})
    }
}
</script>

<style>

</style>