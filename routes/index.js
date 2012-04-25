exports.index = function(app, io)
{
  var self = this;
  self.socket = null;
  self.app = app;
  self.io = io;
  var Person  = require('../models/person').Person;
  self.person_model = new Person();

  self.io.sockets.on('connection', function(socket) {
    console.log('Welcome!');
    self.socket = socket;
    self.socket.on('hello', function()
      {
        console.log('Oh, hello');
      }
    );
  });

  this.view = function(req, res)
  {
    self.person_model  = new Person();
    var people = [];

    self.person_model.findAll(
        function(err, people)
        {
          res.render('index', { title: 'MotiveWorld', people : people});
        }
        );

  };

  this.post = function(req, res)
  {
    if(req.body.name)
    {
      var person = self.person_model.create();
      person.setData({name : req.body.name});
      person.save(
          function(err, next_id)
          {
            console.log('Person added');
            if(self.socket)
            {
              self.socket.emit('person-added', {id : next_id, name : req.body.name });
            }
            res.send('1');
            return;
          }
          );
    }
    else
    {
      res.send('0');
    }
  };

  app.get('/', this.view);
  app.post('/', this.post);
};


