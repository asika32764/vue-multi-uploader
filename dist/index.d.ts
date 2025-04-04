import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComponentPublicInstance } from 'vue';
import { DefineComponent } from 'vue';
import { Emitter } from 'dush';
import { Handler } from 'dush';
import { MaybeRef } from 'vue';
import { MaybeRefOrGetter } from 'vue';
import { PublicProps } from 'vue';
import { Ref } from 'vue';
import { TaskQueue } from '@lyrasoft/ts-toolkit/src/generic';
import { WildcardHandler } from 'dush';

declare const __VLS_component: DefineComponent<__VLS_PublicProps, {
instance: MultiUploaderComposableInstance;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (modelValue: Partial<UploaderItem>[]) => any;
} & {
uploading: () => any;
uploaded: () => any;
"delete-item": (item: UploaderItem) => any;
"item-click": (item: UploaderItem, index: number, $event: Event) => any;
"update:modelValue": (value: UploaderItem[]) => any;
reorder: (event: any) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
onUploading?: (() => any) | undefined;
onUploaded?: (() => any) | undefined;
"onDelete-item"?: ((item: UploaderItem) => any) | undefined;
"onItem-click"?: ((item: UploaderItem, index: number, $event: Event) => any) | undefined;
"onUpdate:modelValue"?: ((value: UploaderItem[]) => any) | undefined;
onReorder?: ((event: any) => any) | undefined;
}>, {
options: Exclude<MultiUploaderOptions, "uploadUrl">;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
el: HTMLDivElement;
}, any>;

