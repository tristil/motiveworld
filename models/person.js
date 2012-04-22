var util = require('util'),
    BaseModel = require('./base_model').BaseModel;

var Person = function()
{
  this.init = function()
  {
    Person.super_.call(this);
  };
  this.init();

  this.domain = 'motiveworld';
  this.collection = 'people';
};

util.inherits(Person, BaseModel);

exports.Person = Person;
