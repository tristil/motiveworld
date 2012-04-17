var util = require('util'),
    BaseModel = require('./base_model').BaseModel;

var Person = function()
{
  this.init = function()
  {
    Person.super_.call(this);
  };

  this.init();
};

util.inherits(Person, BaseModel);

exports.Person = Person;
