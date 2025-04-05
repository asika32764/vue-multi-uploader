export class InvalidFileTypeError extends Error {
  constructor(message: string, public file: File, public accepted: string[]) {
    super(message);
    this.name = 'InvalidFileTypeError';
  }
}

export class InvalidFileSizeError extends Error {
  constructor(message: string, public file: File, public maxSize: number) {
    super(message);
    this.name = 'InvalidFileSizeError';
  }
}
