var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var volleyball = require('volleyball');
var mongoose = require('mongoose');
var ToDoItem = require('./models/ToDoItem');

var index = require('./routes/index');
var users = require('./routes/users');

if (!process.env.mongoUrl) {
  throw new Error('You need to specify a mongodb connection url!');
}

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoUrl, { useMongoClient: true });


var app = express();

app.use(volleyball);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/api/toDo', (req, res) => {
  ToDoItem.find({}).then(item => res.json(item));
});

app.post('/api/toDo', (req, res) => {
  ToDoItem.create({
    text: req.body.text,
    completed: req.body.completed,
    created: req.body.created,
    lastUpdated: req.body.lastUpdated,
  }).then(item => res.json(item));
});

app.get('/api/toDo/:toDo_id', (req, res) => {
  ToDoItem.findById(req.params.toDo_id).then((err, item) => {
    if (err) {
      res.send(err);
      return;
    }
    res.json(item);
  })
});

app.put('/api/toDo/:toDo_id', (req, res) => {
  ToDoItem.findOneAndUpdate(
    { _id: req.params.toDo_id },
    {
      text: req.body.text,
      lastUpdated: req.body.lastUpdated
    }).then(item => {
      res.json(item);
    });
});

app.delete('/api/toDo/:toDo_id', (req, res) => {
  ToDoItem.findOneAndRemove({
    _id: req.params.toDo_id
  }).then(item => {
    res.json(item);
  });
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
