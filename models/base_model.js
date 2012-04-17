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

  this.incrementKey = function(callback)
  {
    this.getConnection().incr(this.getBaseString() + '.next_id',
        callback
    );
  }
};


