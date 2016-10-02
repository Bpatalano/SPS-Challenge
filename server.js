var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var router = express.Router();
var app = express();

app.set('port', (process.env.PORT || 1337));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('trust proxy', 1)


app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'bob',
  keys: ['secret']
}));
app.use(router);
app.use(express.static(__dirname + '/public'));

router.get('/', function(req, res){
  res.render('upload');
});
router.post('/upload', function(req,res){
  req.session.order = req.body;
  res.send('/edit');
});
router.get('/edit', function(req,res){
  res.render('index')
});
router.get('/checkout', function(req, res){
  res.render('checkout');
});
router.get('/session', function(req, res){
  res.send(req.session.order);
});
router.post('/', function(req, res){
  req.session.order = req.body;
  res.send('/checkout');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});