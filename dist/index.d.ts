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

declare const __VLS_component: DefineComponent<__VLS_PublicProps, {
instance: MultiUploaderComposableInstance;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
uploading: () => any;
uploaded: () => any;
change: (items: UploaderItem<any>[]) => any;
"create-item": (item: UploaderItem<any>) => any;
"delete-item": (item: UploaderItem<any>) => any;
"item-upload-start": (item: UploaderItem<any>, xhr: XMLHttpRequest) => any;
"item-upload-fail": (item: UploaderItem<any>, xhr: XMLHttpRequest) => any;
"item-upload-progress": (item: UploaderItem<any>, event: ProgressEvent<EventTarget>) => any;
"item-upload-success": (item: UploaderItem<any>, xhr: XMLHttpRequest) => any;
"item-upload-end": (item: UploaderItem<any>, xhr: XMLHttpRequest) => any;
"update:modelValue": (...args: unknown[]) => any;
"invalid-file-type": (file: File, accepted: string[]) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
onUploading?: (() => any) | undefined;
onUploaded?: (() => any) | undefined;
onChange?: ((items: UploaderItem<any>[]) => any) | undefined;
"onCreate-item"?: ((item: UploaderItem<any>) => any) | undefined;
"onDelete-item"?: ((item: UploaderItem<any>) => any) | undefined;
"onItem-upload-start"?: ((item: UploaderItem<any>, xhr: XMLHttpRequest) => any) | undefined;
"onItem-upload-fail"?: ((item: UploaderItem<any>, xhr: XMLHttpRequest) => any) | undefined;
"onItem-upload-progress"?: ((item: UploaderItem<any>, event: ProgressEvent<EventTarget>) => any) | undefined;
"onItem-upload-success"?: ((item: UploaderItem<any>, xhr: XMLHttpRequest) => any) | undefined;
"onItem-upload-end"?: ((item: UploaderItem<any>, xhr: XMLHttpRequest) => any) | undefined;
"onUpdate:modelValue"?: ((...args: unknown[]) => any) | undefined;
"onInvalid-file-type"?: ((file: File, accepted: string[]) => any) | undefined;
}>, {
options: Exclude<MultiUploaderOptions, "uploadUrl">;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
uploader: HTMLDivElement;
}, HTMLDivElement>;

declare const __VLS_component_2: DefineComponent<__VLS_Props_2, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
delete: (item: UploaderItem<any>) => any;
"item-click": (item: UploaderItem<any>, index: number, $event: MouseEvent) => any;
}, string, PublicProps, Readonly<__VLS_Props_2> & Readonly<{
onDelete?: ((item: UploaderItem<any>) => any) | undefined;
"onItem-click"?: ((item: UploaderItem<any>, index: number, $event: MouseEvent) => any) | undefined;
}>, {
size: number | string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare const __VLS_component_3: DefineComponent<__VLS_Props_3, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<__VLS_Props_3> & Readonly<{}>, {
size: any;
text: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare type __VLS_Props = {
    id?: string;
    uploadUrl?: string;
    placeholder?: string;
    instance?: MultiUploaderComposableInstance;
    options?: Exclude<MultiUploaderOptions, 'uploadUrl'>;
};

declare type __VLS_Props_2 = {
    item: UploaderItem;
    i: number;
    size?: number | string;
    isReadonly?: boolean;
};

declare type __VLS_Props_3 = {
    size?: any;
    text?: string;
};

declare type __VLS_PublicProps = {
    modelValue?: Partial<UploaderItem>[];
} & __VLS_Props;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
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
    };
    refs: {
        uploader: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};

declare function __VLS_template_2(): {
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

declare function __VLS_template_3(): {
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

declare type __VLS_TemplateResult_3 = ReturnType<typeof __VLS_template_3>;

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

export declare function createItem(item: Partial<UploaderItem>): UploaderItem;

export declare function handleEvents(options: MultiUploaderOptions): Emitter;

export declare const ItemCard: __VLS_WithTemplateSlots_2<typeof __VLS_component_2, __VLS_TemplateResult_2["slots"]>;

export declare const ItemCardPlaceholder: __VLS_WithTemplateSlots_3<typeof __VLS_component_3, __VLS_TemplateResult_3["slots"]>;

declare type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null;

export declare const MultiUploader: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

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

export declare type MultiUploaderEmits = {
    'update:modelValue': [items: UploaderItem[]];
    'change': [items: UploaderItem[]];
    'delete-item': [item: UploaderItem];
    'uploading': [];
    'uploaded': [];
    'create-item': [item: UploaderItem];
    'item-upload-start': [item: UploaderItem, xhr: XMLHttpRequest];
    'item-upload-success': [item: UploaderItem, xhr: XMLHttpRequest];
    'item-upload-fail': [item: UploaderItem, xhr: XMLHttpRequest];
    'item-upload-end': [item: UploaderItem, xhr: XMLHttpRequest];
    'item-upload-progress': [item: UploaderItem, event: ProgressEvent];
    'invalid-file-type': [file: File, accepted: string[]];
};

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
