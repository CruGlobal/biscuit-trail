import { Response, Request } from 'express';
export declare enum HTTP_CODES {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204
}
export declare function getIpAddress(req: Request): string | string[];
export declare function resSend(res: Response, status: number, data?: object | boolean): Response<any>;
export declare function unAuth(res: Response, message?: string | object, more?: {}): Response<any>;
export declare function notFound(res: Response, message?: string | object, more?: {}): Response<any>;
export declare function success(res: Response, data?: object | boolean): Response<any>;
export declare function badRequest(res: Response, data?: object | boolean): Response<any>;
export declare function handleErrorResponse(res: Response, error: Error): Response<any>;
//# sourceMappingURL=apiUtils.d.ts.map