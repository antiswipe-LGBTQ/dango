<template>
    <div class="Page pv-150">
        <div class="Wrapper Wrapper--2xs">
            <form class="br-8 o-hidden" @submit.prevent="onSubmit">
                <div class="bg-cherry-xweak p-40">
                    <p class="ft-m-medium color-cherry mb-20">Tes informations</p>

                    <div class="row-xs mv-10">
                        <div class="col-6">
                            <input-base label="Ton prénom" v-model="formData.name" :attrs="{ required: true }" />
                        </div>
                        <div class="col-6">
                            <input-base label="Ton nom" v-model="formData.lastname" :attrs="{ required: true }" />
                        </div>
                    </div>
                        
                    <input-base class="mv-10" label="Ton adresse e-mail" v-model="formData.email" type="email" />

                    <label class="fx-center mv-15 c-pointer ft-s">
                        <toggle-base class="mr-10" v-model="formData.agreement" :attrs="{ required: true }" />

                        J'adhère à la Charte de conduite et au règlement intérieur d'antiswipe. Je comprends que l'association est destinée aux personnes de moins 35 ans s'identifiant comme LGBTQ.
                    </label>
                </div>

                <div class="bg-blueberry-xweak p-40">
                    <div class="d-flex">
                        <div class="">
                            <p class="ft-m-medium color-cherry mb-20">Adhésion 2022</p>

                            <div class="Tile Block Block--cherry Tile--cherry">
                                <div class="Tile_content Block_container">
                                    <p class="ft-m-medium">Adhésion pour la saison 2022</p>
                                    <p class="ft-4xl-bold">15€</p>
                                </div>
                            </div>
                        </div>
                        <div class="fx-grow ml-40">
                            <p class="ft-m-medium color-blueberry mb-20">Faire un don en plus</p>

                            <div class="Extras" :class="{ 'is-active': formData.extra != 0 }">
                                <particles-emitter :modifiers="['left']"  class="Extras_item Block Block--blueberry mv-10 d-block color-blueberry" :class="{ 'is-active': extra.amount == formData.extra && extra.amount != extraCustom }" :distance="0.5" v-for="(extra, i) in extras" :icons="extra.icons" :key="i" @click.native="extra.amount == formData.extra ? formData.extra = 0 : formData.extra = extra.amount">
                                    <div class="Block_container fx-center p-10">
                                        <div class="round-s bg-blueberry color-white mr-5" v-if="extra.amount == formData.extra && extra.amount != extraCustom">
                                            <i class="fal fa-check"></i>
                                        </div>
                                        <div class="round-s bg-blueberry-xweak mr-5" v-else>
                                            <i class="fal fa-check"></i>
                                        </div>

                                        <p class="ft-m-medium mr-20 ml-5 fx-grow">{{ extra.title }}</p>
                                        <p class="ft-xl-bold">+{{ extra.amount }}€</p>
                                    </div>
                                </particles-emitter>

                                <particles-emitter :modifiers="['left']"  class="Extras_item Block Block--blueberry mv-10 d-block color-blueberry" :class="{ 'is-active': extraCustom == formData.extra }" :distance="0.5" @click.native="formData.extra == extraCustom ? formData.extra = 0 : formData.extra = extraCustom">
                                    <div class="Block_container fx-center p-10">
                                        <div class="round-s bg-blueberry color-white fx-no-shrink mr-5" v-if="extraCustom == formData.extra">
                                            <i class="fal fa-check"></i>
                                        </div>
                                        <div class="round-s bg-blueberry-xweak mr-5" v-else>
                                            <i class="fal fa-check"></i>
                                        </div>

                                        <p class="ft-m-medium mr-20 ml-5 fx-grow">Don libre</p>
                                        <input-base type="number" class="width-3xs text-right"  suffix="€" v-model="extraCustom" @input="formData.extra = extraCustom" />
                                    </div>
                                </particles-emitter>
                            </div>
                        </div>
                    </div>

                    
                </div>

                <div class="bg-blueberry-xweak p-20 br-8 color-blueberry mt-20 fx-center">
                    <div>
                        <p class="ft-m-medium">Au total</p>
                        <p class="ft-s">Prélèvement unique, ce n'est pas un abonnement !</p>
                    </div>
                    <p class="ft-2xl-bold">{{ total }}€</p>
                </div>

                <div class="p-40 b mt-20" v-if="isReady">
                    <div id="card-element"></div>

                    <div class="bg-cherry-xweak color-cherry mt-20 p-20 ft-s-medium br-8" v-if="error">
                        {{ error }}
                    </div>
                </div>

                <div class="mt-20 text-right">
                    <button-base type="button" v-if="!isReady" @click="isReady = true">Passer au paiement</button-base>
                    <button-base v-else>J'adhère !!</button-base>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { InputBase, ToggleBase } from 'instant-coffee-core'

export default {
    name: 'SubscribePage',
    components: { InputBase, ToggleBase },
    data: () => ({
        elements: null,
        extraCustom: '20',
        isReady: false,
        error: '',
        extras: [
            { amount: '2', title: `Un petit café`, icons: ['fas fa-coffee-bean', 'fas fa-coffee-beans', 'fas fa-cup-togo'] },
            { amount: '5', title: `Un bouquet de fleurs`, icons: ['fas fa-coffee-bean', 'fas fa-coffee-beans', 'fas fa-cup-togo'] },
            { amount: '10', title: `Une place de cinéma`, icons: ['fas fa-coffee-bean', 'fas fa-coffee-beans', 'fas fa-cup-togo'] },
            { amount: '15', title: `Un bouquet de fleurs`, icons: ['fas fa-coffee-bean', 'fas fa-coffee-beans', 'fas fa-cup-togo'] },
        ],
        formData: {
            name: '',
            lastname: '',
            email: '',
            agreement: false,
            extra: 0
        }
    }),
    computed: {
        total () {
            return 15 + parseInt(this.formData.extra)
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

            try {
                let response = await this.$store.dispatch('subscribe/checkout', { 
                    amount: this.total
                })
        
                if (this.$stripe) {
                    this.elements = this.$stripe.elements({ clientSecret: response.token })
                    const card = this.elements.create('payment')
                    card.mount('#card-element')
                }
            } catch (e) {
                console.error(e)
            }
        },
        async onSubmit () {
            this.error = ''

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