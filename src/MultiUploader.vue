<script setup lang="ts">
import ItemCardPlaceholder from '@/ItemCardPlaceholder.vue';
import { onUnmounted, ref, watch } from 'vue';
import { type MultiUploaderComposableInstance, MultiUploaderOptions, useMultiUploader } from '@/useMultiUploader';
import type { UploaderItem } from '@/types/UploaderItem.ts';
import './vue-drag-uploader.scss';

const props = withDefaults(
  defineProps<{
    id?: string;
    uploadUrl?: string;
    placeholder?: string;
    instance?: MultiUploaderComposableInstance;
    options?: Exclude<MultiUploaderOptions, 'uploadUrl'>
  }>(),
  {
    options: () => ({})
  }
);

const emits = defineEmits<{
  (e: 'update:modelValue', value: UploaderItem[]): void;
  (e: 'delete-item', item: UploaderItem): void;
  (e: 'item-click', item: UploaderItem, index: number, $event: Event): void;
  (e: 'uploading'): void;
  (e: 'uploaded'): void;
  (e: 'reorder', event: any): void;
}>();

const value = defineModel<Partial<UploaderItem>[]>({
  default: () => [],
});

const v = ref<Partial<UploaderItem>[]>(value.value);

watch(value, () => {
  v.value = value.value;
});

const instance = props.instance ?? useMultiUploader(v, props.uploadUrl ?? '', props.options);
const {
  id,
  maxFiles,
  maxConcurrent,
  isReadonly,
  canUpload,
  items,
  eventBus,

  deleteItem,
  openFileSelector,

} = instance;

const offUploading = instance.on('uploading', () => {
  emits('uploading');
});

const offUploaded = instance.on('uploaded', () => {
  emits('uploaded');
});

const offDeleteItem = instance.on('delete-item', (item: UploaderItem) => {
  emits('delete-item', item);
});

onUnmounted(() => {
  offUploading();
  offUploaded();
  offDeleteItem();
});

</script>

<template>
  <div ref="el" class="vue-drag-uploader"
    :class="{ 'vue-drag-uploader--readonly': isReadonly }">
    <div class="vue-drag-uploader__wrapper">
      <slot name="items"
        :items
        :options
        :instance
      ></slot>

      <!--<VueDraggable-->
      <!--  v-model="items"-->
      <!--  class="vue-drag-uploader__draggable-wrapper"-->
      <!--  v-bind="{ draggable: '.preview-img', animation: 300 }"-->
      <!--  :disabled="isReadonly"-->
      <!--  @sort="$emit('reorder', $event)"-->
      <!--  item-key="key"-->
      <!--&gt;-->
      <!--  <template v-for="(item, index) of items" :key="item.key">-->
      <!--    <template #extra>-->
      <!--      <slot name="extra"-->
      <!--        :item-->
      <!--        :options-->
      <!--        :i="index"-->
      <!--      >-->
      <!--      </slot>-->
      <!--    </template>-->
      <!--  </template>-->
      <!--  -->
      <!--  -->
      <!--</VueDraggable>-->
    </div>
  </div>
</template>

<style scoped>

</style>
