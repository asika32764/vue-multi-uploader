<script setup lang="ts">

import ShowCard from '@/docs/ShowCard.vue';
import { UploaderItem } from '@/types/UploaderItem.ts';
import { useMultiUploader } from '@/useMultiUploader.ts';
import { ref, useTemplateRef } from 'vue';

const dropzone = useTemplateRef('dropzone');

const items = ref<UploaderItem[]>([]);

const {
  openFileSelector,
  deleteItem
} = useMultiUploader(items, '/api/upload', {
  dropzone: dropzone,
  maxFiles: 5,
  onItemUploadSuccess(item, xhr) {
    const res = JSON.parse(xhr.responseText);
    item.url = res.url;
  },
});

const code = `<\script setup lang="ts">
import {
  type UploaderItem,
  useMultiUploader,
} from 'vue-multi-uploader';
import { ref, useTemplateRef } from 'vue';

const dropzone = useTemplateRef('dropzone');

const items = ref<UploaderItem[]>([]);

const {
  openFileSelector,
  deleteItem
} = useMultiUploader(items, '/api/upload', {
  dropzone: dropzone,
  maxFiles: 5,
  onItemUploadSuccess(item, xhr) {
    const res = JSON.parse(xhr.responseText);
    item.url = res.url;
  },
});

<\/script>

<template>
<div class="row">
  <div class="col-lg-6">
    <div class="list-group">
      <div class="list-group-item d-flex align-items-center gap-3" v-for="(item) of items" :key="item.key">
        <div>
          <span class="fa-solid fa-file" style="font-size: 2rem"></span>
        </div>
        <div class="flex-grow-1 text-truncate">
          <div class="text-truncate">
            {{ item.title }}
          </div>
          <div class="mt-2">
            <div class="progress progress-sm" style="height: 0.5rem">
              <div class="progress-bar" :style="{ width: (item.progress * 100) + '%' }"></div>
            </div>
          </div>
        </div>
        <div>
          <a href="#" class="link-dark"
            @click.prevent="deleteItem(item)">
            <span class="fas fa-trash"></span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-6">
    <div ref="dropzone" class="dropzone d-flex flex-column align-items-center justify-content-center"
      style="height: 300px; cursor: pointer;"
      @click="openFileSelector"
    >
      <div class="dropzone__content text-center">
        <span class="fa-solid fa-upload" style="font-size: 2rem"></span>
        <div>Click or drop to upload</div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.dropzone {
  border: 1px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: background-color 0.3s, border-color 0.3s;
}

.dropzone.h-ondrag {
  background-color: #e0f7fa;
  border-color: #007bff;
}
</style>
`;

</script>

<template>
<ShowCard :code>
  <div class="row">
    <div class="col-lg-6">
      <div class="list-group">
        <div class="list-group-item d-flex align-items-center gap-3" v-for="(item) of items" :key="item.key">
          <div>
            <span class="fa-solid fa-file" style="font-size: 2rem"></span>
          </div>
          <div class="flex-grow-1 text-truncate">
            <div class="text-truncate">
              {{ item.title }}
            </div>
            <div class="mt-2">
              <div class="progress progress-sm" style="height: 0.5rem">
                <div class="progress-bar" :style="{ width: (item.progress * 100) + '%' }"></div>
              </div>
            </div>
          </div>
          <div>
            <a href="#" class="link-dark"
              @click.prevent="deleteItem(item)">
              <span class="fas fa-trash"></span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6">
      <div ref="dropzone" class="dropzone d-flex flex-column align-items-center justify-content-center"
        style="height: 300px; cursor: pointer;"
        @click="openFileSelector"
      >
        <div class="dropzone__content text-center">
          <span class="fa-solid fa-upload" style="font-size: 2rem"></span>
          <div>Click or drop to upload</div>
        </div>
      </div>
    </div>
  </div>
</ShowCard>
</template>

<style scoped>
.dropzone {
  border: 1px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: background-color 0.3s, border-color 0.3s;
}

.dropzone.h-ondrag {
  background-color: #e0f7fa;
  border-color: #007bff;
}
</style>
