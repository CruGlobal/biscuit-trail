import express, { Request, Response, NextFunction, RequestHandler } from 'express';

import * as utils from '../../utils';
import * as apiUtils from '../apiUtils';

const router = express.Router();

const API = '/api';

// Short text for 'validate' that goes onto each route that needs to be validated
function reqLogger(req: Request, res: Response, next: NextFunction) {
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

router.get( '/monitors/lb', (req, res) => res.status(200).send('OK').contentType('text/plain'));
router.get(`${API}/ping`, (req, res) => apiUtils.success(res, true));
router.get('/favicon.ico', (req, res) => res.status(204));

type RouteConfig = {
  url: string;
  action: RequestHandler;
  method: 'get' | 'post' | 'put' | 'delete';
  isAnonymous?: boolean;
};
const routes: RouteConfig[] = [];

routes.forEach((r) => {
  const url = `${API}/${r.url}`;
  if (r.method === 'get') {
    router.get(url, reqLogger, r.action);
  } else if (r.method === 'post') {
    router.post(url, reqLogger, r.action);
  } else if (r.method === 'put') {
    router.put(url, reqLogger, r.action);
  } else if (r.method === 'delete') {
    router.delete(url, reqLogger, r.action);
  }
});

export default router;
