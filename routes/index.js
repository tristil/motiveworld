var Person  = require('../models/person').Person;

/*
 * GET home page.
 */

exports.index = function(req, res){
  this.person_model  = new Person();

  this.display_people = function()
  {
    var people = [];

    this.person_model.findAll(
        function(err, people)
        {
          res.render('index', { title: 'MotiveWorld', people : people});
        }
    );
  };

  if(req.body.name)
  {
    var person = this.person_model.create();
    person.setData({name : req.body.name});
    person.save(
        function(err, next_id)
        {
          this.display_people();
        }
    );
  }
  else
  {
    this.display_people();
  }

};
