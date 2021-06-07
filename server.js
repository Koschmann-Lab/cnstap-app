const express = require('express');
const app = express();
// morgan logs all requests in the terminal
const morgan = require('morgan');
const bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');
var path = require('path');

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static(path.join(__dirname, 'web'));

// 1st call for unredirected requests
app.use(staticFileMiddleware);

// Support history api
app.use(history());

// 2nd call for redirected requests
app.use(staticFileMiddleware);

var port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method ==="OPTIONS"){
    res.header('Access-Control-Allow-Methods','PUT, POST, PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

// Error handling
app.use((req,res,next) => {
  const error = new Error('Not found');
  error.status= 404;
  next(error);
})

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  });
});
