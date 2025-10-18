import { UploadState } from '~/enum/UploadState.ts';
import type { UploaderItem } from '~/types/UploaderItem.ts';
import { uid } from '@lyrasoft/ts-toolkit/generic';
import type { MaybeRef, Ref } from 'vue';
import { ComponentPublicInstance, isRef, ref } from 'vue';

export type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null;

export function unrefElement(el: MaybeElement): HTMLElement | SVGElement | null {
  if (!el) {
    return null;
  }

  if ('$el' in el) {
    return el.$el;
  }

  return el;
}

export function wrapUploaderItem(item: Partial<UploaderItem>, extra?: Record<keyof UploaderItem, any>): UploaderItem {
  item.key ??= uid();
  item.uploadState ??= UploadState.PENDING;
  item.progress ??= 0;

  if (extra) {
    Object.assign(item, extra);
  }

  return item as UploaderItem;
}

export function createItem(item: Partial<UploaderItem>): UploaderItem {
  return wrapUploaderItem(item);
}

export function wrapRef<T>(value: MaybeRef<T>): Ref<T> {
  if (typeof value === 'function') {
    value = ref((value as Function)());
  }

  return (isRef(value) ? value : ref(value)) as Ref<T>;
}

export async function extractValue<T>(value: T | (() => T | Promise<T>)): Promise<T> {
  if (typeof value === 'function') {
    return (value as Function)();
  }

  return value;
}
