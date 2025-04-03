import type { UploadState } from '@/enum/UploadState';

export interface UploaderItem {
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
