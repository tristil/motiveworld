var database = require('../database');
var client = database.client;

/*
 * GET home page.
 */

exports.index = function(req, res){

  var people = [];

  client.incr('motiveworld:people.next_id',
      function(err, next_id)
      {
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
      }
  );

  res.render('index', { title: 'MotiveWorld' })
};
