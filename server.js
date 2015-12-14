require('dotenv').load();

var fs          = require('fs'),
mongoose        = require('mongoose'),
express         = require('express'),
app             = express(),
path            = require('path'),
bodyParser      = require('body-parser'),
router          = express.Router(),
axios           = require('axios'),
_               = require('lodash'),
passport        = require('passport'),
flash           = require('connect-flash'),
session         = require('express-session'),
morgan          = require('morgan'),
cookieParser    = require('cookie-parser'),
db              = require('./model/db'),
user            = require('./model/user'),
Joke            = require('./model/joke'),
Cat             = require('./model/cat'),
Bubble          = require('./model/catBubble'),
jokeRoutes      = require('./routes/jokeRoutes'),
ballRoutes      = require('./routes/ballRoutes'),
catBubbleRoutes = require('./routes/catBubbleRoutes');





if(process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');

  app.use('/static', express.static('static'));
} else {
  // When not in production, enable hot reloading

  var chokidar = require('chokidar');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  var watcher = chokidar.watch('./server');
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach(function(id) {
        if (/\/server\//.test(id)) delete require.cache[id];
      });
    });
  });
}

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options("*", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
});

app.set('view engine', 'ejs');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash()); // use connect-flash for flash messages stored in session

 

// routes ======================================================================
app.use(session({secret:'ilovegoats'}));
app.use(passport.initialize());
app.use(passport.session());


require('./routes/userRoutes.js')(app, passport);

require('./config/passport')(passport);

app.use('/api/ball',ballRoutes);
app.use('/api/jokes',jokeRoutes);
app.use('/api/catBubble',catBubbleRoutes);
app.use('/api', router);


app.set('port', process.env.PORT || 4000);

var server = app.listen(app.get('port'), function(){ 
  console.log('Express server listening on port ' + server.address().port)
});