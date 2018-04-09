var models = require('../models')
var express = require('express');
var router = express.Router();

/**
 * [retrieve all the albums]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
router.get('/', function(req, res, next) {
  models.Album.findAll().then(
    function(albums){
      res.status(200).json(albums);
  }).catch(function(err){
    console.log(err);
  })
});

/**
 * [retrieve a single album]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
router.get('/:id', function(req, res, next) {
  let id = req.params.id;

  models.Album.findOne(
    {
      include: [models.Song],
      where: {id}
    }
  ).then(
    function(albums){
      res.status(200).json(albums);
  }).catch(function(err){
    console.log(err);
  })
});

/**
 * [post a new album]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
router.post('/', function(req, res, next){
  let name = req.body.name,
      year = req.body.year,
      genre = req.body.genre,
      artist = req.body.artist,

      album = {name, year, genre, artist}


  models.Album.create(album)
  .then(function(album){
    res.json(album);
  }).catch(function(err){
    res.json(err)
  });
})

/**
 * [delete an album]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
router.delete('/:id', function(req, res, next){
  let id = req.params.id;

  models.Album.destroy(
    {where: {id}}
  ).then(function(){
    let response = {
      success: 'true',
      message: 'album been deleted'
    }

    res.status(201).json(response);
  })
  .catch(function(err){
    res.json(err);
  })
})

module.exports = router;
