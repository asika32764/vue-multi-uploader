<script setup lang="ts">

import ShowCard from '@/docs/ShowCard.vue';
import ItemCard from '@/ItemCard.vue';
import ItemCardPlaceholder from '@/ItemCardPlaceholder.vue';
import MultiUploader from '@/MultiUploader.vue';
import { MultiUploaderOptions } from '@/useMultiUploader.ts';
import { ref } from 'vue';
import { UseDraggableOptions, VueDraggable } from 'vue-draggable-plus';
import '@/vue-multi-uploader.scss';

const options: MultiUploaderOptions = {
  maxFiles: 5,
  onItemUploadSuccess(item, xhr) {
    const res = JSON.parse(xhr.responseText);
    item.url = res.url;
  },
};

const existingItems = ref([
  {
    url: 'https://picsum.photos/id/156/800/600?format=.jpg'
  },
  {
    url: 'https://picsum.photos/id/78/800/600?format=.jpg'
  }
]);

const draggableOptions: UseDraggableOptions<any> = {
  draggable: '.item',
  animation: 300,
}

function onReorder() {
  // Handle reorder events
}

const code: string = `<\script setup lang="ts">

import {
  ItemCard,
  ItemCardPlaceholder,
  MultiUploader,
  type MultiUploaderOptions
} from 'vue-multi-uploader';
import 'vue-multi-uploader/dist/vue-multi-uploader.scss';
import { ref } from 'vue';
import { type UseDraggableOptions, VueDraggable } from 'vue-draggable-plus';
import '@/vue-multi-uploader.scss';

const options: MultiUploaderOptions = {
  maxFiles: 5,
  onItemUploadSuccess(item, xhr) {
    const res = JSON.parse(xhr.responseText);
    item.url = res.url;
  },
};

const existingItems = ref([
  {
    url: 'https://picsum.photos/id/156/800/600?format=.jpg'
  },
  {
    url: 'https://picsum.photos/id/78/800/600?format=.jpg'
  }
]);

const draggableOptions: UseDraggableOptions<any> = {
  draggable: '.item',
  animation: 300,
}

function onReorder() {
  // Handle reorder events
}
<\/script>

<template>
<MultiUploader ref="uploader" upload-url="/api/upload" v-model="existingItems" :options>
  <template #items="{ instance, instance: { canUpload, openFileSelector, deleteItem } }">
    <VueDraggable v-model="instance.items" v-bind="draggableOptions"
      @move="onReorder"
      class="d-flex flex-wrap w-100 gap-3"
    >
      <ItemCard v-for="(item, index) of instance.items"
        :key="item.key"
        class="item"
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
    </VueDraggable>
  </template>
</MultiUploader>
</template>`;

</script>

<template>
  <ShowCard :code>
    <MultiUploader ref="uploader" upload-url="/" v-model="existingItems" :options>
      <template #items="{ instance, instance: { canUpload, openFileSelector, deleteItem } }">
        <VueDraggable v-model="instance.items" v-bind="draggableOptions"
          @move="onReorder"
          class="d-flex flex-wrap w-100 gap-3"
        >
          <ItemCard v-for="(item, index) of instance.items"
            :key="item.key"
            class="item"
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
        </VueDraggable>
      </template>
    </MultiUploader>
  </ShowCard>
</template>

<style scoped>

</style>
