<template>
    <div class="Homepage_about">
        <div class="row row-no-gutters fx-align-start d-block@s">
            <div class="col-6 col-12@s">
                <div class="Homepage_aboutContent">
                    <h1 class="ft-title-3xl color-cherry mb-40 text-center@s ft-title-2xl@xs">
                        <b>L'association</b>
                    </h1>

                    <div class="row row--l d-block@xs">
                        <div class="col-4 text-center col-12@xs">
                            <p class="Homepage_aboutNumber ft-bold color-cherry">+70</p>
                            <p class="ft-s ph-5 m-auto width-2xs@xs">événements réussis depuis juin 2019</p>
                        </div>

                        <div class="col-4 text-center col-12@xs mt-20@xs">
                            <p class="Homepage_aboutNumber color-cherry">7</p>
                            <p class="ft-s ph-5 m-auto width-2xs@xs">organisatrices & organisateurs plus motivé(e)s que jamais</p>
                        </div>

                        <div class="col-4 text-center col-12@xs mt-20@xs">
                            <div class="Homepage_aboutNumber Homepage_aboutNumber--animated color-cherry">
                                <scroller-text class="Homepage_aboutCounter" :speed="400" :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]" />
                                <scroller-text class="Homepage_aboutCounter" :speed="380" :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" />
                                <scroller-text class="Homepage_aboutCounter" :speed="340" :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" />
                                <scroller-text class="Homepage_aboutCounter" :speed="300" :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" />
                            </div>
                            <p class="ft-s ph-5 m-auto width-2xs@xs">un nombre incalculable de très belles rencontres</p>
                        </div>
                    </div>

                    <p class="mt-40">Nous sommes une association à but lucratif. Cependant, pour couvrir certains de nos frais, nous proposons une <b>adhésion à 15€ / an pour les personnes qui souhaitent nous soutenir ou s’impliquer un peu plus dans le projet</b>.</p>
                    
                    <p class="mt-20">Cette adhésion est entièrement facultative : elle n’est pas obligatoire pour venir à nos événements.</p>

                    <div class="text-center@s">
                        <button-base class="mt-40" :modifiers="['secondary']" link="#">
                            Je soutiens le projet
                        </button-base>
                    </div>
                </div>
            </div>
            <div class="col-6 p-relative col-12@s">
                <div class="Homepage_aboutTeam">
                    <team-section />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TeamSection from '@/components/partials/home/team-section'
import ScrollerText from '@/components/interactive/ScrollerText'

export default {
    name: 'AboutSection',
    components: { TeamSection, ScrollerText }
}
</script>