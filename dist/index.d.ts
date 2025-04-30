import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComponentPublicInstance } from 'vue';
import { ComputedRef } from 'vue';
import { DefineComponent } from 'vue';
import { Emitter } from 'dush';
import { Handler } from 'dush';
import { MaybeRef } from 'vue';
import { MaybeRefOrGetter } from 'vue';
import { PublicProps } from 'vue';
import { Ref } from 'vue';
import { WildcardHandler } from 'dush';

declare const __VLS_component: DefineComponent<__VLS_Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
delete: any;
"item-click": any;
}, string, PublicProps, Readonly<__VLS_Props> & Readonly<{
onDelete?: ((...args: any) => any) | undefined;
"onItem-click"?: ((...args: any) => any) | undefined;
}>, {
size: number | string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare const __VLS_component_2: DefineComponent<__VLS_Props_2, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<__VLS_Props_2> & Readonly<{}>, {
size: any;
text: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare type __VLS_Props = {
    item: UploaderItem;
    i: number;
    size?: number | string;
    isReadonly?: boolean;
};

declare type __VLS_Props_2 = {
    size?: any;
    text?: string;
};

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        it?(_: {
            item: UploaderItem<any>;
        }): any;
        icon?(_: {
            item: UploaderItem<any>;
        }): any;
        'remove-icon'?(_: {}): any;
        extra?(_: {
            item: UploaderItem<any>;
        }): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};

declare function __VLS_template_2(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        icon?(_: {
            size: any;
        }): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_TemplateResult_2 = ReturnType<typeof __VLS_template_2>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_2<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_3<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare function handleEvents(options: MultiUploaderOptions): Emitter;

export declare const ItemCard: __VLS_WithTemplateSlots_2<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare const ItemCardPlaceholder: __VLS_WithTemplateSlots_3<typeof __VLS_component_2, __VLS_TemplateResult_2["slots"]>;

declare type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null;

export declare const MultiUploader: __VLS_WithTemplateSlots<DefineComponent<    {
modelValue?: Partial<UploaderItem>[];
} & {
id?: string;
uploadUrl?: string;
placeholder?: string;
instance?: MultiUploaderComposableInstance;
options?: Exclude<MultiUploaderOptions, "uploadUrl">;
}, {
instance: MultiUploaderComposableInstance;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
[x: string]: any;
} & {
[x: string]: any;
}, string, PublicProps, Readonly<{
modelValue?: Partial<UploaderItem>[];
} & {
id?: string;
uploadUrl?: string;
placeholder?: string;
instance?: MultiUploaderComposableInstance;
options?: Exclude<MultiUploaderOptions, "uploadUrl">;
}> & Readonly<{
[x: `on${Capitalize<any>}`]: ((...args: any) => any) | undefined;
}>, {
options: Exclude<MultiUploaderOptions, "uploadUrl">;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
el: HTMLDivElement;
}, HTMLDivElement>, {
    items?(_: {
        items: UploaderItem<any>[];
        options: MultiUploaderOptions;
        instance: {
            id: string;
            accept: string;
            maxFiles: number | undefined;
            maxConcurrent: number;
            maxItemSize: number | undefined;
            disabled: boolean;
            readonly: boolean;
            uploadUrl: string;
            items: UploaderItem<any>[];
            eventBus: {
                _allEvents: Array<{
                    [eventName: string]: Handler[];
                }>;
                use: (plugin: (app: Emitter, options: any) => void, options?: any) => Emitter;
                on: {
                    (type: string, handler: Handler): Emitter;
                    (type: "*", handler: WildcardHandler): Emitter;
                };
                once: {
                    (type: string, handler: Handler): Emitter;
                    (type: "*", handler: WildcardHandler): Emitter;
                };
                off: {
                    (type: string, handler?: Handler): Emitter;
                    (type: "*", handler?: WildcardHandler): Emitter;
                };
                emit: (type: string, ...event: any[]) => Emitter;
            };
            canUpload: boolean;
            isUploading: boolean;
            acceptedTypes: string[];
            isReadonly: boolean;
            totalSize: number;
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
        };
    }): any;
}>;

export declare type MultiUploaderComposableInstance = {
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
};

export declare interface MultiUploaderEmits {
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

export declare type MultiUploaderOptions = {
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
} & Partial<OptionsEventsMap>;

export declare type OptionsEventsMap = {
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
};

export declare type UploaderEvents = {
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
    'invalid-file': (e: Error) => void;
};

export declare const uploaderEvents: Record<keyof UploaderEvents, string>;

export declare interface UploaderItem<T = any> {
    key: string;
    url: string;
    thumbUrl?: string;
    title?: string;
    file?: File;
    data?: T;
    uploadState: UploadState;
    progress: number;
    xhr?: XMLHttpRequest;
    error?: Error;
    [props: string]: any;
}

export declare enum UploadState {
    PENDING = "pending",
    UPLOADING = "uploading",
    UPLOADED = "uploaded",
    ERROR = "error"
}

export declare function useMultiUploader<T extends MultiUploaderOptions>(currentValue: MaybeRef<Partial<UploaderItem>[]>, uploadTarget: MaybeRefOrGetter<string>, options?: T): MultiUploaderComposableInstance;

export { }
