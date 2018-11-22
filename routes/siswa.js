var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Siswa.findAll().then(siswas => {
    res.render('siswa/index',{siswas: siswas})
  }).catch(err => {
    console.log(err)
    res.render('siswa/index')
  })
});

module.exports = router;
