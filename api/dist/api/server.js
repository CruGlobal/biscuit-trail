#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// import debug from 'debug'('thryve-rest-api:server'_;
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const socket_1 = __importDefault(require("./socket"));
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '8000');
app_1.default.set('port', port);
/**
 * Create HTTP server.
 */
const server = http_1.default.createServer(app_1.default);
const io = socket_io_1.default(server);
io.on('connection', (socket) => {
    socket_1.default(socket);
});
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    // debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXBpL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOztHQUVHOzs7OztBQUVILGdEQUF3QjtBQUN4Qix1REFBdUQ7QUFDdkQsZ0RBQXdCO0FBQ3hCLDBEQUE2QztBQUM3QyxzREFBcUM7QUFFckM7O0dBRUc7QUFFSCxNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUM7QUFDdkQsYUFBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFdEI7O0dBRUc7QUFFSCxNQUFNLE1BQU0sR0FBRyxjQUFJLENBQUMsWUFBWSxDQUFDLGFBQUcsQ0FBQyxDQUFDO0FBRXRDLE1BQU0sRUFBRSxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFNUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTtJQUNyQyxnQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUg7O0dBRUc7QUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRXBDOztHQUVHO0FBRUgsU0FBUyxhQUFhLENBQUMsR0FBRztJQUN4QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRS9CLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2YsYUFBYTtRQUNiLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFFRCxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7UUFDYixjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEOztHQUVHO0FBRUgsU0FBUyxPQUFPLENBQUMsS0FBSztJQUNwQixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQzlCLE1BQU0sS0FBSyxDQUFDO0tBQ2I7SUFFRCxNQUFNLElBQUksR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFFeEUsdURBQXVEO0lBQ3ZELFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtRQUNsQixLQUFLLFFBQVE7WUFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRywrQkFBK0IsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTTtRQUNSLEtBQUssWUFBWTtZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNO1FBQ1I7WUFDRSxNQUFNLEtBQUssQ0FBQztLQUNmO0FBQ0gsQ0FBQztBQUVEOztHQUVHO0FBRUgsU0FBUyxXQUFXO0lBQ2xCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QixNQUFNLElBQUksR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzdFLGlDQUFpQztJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN0QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IGFwcCBmcm9tICcuL2FwcCc7XG4vLyBpbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnKCd0aHJ5dmUtcmVzdC1hcGk6c2VydmVyJ187XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBzb2NrZXRJTywgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8nO1xuaW1wb3J0IHNvY2tldEhhbmRsZXIgZnJvbSAnLi9zb2NrZXQnO1xuXG4vKipcbiAqIEdldCBwb3J0IGZyb20gZW52aXJvbm1lbnQgYW5kIHN0b3JlIGluIEV4cHJlc3MuXG4gKi9cblxuY29uc3QgcG9ydCA9IG5vcm1hbGl6ZVBvcnQocHJvY2Vzcy5lbnYuUE9SVCB8fCAnODAwMCcpO1xuYXBwLnNldCgncG9ydCcsIHBvcnQpO1xuXG4vKipcbiAqIENyZWF0ZSBIVFRQIHNlcnZlci5cbiAqL1xuXG5jb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHApO1xuXG5jb25zdCBpbyA9IHNvY2tldElPKHNlcnZlcik7XG5cbmlvLm9uKCdjb25uZWN0aW9uJywgKHNvY2tldDogU29ja2V0KSA9PiB7XG4gIHNvY2tldEhhbmRsZXIoc29ja2V0KTtcbn0pO1xuXG4vKipcbiAqIExpc3RlbiBvbiBwcm92aWRlZCBwb3J0LCBvbiBhbGwgbmV0d29yayBpbnRlcmZhY2VzLlxuICovXG5cbnNlcnZlci5saXN0ZW4ocG9ydCk7XG5zZXJ2ZXIub24oJ2Vycm9yJywgb25FcnJvcik7XG5zZXJ2ZXIub24oJ2xpc3RlbmluZycsIG9uTGlzdGVuaW5nKTtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSBwb3J0IGludG8gYSBudW1iZXIsIHN0cmluZywgb3IgZmFsc2UuXG4gKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplUG9ydCh2YWwpIHtcbiAgY29uc3QgcG9ydCA9IHBhcnNlSW50KHZhbCwgMTApO1xuXG4gIGlmIChpc05hTihwb3J0KSkge1xuICAgIC8vIG5hbWVkIHBpcGVcbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgaWYgKHBvcnQgPj0gMCkge1xuICAgIC8vIHBvcnQgbnVtYmVyXG4gICAgcmV0dXJuIHBvcnQ7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogRXZlbnQgbGlzdGVuZXIgZm9yIEhUVFAgc2VydmVyIFwiZXJyb3JcIiBldmVudC5cbiAqL1xuXG5mdW5jdGlvbiBvbkVycm9yKGVycm9yKSB7XG4gIGlmIChlcnJvci5zeXNjYWxsICE9PSAnbGlzdGVuJykge1xuICAgIHRocm93IGVycm9yO1xuICB9XG5cbiAgY29uc3QgYmluZCA9IHR5cGVvZiBwb3J0ID09PSAnc3RyaW5nJyA/ICdQaXBlICcgKyBwb3J0IDogJ1BvcnQgJyArIHBvcnQ7XG5cbiAgLy8gaGFuZGxlIHNwZWNpZmljIGxpc3RlbiBlcnJvcnMgd2l0aCBmcmllbmRseSBtZXNzYWdlc1xuICBzd2l0Y2ggKGVycm9yLmNvZGUpIHtcbiAgICBjYXNlICdFQUNDRVMnOlxuICAgICAgY29uc29sZS5lcnJvcihiaW5kICsgJyByZXF1aXJlcyBlbGV2YXRlZCBwcml2aWxlZ2VzJyk7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdFQUREUklOVVNFJzpcbiAgICAgIGNvbnNvbGUuZXJyb3IoYmluZCArICcgaXMgYWxyZWFkeSBpbiB1c2UnKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG4vKipcbiAqIEV2ZW50IGxpc3RlbmVyIGZvciBIVFRQIHNlcnZlciBcImxpc3RlbmluZ1wiIGV2ZW50LlxuICovXG5cbmZ1bmN0aW9uIG9uTGlzdGVuaW5nKCkge1xuICBjb25zdCBhZGRyID0gc2VydmVyLmFkZHJlc3MoKTtcbiAgY29uc3QgYmluZCA9IHR5cGVvZiBhZGRyID09PSAnc3RyaW5nJyA/ICdwaXBlICcgKyBhZGRyIDogJ3BvcnQgJyArIGFkZHIucG9ydDtcbiAgLy8gZGVidWcoJ0xpc3RlbmluZyBvbiAnICsgYmluZCk7XG4gIGNvbnNvbGUubG9nKCdMaXN0ZW5pbmcgb24gJyArIGJpbmQpO1xufVxuIl19