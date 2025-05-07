import type { UploaderItem } from '@/types/UploaderItem.ts';
import { MultiUploaderOptions } from '@/useMultiUploader.ts';
import dush, { Emitter } from 'dush';

export type UploaderEvents = {
  'change': (items: UploaderItem[]) => void;
  'delete-item': (item: UploaderItem) => void;
  'uploading': () => void;
  'uploaded': () => void;
  'create-item': (item: UploaderItem) => void;
  'item-upload-start': (item: UploaderItem, xhr: XMLHttpRequest, data: FormData) => void;
  'item-upload-success': (item: UploaderItem, xhr: XMLHttpRequest) => void;
  'item-upload-fail': (item: UploaderItem, xhr: XMLHttpRequest) => void;
  'item-upload-end': (item: UploaderItem, xhr: XMLHttpRequest) => void;
  'item-upload-progress': (item: UploaderItem, event: ProgressEvent) => void;
  'invalid-file': (e: Error) => void;
}

export type OptionsEventsMap = {
  onChange?: UploaderEvents['change'];
  onDeleteItem?: UploaderEvents['delete-item'];
  onUploading?: UploaderEvents['uploading'];
  onUploaded?: UploaderEvents['uploaded'];
  onItemUploadStart?: UploaderEvents['item-upload-start'];
  onItemUploadSuccess?: UploaderEvents['item-upload-success'];
  onItemUploadFail?: UploaderEvents['item-upload-fail'];
  onItemUploadEnd?: UploaderEvents['item-upload-end'];
  onItemUploadProgress?: UploaderEvents['item-upload-progress'];
  onInvalidFile?: UploaderEvents['invalid-file'];
}

export const uploaderEvents: Record<keyof UploaderEvents, string> = {
  'change': 'onChange',
  'delete-item': 'onDeleteItem',
  'uploading': 'onUploading',
  'uploaded': 'onUploaded',
  'create-item': 'onCreateItem',
  'item-upload-start': 'onItemUploadStart',
  'item-upload-success': 'onItemUploadSuccess',
  'item-upload-fail': 'onItemUploadFail',
  'item-upload-end': 'onItemUploadEnd',
  'item-upload-progress': 'onItemUploadProgress',
  'invalid-file': 'onInvalidFile',
};

export function handleEvents(options: MultiUploaderOptions): Emitter {
  const eventBus = dush();

  for (const eventName in uploaderEvents) {
    const optionName = uploaderEvents[eventName as keyof UploaderEvents];

    if (optionName && options[optionName as keyof MultiUploaderOptions]) {
      // @ts-ignore
      eventBus.on(eventName, options[optionName as keyof MultiUploaderOptions]);
    }
  }

  return eventBus;
}
