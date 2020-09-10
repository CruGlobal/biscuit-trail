import { isString, isObject } from '../utils';
import { Response, Request } from 'express';

export enum HTTP_CODES {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}

export function getIpAddress(req: Request) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

export function resSend(res: Response, status: number, data?: object | boolean) {
  return res.status(status).send(data);
}
export function unAuth(res: Response, message: string | object = 'Unauthorized', more = {}) {
  let data: any = { ...more };
  if (isString(message)) {
    data.message = message;
  } else if (isObject(message)) {
    data = { ...more, ...message };
  }
  return resSend(res, HTTP_CODES.UNAUTHORIZED, data);
}
export function notFound(res: Response, message: string | object = 'Not Found', more = {}) {
  let data: any = { ...more };
  if (isString(message)) {
    data.message = message;
  } else if (isObject(message)) {
    data = { ...more, ...message };
  }
  return resSend(res, HTTP_CODES.NOT_FOUND, data);
}
export function success(res: Response, data: object | boolean = {}) {
  return resSend(res, HTTP_CODES.SUCCESS, data);
}
export function badRequest(res: Response, data: object | boolean = {}) {
  return resSend(res, HTTP_CODES.BAD_REQUEST, data);
}

export function handleErrorResponse(res: Response, error: Error) {
  console.log('ERROR: response', error);
  if (error.message) {
    return badRequest(res, { error: true, message: error.message });
  }
  return res.status(HTTP_CODES.BAD_REQUEST).send(error);
}
