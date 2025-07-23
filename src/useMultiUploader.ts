import { UploadState } from '@/enum/UploadState';
import { InvalidFileSizeError, InvalidFileTypeError } from '@/errors.ts';
import { handleEvents, OptionsEventsMap } from '@/events.ts';
import { handleDropzoneDragging, openFileSelectorForAdding, isImage, isImageItem } from '@/helpers.ts';
import { MaybePromise } from '@/types/promise';
import type { UploaderItem } from '@/types/UploaderItem.ts';
import useQueue from '@/useQueue';
import { MaybeElement, unrefElement, wrapRef, wrapUploaderItem } from '@/utils.ts';
import { uid } from '@lyrasoft/ts-toolkit/src/generic';
import { Emitter } from 'dush';
import { computed, type MaybeRef, type MaybeRefOrGetter, reactive, type Ref, type ComputedRef, watch } from 'vue';

export type MultiUploaderOptions = {
  id?: MaybeRefOrGetter<string | undefined>;
  accept?: MaybeRefOrGetter<string | undefined>;
  maxFiles?: MaybeRefOrGetter<number | undefined>;
  maxConcurrent?: MaybeRefOrGetter<number | undefined>;
  maxItemSize?: MaybeRefOrGetter<number | undefined>;
  disabled?: MaybeRefOrGetter<boolean | undefined>;
  readonly?: MaybeRefOrGetter<boolean | undefined>;
  dropzone?: MaybeRefOrGetter<MaybeElement>;
  onDragClass?: MaybeRefOrGetter<string>;
  autoStart?: MaybeRefOrGetter<boolean>;
  inputName?: MaybeRefOrGetter<string>;
  headers?: MaybeRef<Record<string, any> | (() => Record<string, any>)>;
  data?: MaybeRef<Record<string, any> | (() => Record<string, any>)>;
  prepareXhr?: (xhr: XMLHttpRequest) => MaybePromise<XMLHttpRequest | void>;
} & Partial<OptionsEventsMap>;

