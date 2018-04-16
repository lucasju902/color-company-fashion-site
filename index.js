var express = require('express');
var request = require('request');
var cors = require('cors');
var app = express();

app.use(cors());
app.set('port', (process.env.PORT || 5000));

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/api', function (req, res) {
  request.get('http://hueauto.herokuapp.com/api/main', function (err, resp, body) {
    if (err) res.status(500).json(err)
    var response = body;
    try {
      response = JSON.parse(response)
    }
    catch (err) {
    }
    res.json(response)
  })
});

app.get('/api/login', function (req, res) {
  request.get('http://www.hue-group.com/api/login.jsonp', {qs: req.query}, function (err, resp, body) {
    if (err) res.status(500).json(err)
    var response = body;
    try {
      response = JSON.parse(response)
    }
    catch (err) {
    }
    res.json(response)
  })
});

app.get('/api/logout', function (req, res) {
  request.get('http://www.hue-group.com/api/logout.jsonp', {qs: req.query}, function (err, resp, body) {
    if (err) res.status(500).json(err)
    var response = body;
    try {
      response = JSON.parse(response)
    }
    catch (err) {
    }
    res.json(response)
  })
});

app.get('/api/user', function (req, res) {
  request.get('http://www.hue-group.com/api/user.jsonp', {qs: req.query}, function (err, resp, body) {
    if (err) res.status(500).json(err)
    var response = body;
    try {
      response = JSON.parse(response)
    }
    catch (err) {
    }
    res.json(response)
  })
});

