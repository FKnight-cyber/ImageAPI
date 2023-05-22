import { HttpStatus } from '@nestjs/common';

export default function errorHandler(error: string) {
  if (error === 'ERR_BAD_REQUEST') {
    return HttpStatus.BAD_REQUEST;
  } else {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
