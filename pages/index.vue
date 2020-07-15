<template>
    <div class="HomePage">
        <section class="HomePage_heading">
            <div class="Wrapper">
                <div class="row height-100">
                    <div class="col-6 d-flex fx-dir-column fx-justify-center">
                        <h1 class="HomePage_mainTitle">
                            l'humain au coeur <br><span class="ft-2xl">de la rencontre lgbtq+</span>
                        </h1>

                        <p class="mv-30">Des rencontres en réel, dans une ambiance conviviale et des lieux originaux.</p>

                        <!-- <button-base>
                            Découvrir nos événements
                        </button-base> -->
                    </div>
                    <div class="col-6 p-relative">
                        <testimony-cards class="HomePage_testimonies" />
                    </div>
                </div>
            </div>
        </section>
        <section class="HomePage_values">

        </section>
    </div>
</template>

<script>
    import TestimonyCards from '@/components/partials/testimony-cards'

    export default {
        name: 'Homepage',
        components: { TestimonyCards }
    }
</script>