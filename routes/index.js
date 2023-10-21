var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Alexander Raul Almaguer Orta Ci. 30.626.438 seccion 2' });
});

module.exports = router;
