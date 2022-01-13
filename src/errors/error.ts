import { HttpException, HttpStatus } from '@nestjs/common';

export class HandlingErrors {
  constructor(error: string, codeError: HttpStatus) {
    new HttpException(
      {
        status: codeError,
        error,
      },
      codeError,
    );
  }
}