declare const __VLS_component_2: DefineComponent<    {
item: UploaderItem;
i: number;
size?: number | string;
isReadonly?: boolean;
}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
"item-click": (item: UploaderItem, index: number, $event: MouseEvent) => any;
delete: (item: UploaderItem) => any;
}, string, PublicProps, Readonly<{
item: UploaderItem;
i: number;
size?: number | string;
isReadonly?: boolean;
}> & Readonly<{
"onItem-click"?: ((item: UploaderItem, index: number, $event: MouseEvent) => any) | undefined;
onDelete?: ((item: UploaderItem) => any) | undefined;
}>, {
size: number | string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_component_3: DefineComponent<    {
size?: any;
text?: string;
}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{
size?: any;
text?: string;
}> & Readonly<{}>, {
size: any;
text: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare type __VLS_PublicProps = {
    modelValue?: Partial<UploaderItem>[];
} & typeof __VLS_typeProps;

declare function __VLS_template(): {
    slots: {
        items?(_: {
            items: UploaderItem[];
            options: MultiUploaderOptions;
            instance: {
                id: string;
                accept: string;
                maxFiles: number | undefined;
                maxConcurrent: number;
                disabled: boolean;
                readonly: boolean;
                uploadUrl: string;
                items: UploaderItem[];
                uploadQueue: {
                    items: (() => Promise<any>)[];
                    currentRunning: number;
                    running: boolean;
                    observers: {
                        handler: Function;
                        once: boolean;
                    }[];
                    maxRunning: number;
                    push: <T extends ((...args: any[]) => any)>(callback: T) => Promise<Awaited<ReturnType<T>>>;
                    run: () => void;
                    pop: () => Promise<any>;
                    endPop: () => void;
                    clear: () => TaskQueue;
                    isEmpty: () => boolean;
                    readonly length: number;
                    peek: () => (() => Promise<any>)[];
                    observe: (handler: (queue: TaskQueue, length: number, running: number) => void, options?: {
                        once?: boolean;
                    }) => () => void;
                    once: (handler: (queue: TaskQueue, length: number, running: number) => void, options?: {
                        once?: boolean;
                    }) => () => void;
                    onEnd: (callback: (queue: TaskQueue, length: number, running: number) => void, options?: {
                        once?: boolean;
                    }) => () => void;
                    notice: () => TaskQueue;
                    off: (callback?: Function) => TaskQueue;
                };
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
                emits: (event: string, ...args: any[]) => void;
                on: (event: string, callback: (...event: any[]) => void) => () => void;
                openFileSelector: () => void;
                deleteItem: (child: UploaderItem) => void;
                uploadStart: () => Promise<PromiseSettledResult<UploaderItem>[]>;
                isImage: (filePath: string) => boolean;
                isImageItem: (item: UploaderItem) => boolean;
            };
            onDelete: any;
        }): any;
    };
    refs: {
        el: HTMLDivElement;
    };
    attrs: Partial<{}>;
};

declare function __VLS_template_2(): {
    slots: {
        it?(_: {
            item: UploaderItem;
        }): any;
        icon?(_: {
            item: UploaderItem;
        }): any;
        "remove-icon"?(_: {}): any;
        extra?(_: {
            item: UploaderItem;
        }): any;
    };
    refs: {};
    attrs: Partial<{}>;
};

declare function __VLS_template_3(): {
    slots: {
        default?(_: {}): any;
        icon?(_: {
            size: any;
        }): any;
    };
    refs: {};
    attrs: Partial<{}>;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_TemplateResult_2 = ReturnType<typeof __VLS_template_2>;

declare type __VLS_TemplateResult_3 = ReturnType<typeof __VLS_template_3>;

declare let __VLS_typeProps: {
    id?: string;
    uploadUrl?: string;
    placeholder?: string;
    instance?: MultiUploaderComposableInstance;
    options?: Exclude<MultiUploaderOptions, 'uploadUrl'>;
};

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

export declare const ItemCard: __VLS_WithTemplateSlots_2<typeof __VLS_component_2, __VLS_TemplateResult_2["slots"]>;

export declare const ItemCardPlaceholder: __VLS_WithTemplateSlots_3<typeof __VLS_component_3, __VLS_TemplateResult_3["slots"]>;

declare type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null;

export declare const MultiUploader: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare type MultiUploaderComposableInstance = {
    id: Ref<string>;
    accept: Ref<string>;
    maxFiles: Ref<number | undefined>;
    maxConcurrent: Ref<number>;
    disabled: Ref<boolean>;
    readonly: Ref<boolean>;
    uploadUrl: Ref<string>;
    items: Ref<UploaderItem[]>;
    uploadQueue: ReturnType<typeof useQueue>;
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
};

export declare type MultiUploaderOptions = {
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

declare type OptionsEventsMap = {
    onChange?: UploaderEvents['change'];
    onDeleteItem?: UploaderEvents['delete-item'];
    onItemClick?: UploaderEvents['item-click'];
    onUploading?: UploaderEvents['uploading'];
    onUploaded?: UploaderEvents['uploaded'];
    onItemUploadStart?: UploaderEvents['item-upload-start'];
    onItemUploadSuccess?: UploaderEvents['item-upload-success'];
    onItemUploadFail?: UploaderEvents['item-upload-fail'];
    onItemUploadEnd?: UploaderEvents['item-upload-end'];
    onItemUploadProgress?: UploaderEvents['item-upload-progress'];
    onInvalidFileType?: UploaderEvents['invalid-file-type'];
};

declare type UploaderEvents = {
    'change': (items: UploaderItem[]) => void;
    'delete-item': (item: UploaderItem) => void;
    'item-click': (item: UploaderItem, index: number, e: Event) => void;
    'uploading': () => void;
    'uploaded': () => void;
    'create-item': (item: UploaderItem) => void;
    'item-upload-start': (item: UploaderItem, xhr: XMLHttpRequest) => void;
    'item-upload-success': (item: UploaderItem, xhr: XMLHttpRequest) => void;
    'item-upload-fail': (item: UploaderItem, xhr: XMLHttpRequest) => void;
    'item-upload-end': (item: UploaderItem, xhr: XMLHttpRequest) => void;
    'item-upload-progress': (item: UploaderItem, event: ProgressEvent) => void;
    'invalid-file-type': (file: File, accepted: string[]) => void;
};

export declare interface UploaderItem {
    key: string;
    url: string;
    thumbUrl?: string;
    title?: string;
    file?: File;
    data?: Record<string, any>;
    uploadState: UploadState;
    progress: number;
    message?: string;
    messageType?: string;
    [props: string]: any;
}

export declare enum UploadState {
    PENDING = "pending",
    UPLOADING = "uploading",
    UPLOADED = "uploaded",
    ERROR = "error"
}

export declare function useMultiUploader<T extends MultiUploaderOptions>(currentValue: MaybeRef<Partial<UploaderItem>[]>, uploadTarget: MaybeRefOrGetter<string>, options?: T): MultiUploaderComposableInstance;

declare function useQueue(): TaskQueue;

export declare function wrapRef<T>(value: MaybeRef<T>): Ref<T>;

export declare function wrapUploaderItem(item: Partial<UploaderItem>, extra?: Record<keyof UploaderItem, any>): UploaderItem;

export { }
