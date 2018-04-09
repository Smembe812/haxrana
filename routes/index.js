var models = require('../models')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Album.findAll(
    {include: [models.Song]}
  ).then(function(albums){
    res.status(200).json(albums);
  }).catch(function(err){
    console.log(err);
  })
});

module.exports = router;
