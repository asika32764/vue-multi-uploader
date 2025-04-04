<script setup lang="ts">
import { onUnmounted, reactive, ref, useTemplateRef, watch } from 'vue';
import { type MultiUploaderComposableInstance, MultiUploaderOptions, useMultiUploader } from '@/useMultiUploader';
import type { UploaderItem } from '@/types/UploaderItem.ts';

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
}, { deep: true });

const el = useTemplateRef('el');
props.options.dropzone = props.options.dropzone ?? el;

const instance = props.instance ?? useMultiUploader(v, props.uploadUrl ?? '', props.options);
const {
  isReadonly,
  items,
} = instance;

watch(items, () => {
  value.value = items.value;
}, { deep: true });

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

defineExpose<{
  instance: MultiUploaderComposableInstance;
}>({
  instance
});

</script>

<template>
  <div ref="el" class="vue-drag-uploader"
    :class="{ 'vue-drag-uploader--readonly': isReadonly }">
    <div class="vue-drag-uploader__wrapper">
      <slot name="items"
        :items
        :options
        :instance="reactive(instance)"
        @delete="() => console.log($event)"
      ></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
