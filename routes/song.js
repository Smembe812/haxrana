var models = require('../models')
var express = require('express');
var router = express.Router();

/**
 * [retrieve all the songs]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
router.get('/', function(req, res, next) {
  models.Song.findAll().then(
    function(songs){
      res.status(200).json(songs);
  }).catch(function(err){
    console.log(err);
  })
});

/**
 * [retrieve a single song]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
router.get('/:id', function(req, res, next){
  let id = req.params.id;

  models.Song.findOne(
    {
      include: [models.Album],
      where: {id}
    }
  ).then(function(song){
      res.status(200).json(song);
  }).catch(function(err){
    console.log(err);
  })
})

/**
 * [post a new song]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
router.post('/', function(req, res, next){
  let name = req.body.name,
      year = req.body.year,
      album = req.body.album,
      genre = req.body.genre,
      artist = req.body.artist,
      AlbumId = req.body.albumId,

      song = {name, year, album, genre, artist, AlbumId}


  models.Song.create(
    song,
    {include: [models.Album]}
  ).then(function(song){
    res.json(song);
  }).catch(function(err){
    res.json(err)
  });
})

/**
 * [delete a song]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
router.delete('/:id', function(req, res, next){
  let id = req.params.id;

  models.Song.destroy(
    {where: {id}}
  ).then(function(){
    let response = {
      success: 'true',
      message: 'song been deleted'
    }

    res.status(201).json(response);
  })
  .catch(function(err){
    res.json(err);
  })
})

module.exports = router;
