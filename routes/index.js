
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let name = ''


  res.render('index', {
    title: 'Alexander Raul Almaguer Orta Ci. 30.626.438 Seccion 2',
    name: name,
  });
});

module.exports = router;