'use strict';
module.exports = (sequelize, DataTypes) => {
  var Album = sequelize.define('Album', {
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    year: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.hasMany(models.Song)
  };
  return Album;
};
