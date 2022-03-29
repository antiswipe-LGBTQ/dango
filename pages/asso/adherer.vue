<template>
    <div class="Page pv-150 pv-100@s">
        <div class="Wrapper Wrapper--2xs">
            
            <p class="ft-title-2xl mb-20">Adhérer à antiswipe</p>
            
            <div v-if="alreadySubbed">
                Wow, on apprécie mais il semblerait que tu sois déjà adhérent·e pour l'année {{ SEASON }}. On ne voudrait pas abuser... Reviens l'année prochaine !
            </div>
            <div class="br-8 o-hidden" v-else>
                <div class="bg-cherry-2xweak p-40 p-20@s" v-if="!user">
                    <p class="ft-l-medium color-cherry mb-20">Créer ton espace membre</p>
                    <register-form />
                </div>
                <div class="fx-center bg-cherry-2xweak p-20" v-else>
                    <div>Connecté·e en tant que <b>{{ user.email }}</b></div>

                    <link-base tag="nuxt-link" :attrs="{ to: localePath({ name: 'compte-logout' }) }">Se déconnecter</link-base>
                </div>
                
                <form @submit.prevent="onSubmit" v-if="user">
                    <div class="bg-blueberry-2xweak p-40 p-20@s" >
                        <div class="d-flex d-block@s">
                            <div class="">
                                <p class="ft-m-medium color-cherry mb-20">Adhésion {{ SEASON }}</p>

                                <div class="Tile Block Block--cherry Tile--cherry">
                                    <div class="Tile_content Block_container">
                                        <p class="ft-m-medium">Adhésion pour la saison {{ SEASON }}</p>
                                        <p class="ft-4xl-bold">15€</p>
                                    </div>
                                </div>
                            </div>
                            <div class="fx-grow ml-40 ml-0@s mt-40@s">
                                <p class="ft-m-medium color-blueberry mb-20">Faire un don en plus</p>

                                <div class="Extras" :class="{ 'is-active': formData.extra != 0 }">
                                    <particles-emitter :modifiers="['left']"  class="Extras_item Block Block--blueberry mv-10 d-block color-blueberry" :class="{ 'is-active': extra.amount == formData.extra && extra.amount != extraCustom }" :distance="0.5" v-for="(extra, i) in extras" :icons="extra.icons" :key="i" @click.native="extra.amount == formData.extra ? formData.extra = 0 : formData.extra = extra.amount">
                                        <div class="Block_container fx-center p-10">
                                            <div class="round-s bg-blueberry color-white mr-5" v-if="extra.amount == formData.extra && extra.amount != extraCustom">
                                                <i class="fal fa-check"></i>
                                            </div>
                                            <div class="round-s bg-blueberry-2xweak mr-5" v-else>
                                                <i class="fal fa-check"></i>
                                            </div>

                                            <div class="mr-20 ml-5 fx-grow">
                                                <p class="ft-xs">L'équivalent...</p>
                                                <p class="ft-m-medium">{{ extra.title }}</p>
                                            </div>

                                            <p class="ft-xl-bold">+{{ extra.amount }}€</p>
                                        </div>
                                    </particles-emitter>

                                    <particles-emitter :modifiers="['left']"  class="Extras_item Block Block--blueberry mv-10 d-block color-blueberry" :class="{ 'is-active': extraCustom == formData.extra }" :distance="0.5" :icons="['fas fa-heart']" @click.native="formData.extra == extraCustom ? formData.extra = 0 : formData.extra = extraCustom">
                                        <div class="Block_container fx-center p-10">
                                            <div class="round-s bg-blueberry color-white fx-no-shrink mr-5" v-if="extraCustom == formData.extra">
                                                <i class="fal fa-check"></i>
                                            </div>
                                            <div class="round-s bg-blueberry-2xweak mr-5" v-else>
                                                <i class="fal fa-check"></i>
                                            </div>

                                            <p class="ft-m-medium mr-20 ml-5 fx-grow">Don libre</p>
                                            <input-base type="number" class="width-3xs text-right"  suffix="€" v-model="extraCustom" @input="formData.extra = extraCustom" />
                                        </div>
                                    </particles-emitter>
                                </div>
                            </div>
                        </div>

                        <label class="fx-center mv-10 c-pointer ft-s">
                            <toggle-base class="mr-10" v-model="formData.agreement" :attrs="{ required: true }" />
                            <p class="fx-grow">J'adhère à la Charte de conduite et au règlement intérieur d'antiswipe.</p>
                        </label>
                        
                        <label class="fx-center mv-10 c-pointer ft-s">
                            <toggle-base class="mr-10" v-model="formData.age" :attrs="{ required: true }" />
                            <p class="fx-grow">Je comprends que l'asso est destinée aux personnes LGBTQ de -35 ans.</p>
                        </label>
                    </div>

                    <div class="p-40 b mt-20" v-if="isReady">
                        <div id="card-element">
                            <div class="p-20 bg-blueberry-2xweak color-blueberry br-8">
                                Chargement du formulaire de paiement...
                            </div>
                        </div>
                    </div>
                
                    <div class="bg-blueberry-2xweak p-20 br-8 color-blueberry mt-20 fx-center">
                        <div>
                            <p class="ft-m-medium">Au total</p>
                            <p class="ft-s">Prélèvement unique, ce n'est pas un abonnement !</p>
                        </div>
                        <p class="ft-2xl-bold">{{ total }}€</p>
                    </div>

                    <div class="bg-cherry-2xweak color-cherry mt-20 p-20 ft-s-medium br-8" v-if="error">
                        {{ error }}
                    </div>

                    <div class="mt-20 text-right">
                        <button-base v-if="user && !isReady">Passer au paiement</button-base>
                        <button-base :class="{ 'is-loading': isLoading }" v-else-if="user">J'adhère !!</button-base>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { InputBase, ToggleBase } from 'instant-coffee-core'

