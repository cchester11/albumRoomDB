// init express instance
const express = require('express');
const app = express();

// use helmet to secure request and response
const helmet = require('helmet');
app.use(helmet());

// import env
const dotenv = require('dotenv');
dotenv.config();

// environment variables (used in production)
const PORT = process.env.PORT;
const IP = process.env.IP;
const NODE_ENV = process.env.NODE_ENV;
const IS_LOCAL = NODE_ENV === 'local';

// rate limit handler package
const { rateLimit } = require('express-rate-limit');

// basic packages for server support
const path = require('path');
const cors = require('cors');

// import routes
const routes = require('./routes/index');

// set options for rateLimiter
const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 1000,
      message: "Too many request. Please try again later."
});

// app.use here
app.use(cors());
app.use(limiter);
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use('/', routes);

// serve static files if need be here

// content security policy here; only allow request from approved URL's
//app.use(helmet.contentSecurityPolicy({
      //directives: {
            //defaultSrc: ["'self'"],
            //scriptSrc: ["'self'", add frontend website here],
            //styleSrc: ["'self'", add frontend website here],
            // Add other directives as needed
      //}
//}))

if (IS_LOCAL) {
      app.listen(8000, (err) => {
            if(err) {
                  throw new Error(err)
            }

            console.log('running locally on http://localhost:' + 8000)
      })
} else {
      app.listen(PORT, IP, (err) => {
            if(err) {
                  throw new Error(err)
            } else {
                  console.log('Listening on PORT ' + PORT)
            }
      })
};