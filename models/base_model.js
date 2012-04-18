module.exports.BaseModel = function (options)
{
  this.client = null;
  this.domain = 'motiveworld';
  this.collection = 'general';
  this.data = {};

  this.getConnection = function()
  {
    if(this.client == null)
    {
      var database_manager = require('../database').DatabaseManager;
      this.client = database_manager.getClient();
    }

    return this.client;
  };

  this.getBaseString = function()
  {
    return this.domain + ':' + this.collection;
  };

  this.getRecordKey = function(id)
  {
    return this.getBaseString() + ':' + id;
  };

  this.getNextIdString = function()
  {
    return this.getBaseString() + '.next_id';
  };

  this.incrementKey = function(callback)
  {
    var key = this.getNextIdString();
    this.getConnection().incr(key, function(err, id)
        {
          callback(err, id);
        }
    );
  }

  this.setData = function(data)
  {
    this.data = data;
  };

  this.getData = function()
  {
    return this.data;
  };

  this.save = function(hash, callback)
  {
    var connection = this.getConnection();
    var base_string = this.getBaseString();
    this.incrementKey(
        function(err, next_id)
        {
          var key = base_string + ':' + next_id;
          connection.hmset(key, hash);
          callback(err, next_id);
        }
    );
  };

  this.findById = function(id, callback)
  {
    var key = this.getRecordKey(id);
    this.getConnection().hgetall(key, function(err, obj)
        {
          callback(err, obj);
        }
        );
  };

};


