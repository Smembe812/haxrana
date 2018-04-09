var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let response = {
    status: "we are live!",
    message: "live, bitchh"
  }
  res.json(response);
});

module.exports = router;
