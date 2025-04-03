<script setup lang="ts">

import ShowCard from '@/docs/ShowCard.vue';
import { UploadState } from '@/enum/UploadState.ts';
import ItemCard from '@/ItemCard.vue';
import ItemCardPlaceholder from '@/ItemCardPlaceholder.vue';
import MultiUploader from '@/MultiUploader.vue';
import { MultiUploaderOptions } from '@/useMultiUploader.ts';
import { uid } from '@lyrasoft/ts-toolkit/src/generic.ts';

const options: MultiUploaderOptions = {
  maxFiles: 5
};

const existingItems = [
  {
    key: uid(),
    url: 'https://picsum.photos/id/156/800/600?format=.jpg'
  },
  {
    key: uid(),
    url: 'https://picsum.photos/id/78/800/600?format=.jpg'
  }
];
</script>

<template>
<ShowCard code="">
  <MultiUploader upload-url="." v-model="existingItems" :options>
    <template #items="{ items }">
      <ItemCard v-for="(item, index) of items"
        :item
        :i="index"
      />

      <ItemCardPlaceholder
        class="vue-drag-uploader__item"
        text="Click to upload"
      />
    </template>
  </MultiUploader>
</ShowCard>
</template>

<style scoped>

</style>
