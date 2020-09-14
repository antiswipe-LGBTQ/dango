<template>
    <div class="Homepage_about">
        <div class="row fx-align-start">
            <div class="col-6">
                <div class="Homepage_aboutContent">
                    <h1 class="ft-title-3xl color-cherry mb-40">
                        <b>L'association</b>
                    </h1>

                    <p>Depuis sa création en juin 2019, antiswipe a organisé plus de <b>70 événements et a favorisé d’innombrables belles rencontres</b>. Nous sommes maintenant <b>7 organisateurs et organisatrices aux talents variés</b>, plus motivés que jamais !</p>

                    <p class="mt-20">Nous sommes une association à but lucratif. Cependant, pour couvrir certains de nos frais, nous proposons une <b>adhésion à 15€ / an pour les personnes qui souhaitent nous soutenir ou s’impliquer un peu plus dans le projet</b>.</p>
                    
                    <p class="mt-20">Cette adhésion est entièrement facultative : elle n’est pas obligatoire pour venir à nos événements.</p>

                    <button-base class="mt-40" :modifiers="['secondary']" link="#">
                        Je soutiens le projet
                    </button-base>
                </div>
            </div>
            <div class="col-6 p-relative">
                <div class="Homepage_aboutTeam">
                    <team-section />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TeamSection from '@/components/partials/home/team-section'

export default {
    name: 'AboutSection',
    components: { TeamSection }
}
</script>