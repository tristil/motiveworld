var redis = require('redis'),
    fakeredis = require('fakeredis');

module.exports.DatabaseManager = new function()
{
  this.test = false;

  this.getRedis = function()
  {
    return this.test ? fakeredis : redis;
  };

  this.getClient = function()
  {
    var client = this.getRedis().createClient();
    client.on('error', function(err) {
      console.log("Error: " + err);
    });

    return client;
  };
};
