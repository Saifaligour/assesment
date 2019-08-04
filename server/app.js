let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let expressValidators = require('express-validator')
let cors = require('cors')
let bodyParser = require('body-parser')
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();
const db = require('./db/databse');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidators());


//options for cors midddleware
let allowedOrigins = ['http://localhost:4200', 'http://localhost:4300', 'http://wallebi.com'];

app.use(cors({
  credentials: true,
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  origin: (origin, callback) => {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      let msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
