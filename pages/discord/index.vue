<template>
    <div class="DiscordPage Page">
        <div class="bg-cherry-2xweak pt-100 pb-40">
            <div class="Wrapper Wrapper--xs text-center">
                <h1 class="ft-title-2xl mb-10">
                    Un mois de <b class="color-blueberry">{{ $moment().add(this.offset, 'months').format('MMMM').toUpperCase() }}</b><br>chez antiswipe...
                </h1>

                <div class="mb-30">
                    <link-base @click="offset--" v-if="currentMonth !== '202203'">Mois précédent</link-base>

                    
                    <link-base @click="offset++" v-if="currentMonth !== $moment().format('YYYYMM')">Mois suivant</link-base>
                </div>

                <ranking-graph :items="members.slice(0, 6)" title="Celles & ceux qui ont fait vivre le serveur" v-if="members.length > 0" />
            </div>
        </div>

        <div class="bg-current-2xweak is-avocado pv-40" v-if="gifs.length > 0">
            <div class="Wrapper Wrapper--xs text-center">
                <p class="ft-title-xl color-current mb-20">Les GIFs les plus populaires</p>

                <image-line :items="gifs.slice(0, 3)" />
                <image-line class="mt-5" :items="gifs.slice(3, 6)" />
            </div>
        </div>

        <div class="bg-current-2xweak is-banana pv-40" v-if="messages.length > 0">
            <div class="Wrapper Wrapper--s text-center">
                <p class="ft-title-xl color-current">Les messages qui vous ont marqué<br>(pour le meilleur et surtout le pire)</p>

                <div class="row-xs fx-justify-center mt-20">
                    <div class="col-4 d-flex mt-10 col-12@s" v-for="(message, i) in messages.slice(0, 5)" :key="i">
                        <div class="bg-current-xweak p-20 br-s fx-grow d-flex fx-dir-column fx-justify-end">
                            <div class="text-left mb-30" v-if="message.replyTo">
                                <div class="d-inline-block bg-current-weak color-ft ft-s-medium pv-10 ph-15 br-m mr-15">
                                    {{ message.replyTo.content }}
                                </div>

                                <div class="ft-title-s mt-5 line-1">
                                    <div class="image-round mr-5" :style="{ backgroundImage: `url(${getUser(message.replyTo.owner).picture ? getUser(message.replyTo.owner).picture : ''})` }"></div>
                                    {{ getUser(message.replyTo.owner).username }}
                                </div>
                            </div>
                            
                            <div class="text-right">
                                <div class="d-inline-block bg-current color-ft ft-s-medium pv-10 ph-15 br-m ml-15">
                                    {{ message.content }}
                                </div>

                                <div class="ft-title-s mt-5 line-1">
                                    {{ getUser(message.owner).username }}
                                    <div class="image-round ml-5" :style="{ backgroundImage: `url(${getUser(message.owner).picture ? getUser(message.owner).picture : ''})` }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-current-2xweak is-grape pv-40" v-if="images.length > 0">
            <div class="Wrapper Wrapper--xs text-center">
                <p class="ft-title-xl color-current mb-20">Les images qui ont fait réagir</p>

                <image-line :items="images.slice(0, 3)" />
                <image-line class="mt-5" :items="images.slice(3, 6)" />
            </div>
        </div>

        <div class="bg-current-2xweak is-pineapple pv-40">
            <div class="Wrapper Wrapper--xs text-center">
                <p class="ft-title-2xl color-current mb-5">Les niveaux</p>

                <div class="max-width-m m-auto">
                    <p class="ft-m color-current mb-20">Les niveaux sont là dans le seul but de t'encourager à interagir avec la communauté mais ce n'est pas une compétition !</p>

                    <input-base
                        label="Chercher mon pseudo"
                        v-model="search"
                    />
                </div>

                <div class="row-xs text-left mt-20">
                    <div class="col-4 col-12@s mb-10" v-for="(member, i) in membersByPoints" :key="i">
                        <div class="fx-center ft-title-s bg-white br-s p-15">
                            <div class="round bg-current-xweak color-current fx-no-shrink mr-5">
                                {{ member.level }}
                            </div>

                            <div class="fx-grow ml-5 o-hidden">
                                <p class="ellipsis-1">{{ member.username }}</p>
                                <p class="ft-s">{{ member.pointsCount }} points</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { sortDate } from '@/utils/base-utils'
import { InputBase } from 'instant-coffee-core'

export default {
    name: 'DiscordPage',
    components: { InputBase },
    async fetch () {
        await this.$store.dispatch('user-discord/fetch', { query: {} })
        await this.$store.dispatch('discord-message/fetch', { query: {} })
    },
    data: () => ({
        search: '',
        offset: 0,
    }),
    created () {
    },
    computed: {
        currentMonth () {
            return this.$moment().add(this.offset, 'months').format('YYYYMM')
        },
        members () {
            let members = this.$store.getters['user-discord/find']()
            return this.mapCurrentMonth(members).filter(m => m.monthly > 0)
        },
        membersByPoints () {
            let members = this.$store.getters['user-discord/find']()

            return sortDate(members.map(m => ({ ...m, updatedAt: this.$moment(m) })), 'updatedAt').filter(m => (!this.search && m.pointsCount > 1) || (this.search && m.username.toLowerCase().includes(this.search.toLowerCase())))
        },
        gifs () {
            let gifs = this.$store.getters['discord-message/find']({ type: 'gif' })
            return this.mapCurrentMonth(gifs.filter(i => !i.content.includes('youtube.com')), 'pointsPerMonth', true).filter(i => i.monthly > 0)
        },
        messages () {
            let messages = this.$store.getters['discord-message/find']({ type: 'message' })

            return this.mapCurrentMonth(messages.filter(i => i.content), 'pointsPerMonth', true).map(m => ({
                ...m, content: m.content.replace(/(\<.*?\>)/g, '')
            })).filter(i => i.monthly > 0)
        },
        images () {
            let images = this.$store.getters['discord-message/find']({ type: 'image' })
            
            return this.mapCurrentMonth(images.filter(i => i.content), 'pointsPerMonth', true).filter(i => i.monthly > 0)
        }
    },
    mounted () {
     
    },
    methods: {
        mapCurrentMonth (items, value = 'messagesPerMonth', byLength = false) {
            return items.map(m => ({
                ...m,
                monthly: m[value] && m[value][this.currentMonth] ? (byLength ? m[value][this.currentMonth].length : m[value][this.currentMonth]) : 0
            })).sort((a, b) => b.monthly - a.monthly)
        },
        getUser (id) {
            return this.members.find(m => m._id == id)
        }
    }
}
</script>