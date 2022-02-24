<script setup lang="ts">
import { Ref } from 'vue';
import dataProvider from '../../dataProvider';
const isLoading: Ref<boolean> = ref(true);
const characters: Ref<any[]> = ref([]);

onBeforeMount(async () => {
  const caractersData = await dataProvider.loadCharacters();
  characters.value = caractersData.results;
  isLoading.value = false;

  console.log('after the load', characters.value.length, 'is loading', isLoading.value);
});
</script>

<template>
  <h1 class="pageTitle text-center mt-6">Loading with help of a dataProvider</h1>
  <p v-if="isLoading">Page is loading</p>
  <ul>
    <li v-for="character in characters" :key="character.id">
      {{ character.name }}
    </li>
  </ul>
</template>
