<script setup lang="ts">

import ShowCard from '@/docs/ShowCard.vue';
import ItemCard from '@/ItemCard.vue';
import ItemCardPlaceholder from '@/ItemCardPlaceholder.vue';
import MultiUploader from '@/MultiUploader.vue';
import { MultiUploaderOptions } from '@/useMultiUploader.ts';
import { uid } from '@lyrasoft/ts-toolkit/src/generic.ts';
import '@/vue-multi-uploader.scss';

const options: MultiUploaderOptions = {
  maxFiles: 5,
  onItemUploadSuccess(item, xhr) {
    const res = JSON.parse(xhr.responseText);

    item.url = res.url;
  },
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

const code = `<script setup lang="ts">
import {
  ItemCard,
  ItemCardPlaceholder,
  MultiUploader,
  MultiUploaderOptions
} from 'vue-multi-uploader';
import 'vue-multi-uploader/dist/vue-multi-uploader.scss';

const options: MultiUploaderOptions = {
  maxFiles: 5,
  onItemUploadSuccess(item, xhr) {
    const res = JSON.parse(xhr.responseText);

    item.url = res.url;
  },
};

const existingItems = [
  {
    url: 'https://picsum.photos/id/156/800/600?format=.jpg'
  },
  {
    url: 'https://picsum.photos/id/78/800/600?format=.jpg'
  }
];
<\/script>
<template>
<MultiUploader ref="uploader" upload-url="/api/upload" v-model="existingItems" :options>
  <template #items="{items, instance: {canUpload, openFileSelector, deleteItem}}">
    <div class="d-flex flex-wrap w-100 gap-3">
      <ItemCard v-for="(item, index) of items"
        :item
        :i="index"
        @delete="deleteItem"
      />

      <ItemCardPlaceholder
        v-if="canUpload"
        class=""
        text="Click or drop to upload"
        @click="openFileSelector"
      />
    </div>
  </template>
</MultiUploader>
</template>
`
</script>

<template>
<ShowCard :code>
  <MultiUploader ref="uploader" upload-url="/" v-model="existingItems" :options>
    <template #items="{ items, instance: { canUpload, openFileSelector, deleteItem } }">
      <div class="d-flex flex-wrap w-100 gap-3">
        <ItemCard v-for="(item, index) of items"
          :item
          :i="index"
          @delete="deleteItem"
        />

        <ItemCardPlaceholder
          v-if="canUpload"
          class=""
          text="Click or drop to upload"
          @click="openFileSelector"
        />
      </div>
    </template>
  </MultiUploader>
</ShowCard>
</template>

<style scoped>

</style>
