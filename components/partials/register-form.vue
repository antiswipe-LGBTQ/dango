<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="row-xs mv-10" v-if="type == 'register'">
                <div class="col-6 col-12@s">
                    <input-base label="Ton prénom" v-model="formData.name" :attrs="{ required: true }" />
                </div>
                <div class="col-6 col-12@s mt-10@s">
                    <input-base label="Ton nom" v-model="formData.lastname" :attrs="{ required: true }" />
                </div>
            </div>
                
            <input-base class="mv-10" label="Ton adresse e-mail" v-model="formData.email" type="email" :attrs="{ required: true }" />

            <input-base class="mv-10" label="Mot de passe" v-model="formData.password" type="password" :attrs="{ required: true }" :helpers="['reveal']" />

            <div class="text-right" v-if="type == 'login'">
                <link-base @click="isReset = true">
                    Mot de passe oublié
                </link-base>
            </div>

            <input-base class="mv-10" label="Ton Discord (optionnel)" :attrs="{ placeholder: 'Pseudo#1010' }" v-model="formData.discord" type="text" v-if="type == 'register'" />

            <errors :items="errors" class="mt-20" v-if="errors.length > 0" />
            
            <div class="mt-20 text-right">
                <link-base class="mr-10" @click="type = type == 'register' ? 'login' : 'register'">
                    {{ type == 'register' ? 'Se connecter' : `S'inscrire` }}
                </link-base>
                <button-base type="submit" :class="{ 'is-loading': isLoading }">
                    {{ type == 'register' ? `Je m'inscris` : `Je me connecte` }}
                </button-base>
            </div>
        </form>

        <popin-base :modifiers="['s', 'absolute-header']" :is-active="isReset" @close="isReset = false">
            <template slot="content">
                <form @submit.prevent="resetPassword" class="p-30">
                    <p class="ft-l-bold">Réinitialiser ton mot de passe</p>
                    
                    <input-base label="Ton adresse e-mail" class="mv-20" type="email" v-model="formData.email" :attrs="{ required: true }" v-show="!resetSuccess" />

                    <p class="ft-s-medium mv-20" v-show="resetSuccess">On vient de t'envoyer un e-mail. N'oublie pas de vérifier dans tes spams !</p>

                    <div class="text-right" v-if="!resetSuccess">
                        <button-base>M'envoyer un email</button-base>
                    </div>
                </form>
            </template>
        </popin-base>
    </div>
</template>

<script>
import { InputBase, ToggleBase } from 'instant-coffee-core'

export default {
    name: 'RegisterForm',
    components: { InputBase, ToggleBase },
    props: {
        defaultType: { type: String, default: 'register' }
    },
    data: () => ({
        isLoading: false,
        isReset: false,
        resetSuccess: false,
        type: 'register',
        errors: [],
        formData: {
            name: '',
            lastname: '',
            password: '',
            discord: '',
            email: '',
        }
    }),
    mounted () {
        this.type = this.$props.defaultType
    },
    methods: {
        async resetPassword () {
            const response = await this.$store.dispatch('user/requestPassword', this.formData.email)
            if (response && response.status == 1) this.resetSuccess = true
        },
        async onSubmit () {
            this.isLoading = true
            this.errors = []

            try {
                const token = await this.$recaptcha.execute('login')
                const response = await this.$auth.loginWith('local', { 
                    data: { ...this.formData, token, type: this.type }
                })

                if (response.data.status != 1) {
                    this.errors = response.data.errors
                } else {
                    this.$emit('success')
                }
            } catch (e) {
                console.warn(e)
            }

            this.isLoading = false
        }
    }
}
</script>
