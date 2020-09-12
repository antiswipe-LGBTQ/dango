<template>
    <div class="Homepage_about">
        <div class="row">
            <div class="col-6">
                <div class="Homepage_aboutContent">
                    <h1 class="ft-title-3xl color-cherry-weak mb-40">
                        <b>L'association</b>
                    </h1>

                    <p>Tu n'as pas trouvé ton bonheur ? Reste informé(e) : nous avons toujours des événements en préparation pour tous les goûts, et de belles surprises !</p>

                    <button-base class="mt-40" :modifiers="['secondary']" link="#">Découvrir l'association</button-base>
                </div>
            </div>
            <div class="col-6 p-relative">
                <team-section />
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