import { UploadState } from '@/enum/UploadState';
import type { UploaderItem } from '@/types/UploaderItem.ts';
import useQueue from '@/useQueue';
import { uid } from '@lyrasoft/ts-toolkit/src/generic';
import dush, { Emitter } from 'dush';
import {
  type ComponentPublicInstance,
  computed,
  isRef,
  type MaybeRef,
  type MaybeRefOrGetter,
  reactive,
  ref,
  type Ref,
  watch
} from 'vue';

type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null;

export type MultiUploaderOptions = {
  id?: MaybeRefOrGetter<string | undefined>;
  accept?: MaybeRefOrGetter<string | undefined>;
  maxFiles?: MaybeRefOrGetter<number | undefined>;
  maxConcurrent?: MaybeRefOrGetter<number | undefined>;
  disabled?: MaybeRefOrGetter<boolean | undefined>;
  readonly?: MaybeRefOrGetter<boolean | undefined>;
  dropzone?: MaybeRefOrGetter<MaybeElement>;
  onDragClass?: MaybeRefOrGetter<string>;
  autoStart?: MaybeRefOrGetter<boolean>;
} & Partial<OptionsEventsMap>;

export type UploaderEvents = {
  'change': (items: UploaderItem[]) => void;
  'delete-item': (item: UploaderItem) => void;
  'uploading': () => void;
  'uploaded': () => void;
  'create-item': (item: UploaderItem) => void;
  'item-upload-start': (item: UploaderItem, xhr: XMLHttpRequest) => void;
  'item-upload-success': (item: UploaderItem, xhr: XMLHttpRequest) => void;
  'item-upload-fail': (item: UploaderItem, xhr: XMLHttpRequest) => void;
  'item-upload-end': (item: UploaderItem, xhr: XMLHttpRequest) => void;
  'item-upload-progress': (item: UploaderItem, event: ProgressEvent) => void;
  'invalid-file-type': (file: File, accepted: string[]) => void;
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
  onInvalidFileType?: UploaderEvents['invalid-file-type'];
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
  'invalid-file-type': 'onInvalidFileType',
};

