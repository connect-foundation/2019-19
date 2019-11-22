const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('./middleware/passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const oauthRouter = require('./routes/oauth');
const videoRouter = require('./routes/video');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/oauth', oauthRouter);
app.use('/video', videoRouter);

module.exports = app;
