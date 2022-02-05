<template>
    <div class="JoinPage Page">
        <div class="LayoutDefault_banner">
            <div class="Wrapper Wrapper--xs text-center">
                <h1 class="ft-title-2xl-bold color-cherry mb-20 ft-title-xl-bold@xs">
                    Saison 2022 : Phoenix
                </h1>

                <div class="mv-20">Jauge</div>

                {{ total }}

                <div class="row-xs">
                    <div class="col-3" v-for="member in members" :key="member._id">
                        <div class="Block">
                            <div class="Block_container p-20">
                                <p class="ft-title-m-bold color-cherry">
                                    {{ member.name }}
                                </p>

                                <p class="ft-s-medium color-ft-weak">Il y a 2 jours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Saison 2022',
    async fetch () {
        await this.$store.dispatch('members/fetch')
    },
    data: () => ({
        
    }),
    computed: {
        members () {
            let members =  this.$store.getters['members/find']()

            return members.filter(m => {
                return (!m.subscriptions || m.subscriptions.length <= 0) ? false : (m.subscriptions.find(s => s.id == '2022' && s.succeeded) ? true : false)
            })
        },
        total () {
            let total = 0
            
            this.members.forEach(member => {
                let sub = member.subscriptions.find(s => s.id == '2022')
                total += sub.subscription + sub.extra
            })

            return total
        }
    },
    watch: {

    },
    mounted () {

    },
    methods: {

    }
}
</script>