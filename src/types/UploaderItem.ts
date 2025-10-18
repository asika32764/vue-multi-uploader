import type { UploadState } from '~/enum/UploadState';

export interface UploaderItem<T = any> {
  key: string;
  url: string;
  thumbUrl?: string;
  title?: string;
  file?: File;
  mime?: string;
  data?: T;

  uploadState: UploadState;
  progress: number;
  xhr?: XMLHttpRequest;
  error?: Error;

  [props: string]: any;
}
