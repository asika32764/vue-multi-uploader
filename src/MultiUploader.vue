<script setup lang="ts">
import type { UploaderItem } from '@/types/UploaderItem.ts';
import { type MultiUploaderEmits, uploaderEvents } from '@/events.ts';
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

const container = useTemplateRef('uploader');
props.options.dropzone = props.options.dropzone ?? container;

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
  <div ref="uploader" class="vue-drag-uploader"
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
