# Vue Multi Uploader

[![Version](https://img.shields.io/npm/v/vue-multi-uploader.svg?style=flat-square)](https://www.npmjs.com/package/vue-multi-uploader)
[![License](https://img.shields.io/npm/l/vue-multi-uploader.svg?style=flat-square)](LICENSE)

A headless upload component that supports developers to custom for every
project. [DEMO](https://about.asika.tw/vue-multi-uploader/)

<!-- TOC -->

* [Vue Multi Uploader](#vue-multi-uploader)
  * [Installation](#installation)
  * [Getting Started](#getting-started)
  * [Usage](#usage)
  * [Options](#options)
    * [Options Refs](#options-refs)
  * [Return Values](#return-values)
  * [Prepare Default Items](#prepare-default-items)
  * [Fetch Uploaded Data And Set to Item](#fetch-uploaded-data-and-set-to-item)
  * [Events](#events)
  * [Pre-Built Components](#pre-built-components)

<!-- TOC -->

## Installation

```shell
npm i vue-multi-uploader --save

# OR

yarn add vue-multi-uploader
```

## Getting Started

Use bundler and Vue SFC:

```vue

<script setup lang="ts">
  import { useMultiUploader } from 'vue-multi-uploader';
</script>
```

Include JS file.

```html

<script src="path/to/package/dist/vue-multi-uploader.umd.cjs"></script>

<script>
  VueMultiUploader.useMultiUploader();
</script>
```

ES Module

```html

<script type="module">
  import { useMultiUploader } from 'path/to/package/dist/vue-multi-uploader.js';

  useMultiUploader();
</script>

```

## Usage

This is a simple example of how to use the `vue-multi-uploader` component in a Vue 3 application.
The example demonstrates how to set up a file upload interface with drag-and-drop functionality,
progress indicators, and the ability to delete uploaded items.

Full example please refer to [Demo](https://about.asika.tw/vue-multi-uploader/).

```html

<script setup lang="ts">
  import {
    type UploaderItem,
    useMultiUploader,
  } from 'vue-multi-uploader';
  import { ref, useTemplateRef } from 'vue';

  const dropzone = useTemplateRef('dropzone');

  const items = ref < UploaderItem[] > ([]);

  const {
    openFileSelector,
    deleteItem
  } = useMultiUploader(items, '/api/upload', {
    dropzone: dropzone,
    maxFiles: 5,
    onItemUploadSuccess(item, xhr) {
      const res = JSON.parse(xhr.responseText);
      item.url = res.url;
    },
  });

</script>

<template>
  <div class="">
    <!-- File List -->
    <ul>
      <li v-for="(item) of items" :key="item.key">
        <!-- Item title -->
        <div>
          {{ item.title }}
        </div>

        <!-- Progress -->
        <div class="progress progress-sm" style="height: 0.5rem">
          <div class="progress-bar" :style="{ width: (item.progress * 100) + '%' }"></div>
        </div>

        <!-- Delete Button-->
        <a href="#" @click.prevent="deleteItem(item)">
          Delete
        </a>
      </li>
    </ul>

    <!-- Dropzone -->
    <div ref="dropzone" class="dropzone"
      style="height: 300px; cursor: pointer;"
      @click="openFileSelector"
    >
      <div class="dropzone__content text-center">
        <span class="fa-solid fa-upload" style="font-size: 2rem"></span>
        <div>Click or drop to upload</div>
      </div>
    </div>
  </div>
</template>

```

## Options

Every option item can be a value, `Ref`, `computed`, or `function` to make them reactive.

```ts
const disabledRef = ref(props.disabled);

useMultiUploader(items, '/api/upload', {
  maxFiles: 5, // Value
  maxConcurrent: () => 2, // Getter
  disabled: disabledRef, // Ref
});
```

### Options Refs

| Name                   | Type                                               | Default     | Description                                                                                                                       |
|------------------------|----------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `id`                   | `string`                                           | `undefined` | ID for the uploader instance, leave empty will auto generate.                                                                     |
| `accept`               | `string`                                           | `undefined` | Accepted file types for upload, separate by comma if multiple, can be mime type (`image/*, text/plain`) or ext name `.jpg, .png`. |
| `maxFiles`             | `number`                                           | `undefined` | Maximum number of files allowed for upload.                                                                                       |
| `maxConcurrent`        | `number`                                           | `2`         | Maximum number of concurrent uploads.                                                                                             |
| `maxItemSize`          | `number`                                           | `undefined` | Maximum size of a single file in bytes.                                                                                           |
| `disabled`             | `boolean`                                          | `false`     | Disables the uploader if set to `true`.                                                                                           |
| `readonly`             | `boolean`                                          | `false`     | Sets the uploader to read-only mode if set to `true`.                                                                             |
| `dropzone`             | `MaybeElement`                                     | `undefined` | Element or ElementRef to be used as the dropzone.                                                                                 |
| `onDragClass`          | `string`                                           | `h-ondrag`  | CSS class to apply when dragging files over the dropzone.                                                                         |
| `autoStart`            | `boolean`                                          | `true`      | Automatically start uploading files when added, if set to `false`, you must call `uploadStart()` to start.                        |
| `onChange`             | (items: UploaderItem[]) => void                    |             | Triggered when the uploader items change.                                                                                         |
| `onDeleteItem`         | (item: UploaderItem) => void                       |             | Triggered when an item is deleted from uploader.                                                                                  |
| `onUploading`          | () => void                                         |             | Triggered when uploading process starts.                                                                                          |
| `onUploaded`           | () => void                                         |             | Triggered when uploading process completes.                                                                                       |
| `onItemUploadStart`    | (item: UploaderItem, xhr: XMLHttpRequest) => void  |             | Triggered when an individual file upload starts.                                                                                  |
| `onItemUploadSuccess`  | (item: UploaderItem, xhr: XMLHttpRequest) => void  |             | Triggered when a file uploads successfully, you can get the API return url here and set to `item`.                                |
| `onItemUploadFail`     | (item: UploaderItem, xhr: XMLHttpRequest) => void  |             | Triggered when a file fails to upload.                                                                                            |
| `onItemUploadEnd`      | (item: UploaderItem, xhr: XMLHttpRequest) => void  |             | Triggered when an individual file upload finishes.                                                                                |
| `onItemUploadProgress` | (item: UploaderItem, event: ProgressEvent) => void |             | Triggered during upload progress of a file.                                                                                       |
| `onInvalidFile`    | (e: Error) => void                                 |             | Triggered when a file with an invalid type or size is selected.                                                                   |

## Return Values

Variables can be directly obtained by expanding the return values as follows:

```ts
const {
  id,
  accept,
  maxFiles,
  maxConcurrent,
  disabled,
  readonly,
  items,
  uploading,
  progress,
  addFiles,
  removeItem,
  clear,
  startUpload,
  eventBus
} = useMultiUploader(...)

```

### Modifiable Values

| Name          | Type                       | Description                                    |
|---------------|----------------------------|------------------------------------------------|
| accept        | `Ref<string>`              | Accepted file types string (e.g., `.jpg,.png`) |
| disabled      | `Ref<boolean>`             | Whether the uploader is disabled               |
| id            | `Ref<string>`              | Unique identifier for the uploader instance    |
| items         | `Ref<UploaderItem[]>`      | List of file items currently in the uploader   |
| maxConcurrent | `Ref<number>`              | Maximum number of concurrent uploads           |
| maxFiles      | `Ref<number or undefined>` | Maximum number of files allowed                |
| maxItemSize   | `Ref<number or undefined>` | Maximum size of a single file in bytes         |
| readonly      | `Ref<boolean>`             | Whether the uploader is in read-only mode      |
| uploadUrl     | `Ref<string>`              | Target URL for uploads                         |

### Readonly Values

| Name          | Type            | Description                                                                                             |
|---------------|-----------------|---------------------------------------------------------------------------------------------------------|
| acceptedTypes | `Ref<string[]>` | Array of accepted file types                                                                            |
| canUpload     | `Ref<boolean>`  | Whether uploading is allowed, if is `readonly` or `disabled` or reaches max files, this will be `false` |
| eventBus      | `Emitter`       | Custom event bus for listening and triggering events                                                    |
| isReadonly    | `Ref<boolean>`  | Whether the uploader is in read-only state, this will merge `disabled` and `readonly`                   |
| isUploading   | `Ref<boolean>`  | Whether an upload is currently in progress                                                              |
| totalSize     | `Ref<number>`   | Total size of all files in the uploader                                                                 |

### Methods

| Name             | Type                                                                 | Description                                                           |
|------------------|----------------------------------------------------------------------|-----------------------------------------------------------------------|
| addFile          | `(file: File) => UploaderItem`                                       | Add a file to the uploader                                            |
| addItem          | `(item: UploaderItem) => UploaderItem`                               | Add an item to the uploader                                           |
| createItem       | `(file: File) => UploaderItem`                                       | Create a new item based on the file                                   |
| deleteItem       | `(child: UploaderItem) => void`                                      | Delete a specific file item from the uploader                         |
| emits            | `(event: string, ...args: any[]) => void`                            | Manually trigger specific events                                      |
| isImage          | `(filePath: string) => boolean`                                      | Determine if a file is an image based on its path                     |
| isImageItem      | `(item: UploaderItem) => boolean`                                    | Determine if an item is an image based on `UploaderItem`              |
| on               | `(event: string, callback: (...event: any[]) => void) => () => void` | Register event listeners and return a function to remove the listener |
| openFileSelector | `() => void`                                                         | Open the file selection window                                        |
| uploadStart      | `() => Promise<PromiseSettledResult<UploaderItem>[]>`                | Start the upload process and return the result for each item          |
| stopItemUpload | `(item: UploaderItem | XMLHttpRequest) => void`                                                         | Stop the upload process for a specific item                           |


Note you can modify some of the values in the return values, such as `disabled`, `readonly`, `maxFiles` etc.
The change will be reflected in the uploader instance.

## Prepare Default Items

If you have some exists files that you want to show in the uploader, you can prepare them in advance.

```ts
import { useMultiUploader, type UploaderItem } from 'vue-multi-uploader';

const defaultItems = ref<UploaderItem[]>([
  {
    key: '1',
    title: 'File 1',
    url: 'https://example.com/file1.jpg',

    // The original database record data can be stored in the `data` prop.
    data: {
      id: 1,
      title: 'File 1',
      // ...
    },
  },
  {
    key: '2',
    title: 'File 2',
    url: 'https://example.com/file2.jpg',

    // The original database record data can be stored in the `data` prop.
    data: {
      id: 1,
      title: 'File 1',
      // ...
    },
  },
]);

const { items, ... } = useMultiUploader(defaultItems, '/api/upload', {
  ...
});
```

The `UploaderItem` interface is as follows:

```ts
export interface UploaderItem {
  key: string;
  url: string;
  thumbUrl?: string;
  title?: string;
  file?: File;
  data?: Record<string, any>;

  uploadState: UploadState; // enum
  progress: number;
  message?: string;
  messageType?: string;

  [props: string]: any;
}
```

## Fetch Uploaded Data And Set to Item

You can set the uploaded URL to the item after the upload is complete. Use the `onItemUploadSuccess` callback to do
this.

```ts
const {
  ...
} = useMultiUploader(items, '/api/upload', {
  onItemUploadSuccess(item, xhr) {
    const res = JSON.parse(xhr.responseText);
    item.url = res.url;

    // If thumb image is smaller than the original image, you can set it to `thumbUrl`.
    item.thumbUrl = res.thumb_url;

    // If you want to store some returned data to the item, you can set it to `data` prop.
    item.data = res.data;
  },
});
```

## Programmatically Control

### Adding Items

You can add items programmatically by using the `addFile` or `addItem` method. If `autoStart` is set to `true`, 
the upload will start automatically after adding the item.

```ts
const {
  addFile,
  addItem,
  createItem,
} = useMultiUploader(items, '/api/upload', {
  ...
});

// Add a file
const item = addFile(file); // Return UploaderItem

// Add an item
const item = createItem(file);
addItem(item);
```

If `autoStart` is set to `false`, you need to call `uploadStart()`.

```ts
const {
  addFile,
  uploadStart,
} = useMultiUploader(items, '/api/upload', {
  autoStart: false,
  ...
});

const item = addFile(file);

uploadStart();
```

### Stop Upload

You can stop the upload process for a specific item by using the `stopItemUpload` method.

```ts
const {
  stopItemUpload,
} = useMultiUploader(items, '/api/upload', {
  ...
});

function clickToStop(item: UploaderItem) {
  stopItemUpload(item);
  
  // Or stop by xhr
  stopItemUpload(item.xhr);
}

```

## Handle Errors

### Invalid File

If the file is invalid, you can handle it in the `onInvalidFile` callback.

```ts
const {
  ...
} = useMultiUploader(items, '/api/upload', {
  onInvalidFile(e) {
    if (e.name === 'InvalidFileType') {
      console.error('Invalid file type:', e.message, e.file, e.accepted as string[]);
    } else if (e.name === 'InvalidFileSize') {
      console.error('Invalid file size:', e.message, e.file, e.maxSize);
    }
  },
});
```

### Upload Fail

If the upload fails, you can handle it in the `onItemUploadFail` callback.

```ts
const {
  ...
} = useMultiUploader(items, '/api/upload', {
  onItemUploadFail(item, xhr) {
    console.error('Upload failed:', item.error, xhr);
  },
});
```

## Events

You can use the `on` method to listen to events.

```ts
const { on } = useMultiUploader(items, '/api/upload', {});

const off = on('item-upload-success', (item, xhr) => {
  console.log('Item uploaded successfully:', item);
});

onUnmounted(() => {
  // Remember release the event listener
  off();
});
```

The `eventBus` is a `dush()` instance, so there are some features you can use:

```ts
const { eventBus } = useMultiUploader(items, '/api/upload', {});

eventBus.on('...', () => {...
});
eventBus.once('...', () => {...
});
```

The following events will match to `on*` callback in options:

| Event             | Callback           |
|-------------------|--------------------|
| `change`          | `onChange`         |
| `delete-item`     | `onDeleteItem`     |
| `uploading`       | `onUploading`      |
| `uploaded`        | `onUploaded`       |
| `create-item`     | `onCreateItem`     |
| `item-upload-start` | `onItemUploadStart` |
| `item-upload-success` | `onItemUploadSuccess` |
| `item-upload-fail` | `onItemUploadFail` |
| `item-upload-end` | `onItemUploadEnd`  |
| `item-upload-progress` | `onItemUploadProgress` |
| `invalid-file`    | `onInvalidFile`    |

## Pre-Built Components

There has a `VueMultiUploader` component that is a pre-built component for the uploader. Here is a simple example of how
to use it.

```vue

<script setup lang="ts">
  import { MultiUploader, ItemCard, ItemCardPlaceholder } from 'vue-multi-uploader';
  import { ref } from 'vue';

  const items = ref([]);
  const uploadUrl = '/api/upload';
  const accept = '.jpg,.png';

  function onItemUploadSuccess(item, xhr) {
    console.log('Item uploaded successfully:', item);
  }

  function deleteItem(item) {
    // Remove the item from the list
  }
</script>
<template>
  <MultiUploader
    :items="items"
    :upload-url="uploadUrl"
    :max-files="5"
    :max-concurrent="2"
    :accept="accept"
    @item-upload-success="onItemUploadSuccess"
  >
    <template #items="{items, instance: {canUpload, openFileSelector, deleteItem}}">
      <div class="d-flex flex-wrap w-100 gap-3">
        <ItemCard v-for="(item, index) of items"
          :item
          :i="index"
          @delete="deleteItem"
        />

        <ItemCardPlaceholder
          v-if="canUpload"
          class=""
          text="Click or drop to upload"
          @click="openFileSelector"
        />
      </div>
    </template>
  </MultiUploader>
</template>

```

Examples please refer to [Demo](https://about.asika.tw/vue-multi-uploader/).

### Get Uploader Instance From Component

You can get the uploader instance from the component.

```vue

<script setup lang="ts">
  import { MultiUploader } from 'vue-multi-uploader';
  import { onMounted, useTemplateRef } from 'vue';

  const uploader = useTemplateRef('uploader');

  onMounted(() => {
    const { items, uploadUrl, maxFiles } = uploader.value!.instance;
    console.log(items, uploadUrl, maxFiles);
  });
</script>
<template>
  <MultiUploader ref="uploader" ...>
    ...
  </MultiUploader>
</template>
```
