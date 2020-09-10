"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = exports.badRequest = exports.success = exports.notFound = exports.unAuth = exports.resSend = exports.getIpAddress = exports.HTTP_CODES = void 0;
const utils_1 = require("../utils");
var HTTP_CODES;
(function (HTTP_CODES) {
    HTTP_CODES[HTTP_CODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_CODES[HTTP_CODES["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP_CODES[HTTP_CODES["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTP_CODES[HTTP_CODES["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP_CODES[HTTP_CODES["SUCCESS"] = 200] = "SUCCESS";
    HTTP_CODES[HTTP_CODES["CREATED"] = 201] = "CREATED";
    HTTP_CODES[HTTP_CODES["NO_CONTENT"] = 204] = "NO_CONTENT";
})(HTTP_CODES = exports.HTTP_CODES || (exports.HTTP_CODES = {}));
function getIpAddress(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}
exports.getIpAddress = getIpAddress;
function resSend(res, status, data) {
    return res.status(status).send(data);
}
exports.resSend = resSend;
function unAuth(res, message = 'Unauthorized', more = {}) {
    let data = { ...more };
    if (utils_1.isString(message)) {
        data.message = message;
    }
    else if (utils_1.isObject(message)) {
        data = { ...more, ...message };
    }
    return resSend(res, HTTP_CODES.UNAUTHORIZED, data);
}
exports.unAuth = unAuth;
function notFound(res, message = 'Not Found', more = {}) {
    let data = { ...more };
    if (utils_1.isString(message)) {
        data.message = message;
    }
    else if (utils_1.isObject(message)) {
        data = { ...more, ...message };
    }
    return resSend(res, HTTP_CODES.NOT_FOUND, data);
}
exports.notFound = notFound;
function success(res, data = {}) {
    return resSend(res, HTTP_CODES.SUCCESS, data);
}
exports.success = success;
function badRequest(res, data = {}) {
    return resSend(res, HTTP_CODES.BAD_REQUEST, data);
}
exports.badRequest = badRequest;
function handleErrorResponse(res, error) {
    console.log('ERROR: response', error);
    if (error.message) {
        return badRequest(res, { error: true, message: error.message });
    }
    return res.status(HTTP_CODES.BAD_REQUEST).send(error);
}
exports.handleErrorResponse = handleErrorResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9hcGkvYXBpVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBQThDO0FBRzlDLElBQVksVUFRWDtBQVJELFdBQVksVUFBVTtJQUNwQiwyREFBaUIsQ0FBQTtJQUNqQiw2REFBa0IsQ0FBQTtJQUNsQix1REFBZSxDQUFBO0lBQ2YsdURBQWUsQ0FBQTtJQUNmLG1EQUFhLENBQUE7SUFDYixtREFBYSxDQUFBO0lBQ2IseURBQWdCLENBQUE7QUFDbEIsQ0FBQyxFQVJXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBUXJCO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLEdBQVk7SUFDdkMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7QUFDeEUsQ0FBQztBQUZELG9DQUVDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLEdBQWEsRUFBRSxNQUFjLEVBQUUsSUFBdUI7SUFDNUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRkQsMEJBRUM7QUFDRCxTQUFnQixNQUFNLENBQUMsR0FBYSxFQUFFLFVBQTJCLGNBQWMsRUFBRSxJQUFJLEdBQUcsRUFBRTtJQUN4RixJQUFJLElBQUksR0FBUSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDNUIsSUFBSSxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQ3hCO1NBQU0sSUFBSSxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzVCLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7S0FDaEM7SUFDRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBUkQsd0JBUUM7QUFDRCxTQUFnQixRQUFRLENBQUMsR0FBYSxFQUFFLFVBQTJCLFdBQVcsRUFBRSxJQUFJLEdBQUcsRUFBRTtJQUN2RixJQUFJLElBQUksR0FBUSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDNUIsSUFBSSxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQ3hCO1NBQU0sSUFBSSxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzVCLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7S0FDaEM7SUFDRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBUkQsNEJBUUM7QUFDRCxTQUFnQixPQUFPLENBQUMsR0FBYSxFQUFFLE9BQXlCLEVBQUU7SUFDaEUsT0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUZELDBCQUVDO0FBQ0QsU0FBZ0IsVUFBVSxDQUFDLEdBQWEsRUFBRSxPQUF5QixFQUFFO0lBQ25FLE9BQU8sT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFGRCxnQ0FFQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLEdBQWEsRUFBRSxLQUFZO0lBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEMsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQ2pCLE9BQU8sVUFBVSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ2pFO0lBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQU5ELGtEQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNTdHJpbmcsIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgUmVzcG9uc2UsIFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcblxuZXhwb3J0IGVudW0gSFRUUF9DT0RFUyB7XG4gIEJBRF9SRVFVRVNUID0gNDAwLFxuICBVTkFVVEhPUklaRUQgPSA0MDEsXG4gIEZPUkJJRERFTiA9IDQwMyxcbiAgTk9UX0ZPVU5EID0gNDA0LFxuICBTVUNDRVNTID0gMjAwLFxuICBDUkVBVEVEID0gMjAxLFxuICBOT19DT05URU5UID0gMjA0LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXBBZGRyZXNzKHJlcTogUmVxdWVzdCkge1xuICByZXR1cm4gcmVxLmhlYWRlcnNbJ3gtZm9yd2FyZGVkLWZvciddIHx8IHJlcS5jb25uZWN0aW9uLnJlbW90ZUFkZHJlc3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNTZW5kKHJlczogUmVzcG9uc2UsIHN0YXR1czogbnVtYmVyLCBkYXRhPzogb2JqZWN0IHwgYm9vbGVhbikge1xuICByZXR1cm4gcmVzLnN0YXR1cyhzdGF0dXMpLnNlbmQoZGF0YSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdW5BdXRoKHJlczogUmVzcG9uc2UsIG1lc3NhZ2U6IHN0cmluZyB8IG9iamVjdCA9ICdVbmF1dGhvcml6ZWQnLCBtb3JlID0ge30pIHtcbiAgbGV0IGRhdGE6IGFueSA9IHsgLi4ubW9yZSB9O1xuICBpZiAoaXNTdHJpbmcobWVzc2FnZSkpIHtcbiAgICBkYXRhLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9IGVsc2UgaWYgKGlzT2JqZWN0KG1lc3NhZ2UpKSB7XG4gICAgZGF0YSA9IHsgLi4ubW9yZSwgLi4ubWVzc2FnZSB9O1xuICB9XG4gIHJldHVybiByZXNTZW5kKHJlcywgSFRUUF9DT0RFUy5VTkFVVEhPUklaRUQsIGRhdGEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5vdEZvdW5kKHJlczogUmVzcG9uc2UsIG1lc3NhZ2U6IHN0cmluZyB8IG9iamVjdCA9ICdOb3QgRm91bmQnLCBtb3JlID0ge30pIHtcbiAgbGV0IGRhdGE6IGFueSA9IHsgLi4ubW9yZSB9O1xuICBpZiAoaXNTdHJpbmcobWVzc2FnZSkpIHtcbiAgICBkYXRhLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9IGVsc2UgaWYgKGlzT2JqZWN0KG1lc3NhZ2UpKSB7XG4gICAgZGF0YSA9IHsgLi4ubW9yZSwgLi4ubWVzc2FnZSB9O1xuICB9XG4gIHJldHVybiByZXNTZW5kKHJlcywgSFRUUF9DT0RFUy5OT1RfRk9VTkQsIGRhdGEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN1Y2Nlc3MocmVzOiBSZXNwb25zZSwgZGF0YTogb2JqZWN0IHwgYm9vbGVhbiA9IHt9KSB7XG4gIHJldHVybiByZXNTZW5kKHJlcywgSFRUUF9DT0RFUy5TVUNDRVNTLCBkYXRhKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYWRSZXF1ZXN0KHJlczogUmVzcG9uc2UsIGRhdGE6IG9iamVjdCB8IGJvb2xlYW4gPSB7fSkge1xuICByZXR1cm4gcmVzU2VuZChyZXMsIEhUVFBfQ09ERVMuQkFEX1JFUVVFU1QsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRXJyb3JSZXNwb25zZShyZXM6IFJlc3BvbnNlLCBlcnJvcjogRXJyb3IpIHtcbiAgY29uc29sZS5sb2coJ0VSUk9SOiByZXNwb25zZScsIGVycm9yKTtcbiAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICByZXR1cm4gYmFkUmVxdWVzdChyZXMsIHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcy5zdGF0dXMoSFRUUF9DT0RFUy5CQURfUkVRVUVTVCkuc2VuZChlcnJvcik7XG59XG4iXX0=