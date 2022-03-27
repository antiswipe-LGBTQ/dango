<template>
    <div class="Wrapper Wrapper--2xs pv-150">
        <p class="ft-2xl-medium color-cherry mb-20">Mon espace adhérent·e</p>

        <register-form default-type="login" @success="onSuccess" />
    </div>
</template>

<script>
export default {
    name: 'Login',
    middleware: 'loggedIn',
    methods: {
        onSuccess () {
            this.$router.push(this.localePath({ name: 'compte' }))
        }
    }
}
</script>

<style>

</style>