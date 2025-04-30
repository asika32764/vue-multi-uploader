<script lang="ts">
import type { UploaderItem } from '@/types/UploaderItem.ts';

export interface MultiUploaderEmits {
  (e: 'update:modelValue', items: UploaderItem[]): void;
  (e: 'change', items: UploaderItem[]): void;
  (e: 'delete-item', item: UploaderItem): void;
  (e: 'uploading'): void;
  (e: 'uploaded'): void;
  (e: 'create-item', item: UploaderItem): void;
  (e: 'item-upload-start', item: UploaderItem, xhr: XMLHttpRequest): void;
  (e: 'item-upload-success', item: UploaderItem, xhr: XMLHttpRequest): void;
  (e: 'item-upload-fail', item: UploaderItem, xhr: XMLHttpRequest): void;
  (e: 'item-upload-end', item: UploaderItem, xhr: XMLHttpRequest): void;
  (e: 'item-upload-progress', item: UploaderItem, event: ProgressEvent): void;
  (e: 'invalid-file-type', file: File, accepted: string[]): void;
}
</script>

<script setup lang="ts">
import { uploaderEvents } from '@/events.ts';
import {
  type MultiUploaderComposableInstance,
  type MultiUploaderOptions,
  useMultiUploader,
} from '@/useMultiUploader';
import { onUnmounted, reactive, ref, useTemplateRef, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    id?: string;
    uploadUrl?: string;
    placeholder?: string;
    instance?: MultiUploaderComposableInstance;
    options?: Exclude<MultiUploaderOptions, 'uploadUrl'>
  }>(),
  {
    options: () => ({}),
  },
);

const emits = defineEmits<MultiUploaderEmits>();

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

const offEvents: (() => void)[] = [];

for (const eventName in uploaderEvents) {
  const off = instance.on(eventName, (...args: any[]) => {
    // @ts-ignore
    emits(eventName, ...args);
  });

  offEvents.push(off);
}

onUnmounted(() => {
  offEvents.forEach(off => off());
});

defineExpose<{
  instance: MultiUploaderComposableInstance;
}>({
  instance,
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
      ></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
