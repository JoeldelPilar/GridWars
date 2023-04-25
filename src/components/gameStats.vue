<template>
    <div class="result-info-container">
        <h3 class="hitter-color" :style="{ backgroundColor: props.hitterColor }">{{ props.hitterColor}}</h3>
        <h5>Killed</h5>
        <h3 class="hittee-color" :style="{ backgroundColor: props.hitteeColor }">{{ props.hitteeColor}}</h3>
    </div>

</template>

<script setup lang="ts">

const props = defineProps({
   hitterColor: String,
   hitteeColor: String,
})

</script>

<style scoped lang="scss">
.result-info-container {
    margin-bottom: 10px;
    width: 100%;
    height: 100%;
    padding: 0.2rem;
    h3 {
        text-align: center;
    }
    h5 {
        text-align: center;
    }
}
.hitter-color {
    background-color: v-bind(hitterColor);
    width: 100%;
    height: 5vh;
    text-align: center;
}

.hittee-color {
    background-color: v-bind(hitteeColor);
    width: 100%;
    height: 5vh;
    text-align: center;
}

</style>