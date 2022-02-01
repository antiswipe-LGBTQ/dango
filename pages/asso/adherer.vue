<template>
    <div class="Page pv-150">
        <div class="Wrapper Wrapper--2xs">
            <form @submit.prevent="onSubmit">
                <div class="bg-cherry-xweak p-20">
                    <p class="ft-m-medium color-cherry mb-20">Tes informations</p>

                    <div class="row-xs mv-10">
                        <div class="col-6">
                            <input-base label="Ton prénom" v-model="formData.name" />
                        </div>
                        <div class="col-6">
                            <input-base label="Ton nom" v-model="formData.lastname" />
                        </div>
                    </div>
                        
                    <input-base class="mv-10" label="Ton adresse e-mail" v-model="formData.email" />
                </div>

                <div class="bg-blueberry-xweak p-20">
                    <div class="row-xs">
                        <div class="col-6">
                            <p class="ft-m-medium color-blueberry mb-20">Adhésion 2022</p>

                            <div class="Tile Tile--cherry">
                                <div class="Tile_content">
                                    <p class="ft-m-medium">Adhésion pour la saison 2022</p>
                                    <p class="ft-4xl-bold">15€</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <p class="ft-m-medium color-blueberry mb-20">Un petit extra ?</p>

                            <div>
                                <div class="Tile Tile--s Tile--blueberry">
                                    <div class="Tile_content">
                                        <p class="ft-m-medium">Un petit café</p>
                                        <p class="ft-2xl-bold">+2€</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-20 b">
                    <div id="card-element"></div>
                </div>

                <div class="mt-20 text-right">
                    <button-base>Adhérer !!</button-base>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { InputBase } from 'instant-coffee-core'

export default {
    name: 'SubscribePage',
    components: { InputBase },
    data: () => ({
        elements: null,
        formData: {
            name: '',
            lastname: '',
            email: ''
        }
    }),
    methods: {
        async onSubmit () {
            try {
                const response = await this.$stripe.confirmPayment({
                    elements: this.elements,
                    confirmParams: {
                        return_url: process.env.baseUrl + this.localePath({ name: 'commande-confirmation' })
                    }
                })
            } catch (e) {
                console.error(e)
            }
        }
    },
    async mounted () {
        try {
            let response = await this.$store.dispatch('subscribe/checkout')
    
            if (this.$stripe) {
                this.elements = this.$stripe.elements({ clientSecret: response.token })
                const card = this.elements.create('payment')
                card.mount('#card-element')
            }
        } catch (e) {
            console.error(e)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>