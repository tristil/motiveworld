var Record = require('./record').Record,
    async = require('async');

module.exports.BaseModel = function (options)
{
  this.client = null;
  this.domain = 'motiveworld';
  this.collection = 'general';

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

  this.getIdsString = function()
  {
    return this.domain + ':' + this.collection + '.next_ids';
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
          if(typeof(callback) != 'undefined')
    {
      callback(err, id);
    }
        }
        );
  }

  this.save = function(hash, callback)
  {
    if(typeof(hash) != 'object')
    {
      throw new Error('Require object for save');
    }

    var connection = this.getConnection();
    var base_string = this.getBaseString();
    var ids_string = this.getIdsString();

    this.incrementKey(
        function(err, next_id)
        {
          var key = base_string + ':' + next_id;
          connection.lpush(ids_string, next_id);
          connection.hmset(key, hash);
          if(typeof(callback) != 'undefined')
    {
      callback(err, next_id);
    }
        }
        );
  };

  this.update= function(id, hash, callback)
  {
    if(typeof(id) == 'undefined')
    {
      throw new Error('Require id for update');
    }

    if(typeof(hash) != 'object')
    {
      throw new Error('Require object for save');
    }

    var connection = this.getConnection();
    var base_string = this.getBaseString();

    var key = base_string + ':' + id;
    connection.hmset(key, hash, function(err, obj)
        {
          if(typeof(callback) != 'undefined')
    {
      callback(err);
    }
        }
        );

  };


  this.findById = function(id, callback)
  {
    var self = this;
    var key = this.getRecordKey(id);
    this.getConnection().hgetall(key, function(err, obj)
        {
          var record = new Record(self, obj);
          record.setId(id);
          if(typeof(callback) != 'undefined')
    {
      callback(err, record);
    }
        }
        );
  };

  this.create = function()
  {
    return new Record(this);
  }

  this.findAll = function(callback)
  {
    var self = this;
    this.getConnection().lrange(this.getIdsString(), 0,-1, function(err, ids)
        {
          if(err)
    {
      throw err;
    }

    var fetch_requests = [];

    for(var i = 0; i < ids.length; i++)
    {
      var id = ids[i];

      var request = (function(id) {
        return (function(cb)
        {
          self.findById(id,
            function(err, record)
            {
              cb(err, record);
            }
            );
        });

      })(id);

      fetch_requests.push(request);
    }

    async.parallel(
        fetch_requests,
        function(err, results)
        {
          callback(err, results);
        }
        );
        }
    );
  }

};


