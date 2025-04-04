<script setup lang="ts">

import ShowCard from '@/docs/ShowCard.vue';
import ItemCard from '@/ItemCard.vue';
import ItemCardPlaceholder from '@/ItemCardPlaceholder.vue';
import MultiUploader from '@/MultiUploader.vue';
import { UploaderItem } from '@/types/UploaderItem.ts';
import { MultiUploaderOptions } from '@/useMultiUploader.ts';
import '@/vue-multi-uploader.scss';
import { ref } from 'vue';

const options: MultiUploaderOptions = {
  maxFiles: 5,
  onItemUploadSuccess(item, xhr) {
    const res = JSON.parse(xhr.responseText);

    item.url = res.url;
  },
};

const existingItems = ref([
  {
    url: 'https://example.com/example.pdf',
  },
  {
    url: 'https://example.com/example.docx',
  },
  {
    url: 'https://example.com/example.zip',
  },
  {
    url: 'https://example.com/example.pptx',
  },
]);

function fileIcon(item: UploaderItem) {
  const ext = item.file
    ? item.file.name.split('.').pop()
    : item.url.split('.').pop();

  const icons = {
    pdf: 'fas fa-file-pdf text-danger',
    xls: 'fas fa-file-excel text-success',
    xlsx: 'fas fa-file-excel text-success',
    doc: 'fas fa-file-word text-primary',
    docx: 'fas fa-file-word text-primary',
    ppt: 'fas fa-file-powerpoint text-warning',
    pptx: 'fas fa-file-powerpoint text-warning',
    zip: 'fas fa-file-archive text-dark',
    '7z': 'fas fa-file-archive text-dark',
    rar: 'fas fa-file-archive text-dark',
    mp4: 'fas fa-file-video text-dark',
    avi: 'fas fa-file-video text-dark',
    flv: 'fas fa-file-video text-dark',
    mov: 'fas fa-file-video text-dark',
    ogg: 'fas fa-file-video text-dark',
    webm: 'fas fa-file-video text-dark',
    mpg: 'fas fa-file-video text-dark',
    mp3: 'fas fa-file-audio text-dark',
    acc: 'fas fa-file-audio text-dark',
    wav: 'fas fa-file-audio text-dark',
  };

  return icons[String(ext).toLowerCase() as keyof typeof icons] || 'fas fa-file';
}

const code = `<\script setup lang="ts">

import {
  ItemCard,
  ItemCardPlaceholder,
  MultiUploader,
  type MultiUploaderOptions
} from 'vue-multi-uploader';
import 'vue-multi-uploader/dist/vue-multi-uploader.scss';
import { computed, ref } from 'vue';

const options: MultiUploaderOptions = {
  maxFiles: 5,
  onItemUploadSuccess(item, xhr) {
    const res = JSON.parse(xhr.responseText);

    item.url = res.url;
  },
};

const existingItems = ref([
  {
    url: 'https://example.com/example.pdf',
  },
  {
    url: 'https://example.com/example.docx',
  },
  {
    url: 'https://example.com/example.zip',
  },
  {
    url: 'https://example.com/example.pptx',
  },
]);

function fileIcon(item: UploaderItem) {
  const ext = item.file
    ? item.file.name.split('.').pop()
    : item.url.split('.').pop();

  const icons = {
    pdf: 'fas fa-file-pdf text-danger',
    xls: 'fas fa-file-excel text-success',
    xlsx: 'fas fa-file-excel text-success',
    doc: 'fas fa-file-word text-primary',
    docx: 'fas fa-file-word text-primary',
    ppt: 'fas fa-file-powerpoint text-warning',
    pptx: 'fas fa-file-powerpoint text-warning',
    zip: 'fas fa-file-archive text-dark',
    '7z': 'fas fa-file-archive text-dark',
    rar: 'fas fa-file-archive text-dark',
    mp4: 'fas fa-file-video text-dark',
    avi: 'fas fa-file-video text-dark',
    flv: 'fas fa-file-video text-dark',
    mov: 'fas fa-file-video text-dark',
    ogg: 'fas fa-file-video text-dark',
    webm: 'fas fa-file-video text-dark',
    mpg: 'fas fa-file-video text-dark',
    mp3: 'fas fa-file-audio text-dark',
    acc: 'fas fa-file-audio text-dark',
    wav: 'fas fa-file-audio text-dark',
  };

  return icons[String(ext).toLowerCase() as keyof typeof icons] || 'fas fa-file';
}

<\/script>

<template>
<MultiUploader ref="uploader" upload-url="/api/upload" v-model="existingItems" :options>
  <template #items="{ items, instance: { canUpload, openFileSelector, deleteItem } }">
    <div class="d-flex flex-wrap w-100 gap-3">
      <ItemCard v-for="(item, index) of items"
        :item
        :i="index"
        @delete="deleteItem"
      >
        <template #remove-icon>
          <span class="fa-solid fa-xmark text-white"></span>
        </template>

        <template #icon="{ item }">
          <span :class="fileIcon(item)" style="font-size: 2.5rem"></span>
        </template>
      </ItemCard>

      <ItemCardPlaceholder
        v-if="canUpload"
        class=""
        text="Click or drop to upload"
        @click="openFileSelector"
      >
        <template #icon>
          <span class="fa-solid fa-cloud-arrow-up" style="font-size: 2rem"></span>
        </template>
      </ItemCardPlaceholder>
    </div>
  </template>
</MultiUploader>
</template>

<style scoped>

</style>
`;


</script>

<template>
<ShowCard :code>
  <MultiUploader ref="uploader" upload-url="/api/upload" v-model="existingItems" :options>
    <template #items="{ items, instance: { canUpload, openFileSelector, deleteItem } }">
      <div class="d-flex flex-wrap w-100 gap-3">
        <ItemCard v-for="(item, index) of items"
          :item
          :i="index"
          @delete="deleteItem"
        >
          <template #remove-icon>
            <span class="fa-solid fa-xmark text-white"></span>
          </template>

          <template #icon="{ item }">
            <span :class="fileIcon(item)" style="font-size: 2.5rem"></span>
          </template>
        </ItemCard>

        <ItemCardPlaceholder
          v-if="canUpload"
          class=""
          text="Click or drop to upload"
          @click="openFileSelector"
        >
          <template #icon>
            <span class="fa-solid fa-cloud-arrow-up" style="font-size: 2rem"></span>
          </template>
        </ItemCardPlaceholder>
      </div>
    </template>
  </MultiUploader>
</ShowCard>
</template>

<style scoped>

</style>
