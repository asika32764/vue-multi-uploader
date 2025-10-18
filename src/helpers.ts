import { UploadState } from '~/enum/UploadState.ts';
import type { UploaderItem } from '~/types/UploaderItem.ts';
import type { Ref } from 'vue';

export function openFileSelectorForAdding(accept: Ref<string>, uploadFiles: (files: (FileList | File[])) => void) {
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
      'cancelable': true,
    }),
  );
}

export function handleDropzoneDragging(
  el: HTMLElement,
  onDragClass: Ref<string>,
  uploadFiles: (files: (FileList | File[])) => void
) {
  // @ts-ignore
  if (el.__dragging_events) {
    return;
  }

  let counter = 0;

  el.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  el.addEventListener('dragenter', (event) => {
    event.stopPropagation();
    event.preventDefault();

    counter++;

    el.classList.add(onDragClass.value);
  });

  el.addEventListener('dragleave', (event) => {
    event.stopPropagation();
    event.preventDefault();

    counter--;

    if (counter === 0) {
      el.classList.remove(onDragClass.value);
    }
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

export function isImageItem(item: UploaderItem): boolean {
  if (item.uploadState === UploadState.UPLOADED) {
    if (item.mime) {
      return isImageMimeType(item.mime);
    }

    return isImage(item.url);
  }

  if (item.mime) {
    return isImageMimeType(item.mime);
  }

  return isImage(
    item.file?.name || item.url
  );
}

export function isImage(filePath: string) {
  const match = filePath.match(/^data:image\/([a-zA-Z0-9.+-]+);base64,/);

  let ext: string;

  if (match) {
    ext = match[1];
  } else {
    ext = filePath.split('.').pop()?.split('?').shift() || '';
  }

  const allow = [
    'png',
    'apng',
    'jpeg',
    'jpg',
    'gif',
    'bmp',
    'webp',
    'avif',
    'heic',
    'heif',
  ];

  return allow.indexOf(ext.toLowerCase()) !== -1;
}

export function isImageMimeType(mime: string) {
  return mime.startsWith('image/');
}
