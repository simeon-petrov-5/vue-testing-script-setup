<script setup lang="ts">
  import { Ref } from 'vue';
  const showInfo: Ref<boolean> = ref(false);
  const person: any = {
    id: 10,
    name: 'Close Rick-counters of the Rick Kind',
    air_date: 'April 7, 2014',
    episode: 'S01E10',
    url: 'https://rickandmortyapi.com/api/episode/10',
    created: '2017-11-10T12:56:34.747Z'
  };

  const characters = [
    'https://rickandmortyapi.com/api/character/1',
    'https://rickandmortyapi.com/api/character/2',
    'https://rickandmortyapi.com/api/character/3',
    'https://rickandmortyapi.com/api/character/4',
    'https://rickandmortyapi.com/api/character/5',
    'https://rickandmortyapi.com/api/character/7',
    'https://rickandmortyapi.com/api/character/14',
    'https://rickandmortyapi.com/api/character/15',
    'https://rickandmortyapi.com/api/character/18',
    'https://rickandmortyapi.com/api/character/19',
    'https://rickandmortyapi.com/api/character/21',
    'https://rickandmortyapi.com/api/character/22',
    'https://rickandmortyapi.com/api/character/27',
    'https://rickandmortyapi.com/api/character/39',
    'https://rickandmortyapi.com/api/character/53',
    'https://rickandmortyapi.com/api/character/77',
    'https://rickandmortyapi.com/api/character/78',
    'https://rickandmortyapi.com/api/character/79',
    'https://rickandmortyapi.com/api/character/82',
    'https://rickandmortyapi.com/api/character/83',
    'https://rickandmortyapi.com/api/character/84',
    'https://rickandmortyapi.com/api/character/85',
    'https://rickandmortyapi.com/api/character/86',
    'https://rickandmortyapi.com/api/character/103',
    'https://rickandmortyapi.com/api/character/113',
    'https://rickandmortyapi.com/api/character/118',
    'https://rickandmortyapi.com/api/character/119',
    'https://rickandmortyapi.com/api/character/152',
    'https://rickandmortyapi.com/api/character/164',
    'https://rickandmortyapi.com/api/character/177',
    'https://rickandmortyapi.com/api/character/209',
    'https://rickandmortyapi.com/api/character/215',
    'https://rickandmortyapi.com/api/character/232',
    'https://rickandmortyapi.com/api/character/242',
    'https://rickandmortyapi.com/api/character/274',
    'https://rickandmortyapi.com/api/character/290',
    'https://rickandmortyapi.com/api/character/294',
    'https://rickandmortyapi.com/api/character/295',
    'https://rickandmortyapi.com/api/character/298',
    'https://rickandmortyapi.com/api/character/299',
    'https://rickandmortyapi.com/api/character/329',
    'https://rickandmortyapi.com/api/character/330',
    'https://rickandmortyapi.com/api/character/339',
    'https://rickandmortyapi.com/api/character/349',
    'https://rickandmortyapi.com/api/character/359',
    'https://rickandmortyapi.com/api/character/381',
    'https://rickandmortyapi.com/api/character/389',
    'https://rickandmortyapi.com/api/character/405',
    'https://rickandmortyapi.com/api/character/424',
    'https://rickandmortyapi.com/api/character/425',
    'https://rickandmortyapi.com/api/character/426',
    'https://rickandmortyapi.com/api/character/427',
    'https://rickandmortyapi.com/api/character/428',
    'https://rickandmortyapi.com/api/character/429',
    'https://rickandmortyapi.com/api/character/430',
    'https://rickandmortyapi.com/api/character/431',
    'https://rickandmortyapi.com/api/character/432',
    'https://rickandmortyapi.com/api/character/433',
    'https://rickandmortyapi.com/api/character/434',
    'https://rickandmortyapi.com/api/character/663'
  ];

  const onMoreInfo = () => {
    showInfo.value = !showInfo.value;
  };
</script>

<template>
  <h2 class="pageTitle text-center mt-6">Listing data from local state</h2>

  <section class="mt-10 mb-12">
    <ul class="grid gap-x-3 grid-cols-2 lg:w-3/4">
      <li v-for="field in person" :key="field">
        <span> {{ field }}: {{ person[field] }} </span>
      </li>
    </ul>
  </section>

  <button class="moreInfo" @click="onMoreInfo">showInfo</button>

  <div v-if="showInfo">
    <h2>More info: Character links</h2>
    <ul>
      <li v-for="character in characters" :key="character">
        {{ character }}
      </li>
    </ul>
  </div>
</template>
