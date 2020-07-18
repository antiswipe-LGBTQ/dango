<template>
    <div class="HomePage">
        <section class="HomePage_heading">
            <div class="Wrapper">
                <div class="row height-100">
                    <div class="col-6 d-flex fx-dir-column fx-justify-center">
                        <h1 class="HomePage_mainTitle">
                            l'humain au coeur <br><span class="ft-2xl">de la rencontre lgbtq+</span>
                        </h1>

                        <p class="mv-30 ft-m">Des rencontres en réel, dans une ambiance conviviale et des lieux originaux.</p>

                        <div>
                            <button-base>
                                Découvrir nos événements
                            </button-base>
                        </div>
                    </div>
                    <div class="col-6 p-relative">
                        <testimony-cards class="HomePage_testimonies" />
                    </div>
                </div>
            </div>
        </section>
        <section class="HomePage_images">

        </section>
        <section class="HomePage_events">
            <div class="Wrapper pv-50">
                

                <slider-simple>
                    <template slot="header">
                        <h2 class="ft-xl color-blueberry">
                            <b>Nos événements</b>
                        </h2>
                    </template>
                    <event-block class="width-s" v-for="event in events" :key="event.id" v-bind="event" />
                </slider-simple>
            </div>
        </section>
        <section class="pv-150">
        </section>
    </div>
</template>

<script>
    import TestimonyCards from '@/components/partials/testimony-cards'
    import SliderSimple from '@/components/interactive/SliderSimple'
    import EventBlock from '@/components/events/EventBlock.vue'

    export default {
        name: 'Homepage',
        components: { TestimonyCards, SliderSimple, EventBlock },
        data: () => ({
            events: [
                { id: 0, title: 'Welcome Party #1', location: 'La Felicità, Paris (75013)', images: ['https://media.timeout.com/images/105244852/630/472/image.jpg'] },
                { id: 1, title: 'Soirée jeux de société', location: 'Ground Control, Paris (75013)', images: ['https://www.groundcontrolparis.com/wp-content/uploads/2019/05/GC-ambiance-e1559046181352.jpg'] },
                { id: 2, title: 'Journée débats', location: 'Anticafé Beaubourg, Paris (75001)', images: ['https://static.lexpress.fr/medias_11719/w_2048,h_1146,c_crop,x_0,y_68/w_1000,h_563,c_fill,g_north/v1515402513/3471-anticafe_6000330.jpg'] },
                { id: 3, title: 'Jeudi des foodies', location: 'Kodawari Ramen, Paris (75001)', images: ['https://www.sortiraparis.com/images/80/86447/455747-kodawari-ramen-tsukiji-a-paris-les-photos-14.jpg'] },
                { id: 4, title: 'Pique-nique en plein air', location: 'Parc de Bercy, Paris (75001)', images: ['https://img.over-blog.com/600x397/2/89/06/71/PARCS-et-JARDINS/FRANCE/FRANCE-2/Paris-parc-de-Bercy-A--4-.JPG'] }
            ]
        })
    }
</script>