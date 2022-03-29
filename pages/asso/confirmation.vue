<template>
    <div class="Page pv-150">
        <div class="Wrapper Wrapper--2xs text-center">
            <div v-if="user">
                <p class="ft-2xl-bold color-cherry text-center">
                    Merci d'avoir adhéré {{ user.name }} !
                </p>

                <p class="mt-20">On fera bon usage de ton don, c'est promis. Tu devrais recevoir un e-mail de confirmation sous peu.</p>

                <p class="p-20 bg-cherry-2xweak br-8 mt-20">
                    On se voit très bientôt lors du prochain événement, où tu recevras un livret d'accueil dans l'association, ainsi que quelques autres surprises !
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    name: 'ConfirmationPage',
    data: () => ({

    }),
    computed: {  
        user () { return this.$store.$auth.user }
    },
    async mounted () {
        let intentId = this.$route.query.payment_intent
        
        await this.$store.dispatch('subscribe/confirm', intentId)
    }
}
</script>

<style>

</style>