function handleEvents(options: MultiUploaderOptions): Emitter {
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

export function useMultiUploader<T extends MultiUploaderOptions>(
  currentValue: MaybeRef<Partial<UploaderItem>[]>,
  uploadTarget: MaybeRefOrGetter<string>,
  options: T = {} as T
): MultiUploaderComposableInstance {
  // Options
  const id = wrapRef(options.id ?? 'vue-multi-uploader-' + uid()) as Ref<string>;
  const accept = wrapRef(options.accept ?? '') as Ref<string>;
  const maxFiles = wrapRef(options.maxFiles) as Ref<T['maxFiles'] extends number ? number : undefined>;
  const maxConcurrent = wrapRef(options.maxConcurrent ?? 2) as Ref<number>;
  const disabled = wrapRef(options.disabled ?? false) as Ref<boolean>;
  const readonly = wrapRef(options.readonly ?? false) as Ref<boolean>;
  const uploadUrl = wrapRef(uploadTarget) as Ref<string>;
  const dropzone = computed<MaybeElement>(() => {
    return (wrapRef(options.dropzone).value) as MaybeElement;
  });
  const onDragClass = wrapRef(options.onDragClass ?? 'h-ondrag') as Ref<string>;
  const autoStart = wrapRef(options.autoStart ?? false) as Ref<boolean>;

  // Base
  let items = wrapRef<Partial<UploaderItem>[]>(currentValue) as Ref<UploaderItem[]>;
  items.value = items.value.map(
    (item) => wrapUploaderItem(item, { uploadState: UploadState.UPLOADED })
  );

  const uploadQueue = useQueue();

  // Events
  const eventBus = handleEvents(options);

  watch(maxConcurrent, (max) => {
    uploadQueue.maxRunning = max;
  }, { immediate: true });

  function emits(event: string, ...args: any[]) {
    return eventBus.emit(event, ...args);
  }

  function on(event: string, callback: (...event: any[]) => void) {
    eventBus.on(event, callback);

    return () => {
      eventBus.off(event, callback);
    };
  }

  function openFileSelector() {
    const $input = document.createElement('input');
    $input.id = 'multi-uploader-selector';
    $input.type = 'file';
    $input.accept = accept.value;
    $input.multiple = true;
    $input.style.display = 'none';

    $input.addEventListener('change', () => {
      const files = $input.files!;
      uploadFiles(files);

      $input.remove();
    });

    $input.addEventListener('change', () => {
      $input.remove();
    });

    $input.addEventListener('blur', () => {
      $input.remove();
    });

    document.body.appendChild($input);

    $input.dispatchEvent(
      new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      })
    );
  }

  // Drag & Drop
  watch(dropzone, () => {
    const el = unrefElement(dropzone.value);

    if (el && el instanceof HTMLElement) {
      bindDraggingEvents(el);
    }
  }, { immediate: true });

  function bindDraggingEvents(el: HTMLElement) {
    // @ts-ignore
    if (el.__dragging_events) {
      return;
    }

    el.addEventListener('dragover', (event) => {
      event.stopPropagation();
      event.preventDefault();

      el.classList.add(onDragClass.value);
    });

    el.addEventListener('dragleave', (event) => {
      event.stopPropagation();
      event.preventDefault();

      el.classList.remove(onDragClass.value);
    });

    // File drop
    el.addEventListener('drop', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      el.classList.remove(onDragClass.value);

      const items = event.dataTransfer?.items;
      const allEntries: File[] = [];

      // Use promise to recursively load files
      const getFilesRecursively = async (entry: FileSystemEntry): Promise<void> => {
        const promises: Promise<void>[] = [];
        // const length = entries.length;

        if (entry.isDirectory) {
          const dirReader = (entry as FileSystemDirectoryEntry).createReader();

          dirReader.readEntries((entries) => {
            entries.forEach((ent) => {
              promises.push(getFilesRecursively(ent));
            });
          });
        } else {
          promises.push(new Promise((resolve) => {
            (entry as FileSystemFileEntry).file((file: File) => {
              allEntries.push(file);
              resolve();
            });
          }));
        }

        await Promise.all(promises);
      };

      const promises: Promise<void>[] = [];
      Array.prototype.forEach.call(items ?? [], (item: DataTransferItem) => {

        const entry = item.webkitGetAsEntry();

        if (entry) {
          promises.push(getFilesRecursively(entry));
        }
      });

      if (promises.length) {
        Promise.all(promises).then(() => {
          uploadFiles(allEntries);
        });
      }
    });

    // @ts-ignore
    el.__dragging_events = true;
  }

  function uploadFiles(files: FileList | File[]) {
    // Pre check all files to block whole task if anyone is invalid.
    Array.prototype.forEach.call(files, checkFile);

    // Now start loop all files to upload.
    Array.prototype.forEach.call(files, file => {
      // checkFile(file);

      if (!canUpload.value) {
        return;
      }

      const url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      const item = reactive<UploaderItem>(wrapUploaderItem({
        key: uid(),
        url,
        file,
        uploadState: UploadState.PENDING,
        progress: 0,
      }));

      item.title = item.title || item.file!.name;

      eventBus.emit('create-item', item);

      const i = items.value.push(item);
      const v = items.value[i - 1];

      if (autoStart.value) {
        uploadFile(v);
      }

      // Read preview image
      if (isImageItem(item)) {
        const reader = new FileReader;
        reader.onload = (event) => {
          item.thumbUrl = String(event.target?.result);
        };

        reader.readAsDataURL(file);
      }
    });
  }

  function checkFile(file: File) {
    const accepted = acceptedTypes.value;
    const fileExt = file.name.split('.').pop();

    if (accepted.length) {
      let allow = false;

      accepted.forEach((type: string) => {
        if (allow) {
          return;
        }

        if (type.indexOf('/') !== -1) {
          if (compareMimeType(type, file.type)) {
            allow = true;
          }
        } else {
          if (type.toLowerCase() === fileExt?.toLowerCase()) {
            allow = true;
          }
        }
      });

      if (!allow) {
        emits('invalid-file-type', file, accepted);
        throw new Error('Not accepted file ext');
      }
    }
  }

  function compareMimeType(accepted: string, mime: string) {
    const accepted2 = accepted.split('/');
    const mime2 = mime.split('/');

    if (accepted2[1] === '*') {
      return accepted2[0] === mime2[0];
    }

    return accepted === mime;
  }

  function deleteItem(child: UploaderItem) {
    emits('delete-item', child);

    items.value = items.value.filter(item => item.key !== child.key);
  }

  async function uploadStart() {
    const promises: Promise<UploaderItem>[] = [];

    items.value.forEach((item) => {
      if (item.uploadState === UploadState.PENDING) {
        promises.push(uploadFile(item));
      }
    });

    return Promise.allSettled(promises);
  }

  async function uploadFile(item: UploaderItem) {
    item.uploadState = UploadState.UPLOADING;

    const formData = new FormData();
    formData.append('file', item.file!);

    const promise = new Promise<UploaderItem>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      emits('item-upload-start', item, xhr);

      xhr.open('POST', uploadUrl.value);

      xhr.upload.onprogress = (event: ProgressEvent) => {
        if (event.lengthComputable) {
          item.progress = event.loaded / event.total;
          emits('item-upload-progress', item, event);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            item.uploadState = UploadState.UPLOADED;

            emits('item-upload-success', item, xhr);

            resolve(item);
          } catch (parseError) {
            console.error(parseError);
            item.uploadState = UploadState.ERROR;
            item.message = (parseError as Error).message;
            item.messageType = 'error';

            reject(parseError);
          }
        } else {
          const errorMessage = `Upload failed with status: ${xhr.status}`;
          console.error(errorMessage);

          item.uploadState = UploadState.ERROR;
          item.message = errorMessage;
          item.messageType = 'error';

          reject(new Error(errorMessage));
        }
      };

      xhr.onerror = () => {
        const errorMessage = 'An error occurred during the upload.';
        console.error(errorMessage);

        item.uploadState = UploadState.ERROR;
        item.message = errorMessage;
        item.messageType = 'error';

        reject(new Error(errorMessage));
      };

      xhr.onloadend = () => {
        // item.file = undefined;
        emits('item-upload-end', item, xhr);
      };

      xhr.send(formData);
    });

    return promise.catch((error) => {
      emits('item-upload-fail', item, error);

      return Promise.reject(error);
    });
  }

  // Images
  function isImageItem(item: UploaderItem) {
    return isImage(
      item.file
        ? item.file.name
        : item.url
    );
  }

  function isImage(filePath: string) {
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

  // Computed
  const canUpload = computed(() => {
    return (maxFiles.value == null || items.value.length < Number(maxFiles.value)) && !isReadonly.value;
  });

  const isUploading = computed(() => {
    const uploadingItems = items.value.filter(item => item.uploadState === UploadState.UPLOADING);

    return uploadingItems.length > 0;
  });

  const acceptedTypes = computed(() => {
    return (Array.isArray(accept.value) ? accept.value : accept.value.split(','))
      .map(v => v.trim())
      .filter(v => v.length > 0)
      .map(v => {
        if (v.indexOf('/') === -1 && v[0] === '.') {
          return v.substr(1);
        }

        return v;
      });
  });

  const isReadonly = computed(() => {
    return disabled.value || readonly.value;
  });

  // Watch
  watch(items, (val) => {
    val.map(item => {
      item.key = item.key || uid();
    });

    // if (JSON.stringify(val) !== JSON.stringify(items.value)) {
    //   items.value = val;
    //   emits('change', items);
    // }

    emits('change', items);
  }, { deep: true });

  // watch(items, (items) => {
  //   emits('change', items);
  // }, { deep: true });

  watch(isUploading, (val) => {
    if (val) {
      emits('uploading');
    } else {
      emits('uploaded');
    }
  });

  return {
    id,
    accept,
    maxFiles,
    maxConcurrent,
    disabled,
    readonly,
    uploadUrl,
    items,
    eventBus,
    canUpload,
    isUploading,
    acceptedTypes,
    isReadonly,

    emits,
    on,
    openFileSelector,
    deleteItem,
    uploadStart,
    isImageItem,
    isImage,
  };
}

export type MultiUploaderComposableInstance = {
  id: Ref<string>;
  accept: Ref<string>;
  maxFiles: Ref<number | undefined>;
  maxConcurrent: Ref<number>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  uploadUrl: Ref<string>;
  items: Ref<UploaderItem[]>;
  eventBus: Emitter;
  canUpload: Ref<boolean>;
  isUploading: Ref<boolean>;
  acceptedTypes: Ref<string[]>;
  isReadonly: Ref<boolean>;

  emits: (event: string, ...args: any[]) => void;
  on: (event: string, callback: (...event: any[]) => void) => () => void;
  openFileSelector: () => void;
  deleteItem: (child: UploaderItem) => void;
  uploadStart: () => Promise<PromiseSettledResult<UploaderItem>[]>;
  isImage: (filePath: string) => boolean;
  isImageItem: (item: UploaderItem) => boolean;
}

function unrefElement(el: MaybeElement): HTMLElement | SVGElement | null {
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

export function wrapRef<T>(value: MaybeRef<T>): Ref<T> {
  if (typeof value === 'function') {
    value = ref((value as Function)());
  }

  return (isRef(value) ? value : ref(value)) as Ref<T>;
}
