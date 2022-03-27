<template>
    <div>
        Hey
    </div>
</template>

<script>
export default {
    name: 'Mon compte',
    middleware: 'loggedUser',
    computed: {
        user () { return this.$store.$auth.user },
    }
}
</script>

<style>

</style>