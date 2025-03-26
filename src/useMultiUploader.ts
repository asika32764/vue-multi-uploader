import { simpleAlert, uid } from '@lyrasoft/ts-toolkit/src/generic';
import dush from 'dush';
import {
  type ComponentPublicInstance,
  computed, isRef,
  type MaybeRef,
  type MaybeRefOrGetter, reactive,
  ref,
  type Ref,
  watch
} from 'vue';
import useQueue from '@/useQueue';
import { UploadState } from '@/enum/UploadState';
import type { UploaderItemInstance } from '@/types/UploaderItemInstance.ts';

type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null;

export interface MultiUploaderOptions {
  id?: MaybeRefOrGetter<string | undefined>;
  accept?: MaybeRefOrGetter<string | undefined>;
  maxFiles?: MaybeRefOrGetter<number | undefined>;
  maxConcurrent?: MaybeRefOrGetter<number | undefined>;
  disabled?: MaybeRefOrGetter<boolean | undefined>;
  readonly?: MaybeRefOrGetter<boolean | undefined>;
  dropzone?: MaybeRefOrGetter<MaybeElement>;

  onChange?: (items: UploaderItemInstance[]) => void;
  onDeleteItem?: (item: UploaderItemInstance) => void;
  onItemClick?: (item: UploaderItemInstance, index: number, e: Event) => void;
  onUploading?: () => void;
  onUploaded?: () => void;
  onReorder?: (e: any) => void;
  onItemUploadStart?: (item: UploaderItemInstance) => void;
  onItemUploadEnd?: (item: UploaderItemInstance) => void;
  onItemUploadProgress?: (item: UploaderItemInstance) => void;
}

export function useMultiUploader<T extends MultiUploaderOptions>(
  files: MaybeRef<UploaderItemInstance[]>,
  uploadTarget: MaybeRefOrGetter<string>,
  options: T = {} as T
) {
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

  // Base
  const items = wrapRef<UploaderItemInstance[]>(files) as Ref<UploaderItemInstance[]>;
  const uploadQueue = useQueue();

  // Events
  const eventBus = handleEvents(options);

  watch(maxConcurrent, (max) => {
    uploadQueue.maxRunning = max;
  }, { immediate: true });

  function emits(event: string, ...args: any[]) {
    return eventBus.emit(event, ...args);
  }

  function openFileSelector() {
    const $input = document.createElement('input');
    $input.id = 'multi-uploader-selector';
    $input.type = 'file';
    $input.accept = accept.value;
    $input.multiple = true;
    $input.style.display = 'none';

    $input.addEventListener('change', (event: Event) => {
      const files = $input.files!;
      uploadFiles(files);

      $input.remove();
    });

    $input.addEventListener('change', (event) => {
      $input.remove();
    });

    $input.addEventListener('blur', (event) => {
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

      el.classList.add('h-ondrag');
    });

    el.addEventListener('dragleave', (event) => {
      event.stopPropagation();
      event.preventDefault();

      el.classList.remove('h-ondrag');
    });

    // File drop
    el.addEventListener('drop', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      el.classList.remove('h-ondrag');

      const items = event.dataTransfer?.items;
      const files = [];
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

      const entries = [];
      const promises: Promise<void>[] = [];
      Array.prototype.forEach.call(items ?? [], (item: DataTransferItem) => {

        const entry = item.webkitGetAsEntry();

        if (entry) {
          promises.push(getFilesRecursively(entry));
        }
      });

      if (promises.length) {
        Promise.all(promises).then((a) => {
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
      const item = reactive<UploaderItemInstance>({
        key: uid(),
        url,
        file: file,
        uploadState: UploadState.PENDING,
        progress: 0,
      });

      eventBus.emit('create-item', item);

      const i = items.value.push(item);
      const v = items.value[i - 1];

      uploadFile(v);

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
        simpleAlert(
          '不支援的檔案格式',
          `目前僅支援： ${accepted.join(', ')}`,
          'warning'
        );
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

  function deleteItem(child: UploaderItemInstance) {
    emits('delete-item', child);

    items.value = items.value.filter(item => item.key !== child.key);
  }

  function pushUploadQueue(uploadCallback: () => Promise<void>) {
    uploadQueue.push(uploadCallback);
  }

  async function uploadFile(item: UploaderItemInstance) {
    item.uploadState = UploadState.UPLOADING;

    const formData = new FormData();
    formData.append('file', item.file!);

    item.title = item.title || item.file!.name;

    emits('item-upload-start', item);

    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', uploadUrl.value);

      xhr.upload.onprogress = (event: ProgressEvent) => {
        if (event.lengthComputable) {
          item.progress = event.loaded / event.total;
          emits('item-upload-progress', item);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);

            item.uploadState = UploadState.UPLOADED;

            Object.assign(
              item,
              {
                url: '',
              },
              res.data
            );

            if (isImageItem(item)) {
              item.thumbUrl = res.data.thumb_url || res.data.url;
            }

            resolve();
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
        item.file = undefined;
        emits('item-upload-end', item);
      };

      xhr.send(formData);
    });
  }

  function uploadProgress(uniqid: string, progress: number) {
    const item = items.value.find(item => item.key === uniqid);

    if (item) {
      item.progress = progress;
    }
  }

  function itemClick(item: UploaderItemInstance, i: number, $event: Event) {
    emits('item-click', item, i, $event);
  }

  // Images
  function isImageItem(item: UploaderItemInstance) {
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

  const uploading = computed(() => {
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

  watch(uploading, (val) => {
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
    uploadQueue,
    eventBus,
    canUpload,
    uploading,
    acceptedTypes,
    isReadonly,

    emits,
    openFileSelector,
    uploadFiles,
    checkFile,
    compareMimeType,
    deleteItem,
    bindDraggingEvents,
    pushUploadQueue,
    upload: uploadFile,
    uploadProgress,
    itemClick,
    isImageFile: isImageItem,
    isImage,
  };
}

function handleEvents(options: MultiUploaderOptions) {
  const eventBus = dush();

  if (options.onChange) {
    eventBus.on('change', options.onChange);
  }

  if (options.onDeleteItem) {
    eventBus.on('delete-item', options.onDeleteItem);
  }

  if (options.onItemClick) {
    eventBus.on('item-click', options.onItemClick);
  }

  if (options.onUploading) {
    eventBus.on('uploading', options.onUploading);
  }

  if (options.onUploaded) {
    eventBus.on('uploaded', options.onUploaded);
  }

  if (options.onReorder) {
    eventBus.on('reorder', options.onReorder);
  }

  if (options.onItemUploadStart) {
    eventBus.on('item-upload-start', options.onItemUploadStart);
  }

  if (options.onItemUploadEnd) {
    eventBus.on('item-upload-end', options.onItemUploadEnd);
  }

  if (options.onItemUploadProgress) {
    eventBus.on('item-upload-progress', options.onItemUploadProgress);
  }

  return eventBus;
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

export function wrapRef<T>(value: MaybeRef<T>): Ref<T> {
  if (typeof value === 'function') {
    value = ref((value as Function)());
  }

  return (isRef(value) ? value : ref(value)) as Ref<T>;
}
