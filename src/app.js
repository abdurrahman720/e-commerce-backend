import cookieParser from 'cookie-parser';

import cors from 'cors';
import express from 'express';
import httpStatus from 'http-status';

import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import router from './app/routes/routes.js';
import config from './config/config.js';

const app = express();
app.use(
  cors({
    origin: '*',
  }),
);
app.use(cookieParser());

// parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// app.use(bodyParser.json({limit:'50mb'}));

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

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}`);
});

export default app;
