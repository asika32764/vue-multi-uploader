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

  }
);

const emits = defineEmits<{
  (e: 'push-upload-queue', fn: () => Promise<void>): void;
  (e: 'upload-start', uniqid: string): void;
  (e: 'upload-progress', uniqid: string, progress: number): void;
  (e: 'upload-end', uniqid: string): void;
  (e: 'delete', item: UploaderItem): void;
  (e: 'item-click', item: UploaderItem, index: number, $event: Event): void;
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

const icon = computed(() => {
  const ext = props.item.file
    ? props.item.file.name.split('.').pop()
    : props.item.url.split('.').pop();

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
});

function onClick($event: MouseEvent) {
  emits('item-click', props.item, props.i, $event);
}

</script>

<template>
  <div class="vue-drag-uploader__item preview-img"
    :style="{ width: size ? size + 'px' : undefined, height: size ? size + 'px' : undefined }"
    @click="onClick">
    <slot name="it" :item="item">
      <div v-if="isImage" class="preview-img__body"
        :style="{'background-image': 'url(' + (item.thumbUrl || item.url) + ')', opacity: state === UploadState.UPLOADED ? 1 : 0.5}"></div>

      <div v-if="!isImage" class="preview-img__body d-flex justify-content-center align-items-center">
        <div class="text-center">
          <div>
            <span :class="icon" class="fa-3x"></span>
          </div>
          <div style="word-break: break-word">{{ fileName }}</div>
        </div>
      </div>

      <div class="preview-img__overlay">
          <span v-if="!isReadonly" class="preview-img__remove-icon fa fa-times"
            @click.stop.prevent="deleteSelf()"></span>
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
