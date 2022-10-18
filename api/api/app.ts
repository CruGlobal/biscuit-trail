import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import packageJson from '../package.json';
import useragent from 'express-useragent';
import cors from 'cors';
import routes from './routes';
import { success, getIpAddress, notFound } from './apiUtils';

// Production should be loaded from env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // load enviroment variables
}

const app = express();

// Enable CORS for all requests
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
app.use(cookieParser());
app.use(useragent.express());
app.set('view engine', 'html');

app.use('/', routes);

app.get('/monitors/lb', async (req, res) => {
  return success(res, {
    message: 'OK'
  })
})

app.get('/version', async (req, res) => {
  return success(res, {
    version: packageJson.version,
    message: 'Welcome to Digital Biscuit Trail',
    environment: process.env.NODE_ENV || 'development',
  });
});

function notFoundRoute(req: Request, res: Response) {
  if (req.url !== '/') {
    console.log('ERROR: route not found', { route: req.url, method: req.method, ip: getIpAddress(req) });
  }

  return notFound(res, {
    message: `Sorry, that route was not found`,
  });
}

app.get('*', notFoundRoute);
app.put('*', notFoundRoute);
app.post('*', notFoundRoute);
app.delete('*', notFoundRoute);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next({ message: 'Not Found', status: 404 });
});

app.use(function (err: { message: string; status?: number }, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