const SEASON = '2022'

export default {
    name: 'SubscribePage',
    components: { InputBase, ToggleBase },
    data: () => ({
        SEASON,
        elements: null,
        extraCustom: '20',
        isLoading: false,
        isReady: false,
        error: '',
        extras: [
            { amount: '5', title: `d'un café glacé`, icons: ['fas fa-coffee-bean', 'fas fa-coffee-beans', 'fas fa-cup-togo'] },
            { amount: '10', title: `d'une place de ciné`, icons: ['fas fa-popcorn', 'fas fa-clapperboard'] },
            { amount: '15', title: `d'un joli bouquet`, icons: ['fas fa-flower'] },
        ],
        formData: {
            agreement: false,
            age: false,
            subscription: 15,
            extra: 0
        }
    }),
    computed: {
        total () { return this.formData.subscription + parseInt(this.formData.extra) },
        user () { return this.$store.$auth.user },
        alreadySubbed () {
            return this.user && this.user.subscriptions.find(s => s.id == SEASON && s.succeeded)
        }
    },
    watch: {
        isReady (v) {
            if (v) {
                this.initPayment()
            } else {
                this.elements = null
            }
        },
        total () {
            this.isReady = false
        }
    },
    methods: {
        async initPayment () {
            this.error = ''
            this.isLoading = true

            try {
                let response = await this.$store.dispatch('subscribe/checkout', {
                    season: SEASON,
                    extra: parseInt(this.formData.extra)
                })

                if (this.$stripe) {
                    this.elements = this.$stripe.elements({ locale: 'fr', clientSecret: response.token })
                    const card = this.elements.create('payment')
                    card.mount('#card-element')
                }
            } catch (e) {
                console.error(e)
                this.error = 'Une erreur est survenue, merci de réessayer !'
            }
            
            this.isLoading = false
        },
        async onSubmit () {
            if (!this.isReady) {
                this.isReady = true
            } else {
                this.error = ''
                this.isLoading = true

                try {
                    const response = await this.$stripe.confirmPayment({
                        elements: this.elements,
                        confirmParams: {
                            return_url: process.env.baseUrl + this.localePath({ name: 'asso-confirmation' })
                        }
                    })

                    if (response.error) this.error = response.error.message
                } catch (e) {
                    console.error(e)
                    this.error = 'Une erreur est survenue, merci de réessayer !'
                }

                this.isLoading = false
            } 
        },
    }
}
</script>

<style lang="scss" scoped>

    .Extras_item {
        cursor: pointer;
        transition: all 200ms ease;
        
        &:hover {
            transform: translateY(-2px);
            opacity: 1;
        }
    }

    .Extras.is-active {

        .Extras_item {
            opacity: 0.25;

            &.is-active {
                opacity: 1;
            }
        }
    }
</style>