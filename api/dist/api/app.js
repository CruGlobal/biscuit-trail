"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const package_json_1 = __importDefault(require("../package.json"));
const express_useragent_1 = __importDefault(require("express-useragent"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const apiUtils_1 = require("./apiUtils");
// Production should be loaded from env variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // load enviroment variables
}
const app = express_1.default();
// Enable CORS for all requests
app.use(cors_1.default());
app.options('*', cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_useragent_1.default.express());
app.set('view engine', 'html');
app.use('/', routes_1.default);
app.get('/version', async (req, res) => {
    return apiUtils_1.success(res, {
        version: package_json_1.default.version,
        message: 'Welcome to Digital Biscuit Trail',
        environment: process.env.NODE_ENV || 'development',
    });
});
function notFoundRoute(req, res) {
    if (req.url !== '/') {
        console.log('ERROR: route not found', { route: req.url, method: req.method, ip: apiUtils_1.getIpAddress(req) });
    }
    return apiUtils_1.notFound(res, {
        message: `Sorry, that route was not found`,
    });
}
app.get('*', notFoundRoute);
app.put('*', notFoundRoute);
app.post('*', notFoundRoute);
app.delete('*', notFoundRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next({ message: 'Not Found', status: 404 });
});
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXBpL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUFtRTtBQUNuRSxrRUFBeUM7QUFDekMsOERBQXFDO0FBQ3JDLG1FQUEwQztBQUMxQywwRUFBMEM7QUFDMUMsZ0RBQXdCO0FBQ3hCLHNEQUE4QjtBQUM5Qix5Q0FBNkQ7QUFFN0QsaURBQWlEO0FBQ2pELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO0lBQ3pDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLDRCQUE0QjtDQUN6RDtBQUVELE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0QiwrQkFBK0I7QUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGNBQUksRUFBRSxDQUFDLENBQUM7QUFDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyx1QkFBWSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLDJCQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUUvQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQkFBTSxDQUFDLENBQUM7QUFFckIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNyQyxPQUFPLGtCQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2xCLE9BQU8sRUFBRSxzQkFBVyxDQUFDLE9BQU87UUFDNUIsT0FBTyxFQUFFLGtDQUFrQztRQUMzQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYTtLQUNuRCxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUFDLEdBQVksRUFBRSxHQUFhO0lBQ2hELElBQUksR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUU7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSx1QkFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN0RztJQUVELE9BQU8sbUJBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDbkIsT0FBTyxFQUFFLGlDQUFpQztLQUMzQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDN0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFFL0IseUNBQXlDO0FBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQy9ELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBeUMsRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQzFHLGtEQUFrRDtJQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ2pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFbkUsd0JBQXdCO0lBQ3hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQztJQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MsIHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHVzZXJhZ2VudCBmcm9tICdleHByZXNzLXVzZXJhZ2VudCc7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IHsgc3VjY2VzcywgZ2V0SXBBZGRyZXNzLCBub3RGb3VuZCB9IGZyb20gJy4vYXBpVXRpbHMnO1xuXG4vLyBQcm9kdWN0aW9uIHNob3VsZCBiZSBsb2FkZWQgZnJvbSBlbnYgdmFyaWFibGVzXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICByZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTsgLy8gbG9hZCBlbnZpcm9tZW50IHZhcmlhYmxlc1xufVxuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbi8vIEVuYWJsZSBDT1JTIGZvciBhbGwgcmVxdWVzdHNcbmFwcC51c2UoY29ycygpKTtcbmFwcC5vcHRpb25zKCcqJywgY29ycygpKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG5hcHAudXNlKHVzZXJhZ2VudC5leHByZXNzKCkpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaHRtbCcpO1xuXG5hcHAudXNlKCcvJywgcm91dGVzKTtcblxuYXBwLmdldCgnL3ZlcnNpb24nLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgcmV0dXJuIHN1Y2Nlc3MocmVzLCB7XG4gICAgdmVyc2lvbjogcGFja2FnZUpzb24udmVyc2lvbixcbiAgICBtZXNzYWdlOiAnV2VsY29tZSB0byBEaWdpdGFsIEJpc2N1aXQgVHJhaWwnLFxuICAgIGVudmlyb25tZW50OiBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnLFxuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBub3RGb3VuZFJvdXRlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICBpZiAocmVxLnVybCAhPT0gJy8nKSB7XG4gICAgY29uc29sZS5sb2coJ0VSUk9SOiByb3V0ZSBub3QgZm91bmQnLCB7IHJvdXRlOiByZXEudXJsLCBtZXRob2Q6IHJlcS5tZXRob2QsIGlwOiBnZXRJcEFkZHJlc3MocmVxKSB9KTtcbiAgfVxuXG4gIHJldHVybiBub3RGb3VuZChyZXMsIHtcbiAgICBtZXNzYWdlOiBgU29ycnksIHRoYXQgcm91dGUgd2FzIG5vdCBmb3VuZGAsXG4gIH0pO1xufVxuXG5hcHAuZ2V0KCcqJywgbm90Rm91bmRSb3V0ZSk7XG5hcHAucHV0KCcqJywgbm90Rm91bmRSb3V0ZSk7XG5hcHAucG9zdCgnKicsIG5vdEZvdW5kUm91dGUpO1xuYXBwLmRlbGV0ZSgnKicsIG5vdEZvdW5kUm91dGUpO1xuXG4vLyBjYXRjaCA0MDQgYW5kIGZvcndhcmQgdG8gZXJyb3IgaGFuZGxlclxuYXBwLnVzZShmdW5jdGlvbiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcbiAgbmV4dCh7IG1lc3NhZ2U6ICdOb3QgRm91bmQnLCBzdGF0dXM6IDQwNCB9KTtcbn0pO1xuXG5hcHAudXNlKGZ1bmN0aW9uIChlcnI6IHsgbWVzc2FnZTogc3RyaW5nOyBzdGF0dXM/OiBudW1iZXIgfSwgcmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcbiAgLy8gc2V0IGxvY2Fscywgb25seSBwcm92aWRpbmcgZXJyb3IgaW4gZGV2ZWxvcG1lbnRcbiAgcmVzLmxvY2Fscy5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gIHJlcy5sb2NhbHMuZXJyb3IgPSByZXEuYXBwLmdldCgnZW52JykgPT09ICdkZXZlbG9wbWVudCcgPyBlcnIgOiB7fTtcblxuICAvLyByZW5kZXIgdGhlIGVycm9yIHBhZ2VcbiAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gIHJlcy5yZW5kZXIoJ2Vycm9yJyk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuIl19