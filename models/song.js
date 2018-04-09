'use strict';
module.exports = (sequelize, DataTypes) => {
  var Song = sequelize.define('Song', {
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    year: DataTypes.STRING,
    genre: DataTypes.STRING,
    album: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.Album, {
      onDelete: "CASCADE"
    })
  };
  return Song;
};
