var Record = function(model, data)
{
  this.id = null;
  this.data = {};

  if(typeof(data) != 'undefined')
  {
    this.data = data;
  }

  if(typeof(model) != 'undefined')
  {
    this.model = model;
  }
  else
  {
    throw new Error('Record must be created with a model');
  }

  this.setData = function(data)
  {
    this.data = data;
  };

  this.getData = function()
  {
    return this.data;
  };

  this.save = function(callback)
  {
    var self = this;
    this.model.save(this.data,
        function(err, next_id)
        {
          self.id = next_id;
          if(typeof(callback) != 'undefined')
          {
            callback(err, next_id);
          }
        }
      );
  }

  this.update = function(callback)
  {
    var self = this;
    this.model.update(
        this.id,
        this.data,
        function(err)
        {
          if(typeof(callback) != 'undefined')
          {
            callback(err);
          }
        }
      );
  }

  this.getId = function()
  {
    return this.id;
  };

};

module.exports.Record = Record
