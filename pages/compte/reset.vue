<template>
    <div class="Wrapper Wrapper--2xs">
        <div class="mv-150 bg-bg-light br-s p-30">
            <p class="ft-xl-bold">Créer un nouveau mot de passe</p>

            <div class="text-center" v-if="isSuccess">
                <p class="mv-20">Mot de passe modifié avec succès. Tu es connecté·e à ton espace membre.</p>
            </div>

            <form @submit.prevent="submitForm()" v-else>
                <input-base
                    label="Nouveau mot de passe" 
                    class="mv-20"
                    type="password"
                    :helpers="['reveal']"
                    :attrs="{ autocomplete: 'new-password' }"
                    v-model="formData.password"
                />

                <errors :items="errors" class="mt-20" v-if="errors.length > 0" />

                <div class="text-right">
                    <button-base type="submit" :class="{ 'is-loading': isLoading, 'is-disabled': !formData.password }">
                        Confirmer
                    </button-base>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { InputBase, SelectBase } from 'instant-coffee-core'

export default {
    name: 'ResetPasswordPage',
    components: { InputBase, SelectBase },
    middleware: 'loggedIn',
    data: () => ({
        isLoading: false,
        isSuccess: false,
        errors: [],
        formData: {
            password: '',
            token: ''
        }
    }),
    mounted () {
        if (!this.$route.query.token) this.$router.push(this.localePath({ name: 'compte-login' }))

        this.formData.token = this.$route.query.token
    },
    methods: {
        async submitForm () {
            this.isLoading = true
            this.errors = []

            try {
                const response = await this.$auth.loginWith('local', { 
                    data: { ...this.formData, type: 'reset' }
                })

                if (response.data.status != 1) {
                    this.errors = response.data.errors
                } else {
                    this.isSuccess = true
                }
            } catch (e) {
                console.error(e)
            }

            this.isLoading = false
        }
    }
}
</script>