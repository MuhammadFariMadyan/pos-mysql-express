var express = require('express');
var router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  models.User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if(user != null){
      const checkPassword = bcrypt.compareSync(password, user.password); // true
      if(checkPassword === true){
        req.session.user = {
          username: user.username
        }
        res.redirect('/siswas')
      }else {
        res.redirect('/users/login')
      }
    }else {
      res.redirect('/users/login')
    }
  })
});

router.get('/logout', (req, res) => {
  // req.session.user = null
  req.session.destroy(function(err) {
    // cannot access session here
    if(err){
      console.log(err)
    }else {
      res.redirect('/users/login')
    }
  })
})

module.exports = router;
