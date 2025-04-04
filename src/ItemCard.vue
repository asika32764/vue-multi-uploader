<script setup lang="ts">

import { computed } from 'vue';
import { UploadState } from '@/enum/UploadState';
import type { UploaderItem } from '@/types/UploaderItem.ts';

const props = withDefaults(
  defineProps<{
    item: UploaderItem;
    i: number;
    size?: number | string;
    isReadonly?: boolean;
  }>(),
  {
    size: '150px'
  }
);

const emits = defineEmits<{
  (e: 'delete', item: UploaderItem): void;
  (e: 'item-click', item: UploaderItem, index: number, $event: MouseEvent): void;
}>();

const state = computed(() => props.item.uploadState);
const progress = computed(() => props.item.progress);

function deleteSelf() {
  if (props.isReadonly) {
    return;
  }

  emits('delete', props.item);
}

// Computed
const fileName = computed(() => {
  if (props.item.file) {
    return props.item.file.name;
  } else if (props.item.title) {
    return props.item.title;
  } else {
    return props.item.url.split('/').pop();
  }
});

const isImage = computed(() => {
  return isImageType(
    props.item.file
      ? props.item.file.name
      : props.item.url
  );
});


function isImageType(filePath: string) {
  const ext = filePath.split('.').pop()?.split('?').shift() || '';

  const allow = [
    'png',
    'jpeg',
    'jpg',
    'gif',
    'bmp',
    'webp',
  ];

  return allow.indexOf(ext.toLowerCase()) !== -1;
}

function onClick($event: MouseEvent) {
  emits('item-click', props.item, props.i, $event);
}

</script>

<template>
  <div class="vue-drag-uploader-item preview-img"
    :style="{ '--vmu-img-size': size }"
    @click="onClick">
    <slot name="it" :item="item">
      <div v-if="isImage" class="preview-img__body"
        :style="{'background-image': 'url(' + (item.thumbUrl || item.url) + ')', opacity: state === UploadState.UPLOADED ? 1 : 0.5}"></div>

      <div v-if="!isImage" class="preview-img__body d-flex flex-column justify-content-center align-items-center gap-2">
        <div>
          <slot name="icon" :item>
            <svg style="width: calc(var(--vmu-img-size) / 3); height: calc(var(--vmu-img-size) / 3);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"/></svg>
          </slot>
        </div>
        <div style="word-break: break-word">{{ fileName }}</div>
      </div>

      <div class="preview-img__overlay">
          <span v-if="!isReadonly" class="preview-img__remove-icon"
            @click.prevent="deleteSelf()">
            <slot name="remove-icon">
              <svg style="width: 1rem; height: 1rem; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </slot>
          </span>
        <slot name="extra" :item="item"></slot>
      </div>

      <div class="preview-img__progress" v-if="state === UploadState.UPLOADING">
        <div class="preview-img__progress-bar"
          :style="{width: (progress * 100) + '%'}"
        ></div>
      </div>
      <div class="preview-img__error-message error-message" v-if="state === UploadState.ERROR" @click.stop.prevent="">
        <span class="error-message__notice">Upload fail</span>
        <span class="error-message__message">{{ item.message }}</span>
      </div>
    </slot>
  </div>
</template>

<style scoped>

</style>
