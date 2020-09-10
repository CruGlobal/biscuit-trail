"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiUtils = __importStar(require("../apiUtils"));
const router = express_1.default.Router();
const API = '/api';
// Short text for 'validate' that goes onto each route that needs to be validated
function reqLogger(req, res, next) {
    const ip = apiUtils.getIpAddress(req);
    let body = req.body;
    if (req.body && req.body.password) {
        // Copy the body and remove the password from logging
        body = JSON.parse(JSON.stringify(req.body));
        if (body.password || body.oldPassword || body.newPassword) {
            delete body.password;
            delete body.oldPassword;
            delete body.newPassword;
        }
    }
    console.log('ROUTE:', { route: req.url, method: req.method, ip, body: body });
    return next();
}
router.get(`${API}/ping`, (req, res) => apiUtils.success(res, true));
router.get('/favicon.ico', (req, res) => res.status(204));
const routes = [];
routes.forEach((r) => {
    const url = `${API}/${r.url}`;
    if (r.method === 'get') {
        router.get(url, reqLogger, r.action);
    }
    else if (r.method === 'post') {
        router.post(url, reqLogger, r.action);
    }
    else if (r.method === 'put') {
        router.put(url, reqLogger, r.action);
    }
    else if (r.method === 'delete') {
        router.delete(url, reqLogger, r.action);
    }
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcGkvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFtRjtBQUduRixzREFBd0M7QUFFeEMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUM7QUFFbkIsaUZBQWlGO0FBQ2pGLFNBQVMsU0FBUyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7SUFDaEUsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3BCLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNqQyxxREFBcUQ7UUFDckQsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3pELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3pCO0tBQ0Y7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUU5RSxPQUFPLElBQUksRUFBRSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBUTFELE1BQU0sTUFBTSxHQUFrQixFQUFFLENBQUM7QUFFakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ25CLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM5QixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdEM7U0FBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdkM7U0FBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdEM7U0FBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDekM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzLCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24sIFJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCAqIGFzIGFwaVV0aWxzIGZyb20gJy4uL2FwaVV0aWxzJztcblxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuY29uc3QgQVBJID0gJy9hcGknO1xuXG4vLyBTaG9ydCB0ZXh0IGZvciAndmFsaWRhdGUnIHRoYXQgZ29lcyBvbnRvIGVhY2ggcm91dGUgdGhhdCBuZWVkcyB0byBiZSB2YWxpZGF0ZWRcbmZ1bmN0aW9uIHJlcUxvZ2dlcihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICBjb25zdCBpcCA9IGFwaVV0aWxzLmdldElwQWRkcmVzcyhyZXEpO1xuICBsZXQgYm9keSA9IHJlcS5ib2R5O1xuICBpZiAocmVxLmJvZHkgJiYgcmVxLmJvZHkucGFzc3dvcmQpIHtcbiAgICAvLyBDb3B5IHRoZSBib2R5IGFuZCByZW1vdmUgdGhlIHBhc3N3b3JkIGZyb20gbG9nZ2luZ1xuICAgIGJvZHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcS5ib2R5KSk7XG4gICAgaWYgKGJvZHkucGFzc3dvcmQgfHwgYm9keS5vbGRQYXNzd29yZCB8fCBib2R5Lm5ld1Bhc3N3b3JkKSB7XG4gICAgICBkZWxldGUgYm9keS5wYXNzd29yZDtcbiAgICAgIGRlbGV0ZSBib2R5Lm9sZFBhc3N3b3JkO1xuICAgICAgZGVsZXRlIGJvZHkubmV3UGFzc3dvcmQ7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKCdST1VURTonLCB7IHJvdXRlOiByZXEudXJsLCBtZXRob2Q6IHJlcS5tZXRob2QsIGlwLCBib2R5OiBib2R5IH0pO1xuXG4gIHJldHVybiBuZXh0KCk7XG59XG5cbnJvdXRlci5nZXQoYCR7QVBJfS9waW5nYCwgKHJlcSwgcmVzKSA9PiBhcGlVdGlscy5zdWNjZXNzKHJlcywgdHJ1ZSkpO1xucm91dGVyLmdldCgnL2Zhdmljb24uaWNvJywgKHJlcSwgcmVzKSA9PiByZXMuc3RhdHVzKDIwNCkpO1xuXG50eXBlIFJvdXRlQ29uZmlnID0ge1xuICB1cmw6IHN0cmluZztcbiAgYWN0aW9uOiBSZXF1ZXN0SGFuZGxlcjtcbiAgbWV0aG9kOiAnZ2V0JyB8ICdwb3N0JyB8ICdwdXQnIHwgJ2RlbGV0ZSc7XG4gIGlzQW5vbnltb3VzPzogYm9vbGVhbjtcbn07XG5jb25zdCByb3V0ZXM6IFJvdXRlQ29uZmlnW10gPSBbXTtcblxucm91dGVzLmZvckVhY2goKHIpID0+IHtcbiAgY29uc3QgdXJsID0gYCR7QVBJfS8ke3IudXJsfWA7XG4gIGlmIChyLm1ldGhvZCA9PT0gJ2dldCcpIHtcbiAgICByb3V0ZXIuZ2V0KHVybCwgcmVxTG9nZ2VyLCByLmFjdGlvbik7XG4gIH0gZWxzZSBpZiAoci5tZXRob2QgPT09ICdwb3N0Jykge1xuICAgIHJvdXRlci5wb3N0KHVybCwgcmVxTG9nZ2VyLCByLmFjdGlvbik7XG4gIH0gZWxzZSBpZiAoci5tZXRob2QgPT09ICdwdXQnKSB7XG4gICAgcm91dGVyLnB1dCh1cmwsIHJlcUxvZ2dlciwgci5hY3Rpb24pO1xuICB9IGVsc2UgaWYgKHIubWV0aG9kID09PSAnZGVsZXRlJykge1xuICAgIHJvdXRlci5kZWxldGUodXJsLCByZXFMb2dnZXIsIHIuYWN0aW9uKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiJdfQ==