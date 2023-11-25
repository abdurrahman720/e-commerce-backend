import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import httpStatus from 'http-status';

import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import router from './app/routes/routes.js';

const app = express();
app.use(
  cors({
    origin: '*',
  }),
);
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// all routes
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Welcome to  E-Commerce Backend');
});

// global error handler
app.use(globalErrorHandler);

// handle not found routes
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `Can't find ${req.originalUrl} on account server!`,
    errorMessages: [
      {
        path: req.originalUrl,
        message: `Api not found!`,
      },
    ],
  });
  next();
});

export default app;