export function useMultiUploader<T extends MultiUploaderOptions>(
  currentValue: MaybeRef<Partial<UploaderItem>[]>,
  uploadTarget: MaybeRefOrGetter<string>,
  options: T = {} as T,
): MultiUploaderComposableInstance {
  // Options
  const id = wrapRef(options.id ?? 'vue-multi-uploader-' + uid()) as Ref<string>;
  const accept = wrapRef(options.accept ?? '') as Ref<string>;
  const maxFiles = wrapRef(options.maxFiles) as Ref<T['maxFiles'] extends number ? number : undefined>;
  const maxConcurrent = wrapRef(options.maxConcurrent ?? 2) as Ref<number>;
  const maxItemSize = wrapRef(options.maxItemSize) as Ref<T['maxItemSize'] extends number ? number : undefined>;
  const disabled = wrapRef(options.disabled ?? false) as Ref<boolean>;
  const readonly = wrapRef(options.readonly ?? false) as Ref<boolean>;
  const uploadUrl = wrapRef(uploadTarget) as Ref<string>;
  const dropzone = computed<MaybeElement>(() => {
    return (wrapRef(options.dropzone).value) as MaybeElement;
  });
  const onDragClass = wrapRef(options.onDragClass ?? 'h-ondrag') as Ref<string>;
  const autoStart = wrapRef(options.autoStart ?? true) as Ref<boolean>;
  const inputName = wrapRef(options.inputName ?? 'file') as Ref<string>;
  const headers = wrapRef(options.headers ?? {}) as Ref<Record<string, any>>;
  const data = wrapRef(options.data ?? {}) as Ref<Record<string, any>>;

  // Base
  let items = wrapRef<Partial<UploaderItem>[]>(currentValue) as Ref<UploaderItem[]>;
  items.value = items.value.map(
    (item) => wrapUploaderItem(item, { uploadState: UploadState.UPLOADED }),
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
    openFileSelectorForAdding(accept, addFiles);
  }

  // Drag & Drop
  watch(dropzone, () => {
    const el = unrefElement(dropzone.value);

    if (el && el instanceof HTMLElement) {
      bindDraggingEvents(el);
    }
  }, { immediate: true });

  function bindDraggingEvents(el: HTMLElement) {
    handleDropzoneDragging(el, onDragClass, addFiles);
  }

  function addFile(file: File): UploaderItem {
    return addItem(createItem(file));
  }

  function createItem(file: File): UploaderItem {
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

    return item;
  }

  function addItem(item: UploaderItem) {
    const wrappedItem = reactive(wrapUploaderItem({
      key: uid(),
      uploadState: UploadState.PENDING,
      progress: 0,
    }, item));

    if (!item.file) {
      return item;
    }

    checkFile(item.file!);

    if (maxItemSize.value != null) {
      if (item.file!.size > maxItemSize.value) {
        const e = new InvalidFileSizeError(
          'File size is too large',
          item.file,
          maxItemSize.value
        );
        emits('invalid-file', e);
        throw e;
      }
    }

    const i = items.value.push(wrappedItem);

    const addedItem = items.value[i - 1];

    // Read preview image
    if (isImageItem(addedItem)) {
      const reader = new FileReader;
      reader.onload = (event) => {
        addedItem.thumbUrl = String(event.target?.result);
      };

      reader.readAsDataURL(item.file);
    }

    return addedItem;
  }

  function addFiles(files: FileList | File[]) {
    // Pre-check all files to block whole task if anyone is invalid.
    Array.prototype.forEach.call(files, checkFile);

    // Now start loop all files to upload.
    Array.prototype.forEach.call(files, file => {
      // checkFile(file);

      if (!canUpload.value) {
        return;
      }

      const v = addFile(file);

      if (autoStart.value) {
        enqueueUploadFile(v);
      }
    });
  }

  function stopItemUpload(item: UploaderItem | XMLHttpRequest) {
    if (item instanceof XMLHttpRequest) {
      item.abort();
      return;
    }

    item.xhr?.abort();
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
        const e = new InvalidFileTypeError(
          'Invalid file type',
          file,
          accepted
        );

        emits('invalid-file', e);
        throw e;
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
        promises.push(enqueueUploadFile(item));
      }
    });

    return Promise.allSettled(promises);
  }

  async function enqueueUploadFile(item: UploaderItem) {
    return uploadQueue.push(() => {
      return uploadFile(item);
    });
  }

  async function uploadFile(item: UploaderItem) {
    item.uploadState = UploadState.UPLOADING;
    item.error = undefined;

    const formData = new FormData();

    for (const k in data.value) {
      formData.append(k, data.value[k]);
    }
    formData.append(inputName.value, item.file!);

    let xhr = new XMLHttpRequest();

    xhr.open('POST', uploadUrl.value);

    for (const k in headers.value) {
      xhr.setRequestHeader(k, headers.value[k]);
    }

    if (options.prepareXhr) {
      xhr = await options.prepareXhr(xhr) ?? xhr;
    }

    const promise = new Promise<UploaderItem>((resolve, reject) => {
      emits('item-upload-start', item, xhr, formData);

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
            item.error = parseError as Error;

            reject(parseError);
          }
        } else {
          const errorMessage = `Upload failed with status: ${xhr.status}`;
          const e = new Error(errorMessage);
          console.error(e);

          item.uploadState = UploadState.ERROR;
          item.error = e;

          reject(e);
        }
      };

      xhr.onerror = () => {
        const errorMessage = 'An error occurred during the upload.';
        console.error(errorMessage);

        item.uploadState = UploadState.ERROR;
        item.error = new Error(errorMessage);

        reject(item.error);
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

  // File Sizes
  const totalSize = computed(() => {
    return items.value.reduce((acc, item) => {
      if (item.file) {
        acc += item.file.size;
      }

      return acc;
    }, 0);
  });

  return {
    id,
    accept,
    maxFiles,
    maxConcurrent,
    maxItemSize,
    disabled,
    readonly,
    uploadUrl,
    items,
    eventBus,
    canUpload,
    isUploading,
    acceptedTypes,
    isReadonly,
    totalSize,

    emits,
    on,
    openFileSelector,
    addFile,
    addItem,
    createItem,
    deleteItem,
    uploadStart,
    stopItemUpload,
    isImageItem,
    isImage,
  };
}

export type MultiUploaderComposableInstance = {
  id: Ref<string>;
  accept: Ref<string>;
  maxFiles: Ref<number | undefined>;
  maxConcurrent: Ref<number>;
  maxItemSize: Ref<number | undefined>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  uploadUrl: Ref<string>;
  items: Ref<UploaderItem[]>;
  eventBus: Emitter;

  // Computed
  canUpload: ComputedRef<boolean>;
  isUploading: ComputedRef<boolean>;
  acceptedTypes: ComputedRef<string[]>;
  isReadonly: ComputedRef<boolean>;
  totalSize: ComputedRef<number>;

  emits: (event: string, ...args: any[]) => void;
  on: (event: string, callback: (...event: any[]) => void) => () => void;
  openFileSelector: () => void;
  addFile: (file: File) => UploaderItem;
  addItem: (item: UploaderItem) => UploaderItem;
  createItem: (file: File) => UploaderItem;
  deleteItem: (child: UploaderItem) => void;
  uploadStart: () => Promise<PromiseSettledResult<UploaderItem>[]>;
  stopItemUpload: (item: UploaderItem | XMLHttpRequest) => void;
  isImage: (filePath: string) => boolean;
  isImageItem: (item: UploaderItem) => boolean;
}
