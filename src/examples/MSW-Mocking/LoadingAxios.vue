<script setup lang="ts">
  import axios from 'axios';
  import { Ref } from 'vue';
  const isLoading: Ref<boolean> = ref(true);
  const caracters: Ref<any[]> = ref([]);

  onBeforeMount(async () => {
    const resp = await axios.get('https://rickandmortyapi.com/api/character');
    caracters.value = resp.data.results;
    isLoading.value = false;

    console.log('after the load', caracters.value.length, 'is loading', isLoading.value);
  });
</script>

<template>
  <h1>Dummy Loading page</h1>
  <p v-if="isLoading">Page is loading</p>
  <ul>
    <li v-for="character in caracters" :key="character.id">
      {{ character.name }}
    </li>
  </ul>
</template>
