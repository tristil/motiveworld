var Person  = require('../models/person').Person;

/*
 * GET home page.
 */

exports.index = function(req, res){

  var people = [];

  person = new Person();

  latest_increment = 0;

  person.incrementKey(function(err, new_increment)
      {
        res.render('index', { title: 'MotiveWorld', increment : new_increment})
      }
  );

  /*
        client.hmset(
        'motiveworld:people:' + next_id,
        {
          name      : 'Barb',
          religion  : 'Christian'
        }
        );

        client.lpush('motiveworld:people.ids', next_id);

        var people_ids = client.lrange('motiveworld:people.ids', 0, -1,
          function(err, replies)
          {
            for(var i = 0; i < replies.length; i++)
            {
              var id = replies[i];
              client.hgetall('motiveworld:people:' + id, function(err, obj)
                {
                  people.push(obj);
                }
                );
            }
          }
        );
  t remote add origin git@github.com:tristil/motiveworld.gitkkkkkk*/
};
