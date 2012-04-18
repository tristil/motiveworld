redis = require('redis'),
DatabaseManager = require('../database').DatabaseManager,
BaseModel = require('../models/base_model').BaseModel;

DatabaseManager.test = true;

describe('BaseModel', function()
    {
      it('should be initialized', function()
        {
          new BaseModel();
        }
        );

      it('should retrieve a client connection', function()
        {
          new BaseModel().getConnection().should.be.an.instanceof(redis.RedisClient);
        }
        );

      it('should build the base key string', function()
        {
          new BaseModel().getBaseString().should.eql('motiveworld:general');
        }
        );

      it('should increment the next_id', function(done)
        {
          var base_model = new BaseModel();
          base_model.incrementKey(
            function(err, first_next_id) {
              first_next_id.should.eql(1);
              base_model.incrementKey(
                function(err, second_next_id) {
                  second_next_id.should.eql(2);
                  done();
                }
              );
            }
          );
        }
        );

      it('should set and retrieve data', function()
        {
          var base_model = new BaseModel();
          base_model.setData(
          {
            name : 'Joe',
            haircolor : 'brown'
          }
          );

          base_model.getData().should.eql({name : 'Joe', haircolor : 'brown'});
        }
        );

      it('should save a new hash', function(done)
        {
          var base_model = new BaseModel();
          base_model.incrementKey(
            function(err, first_next_id)
            {
              base_model.save(
              {
                name      : 'Joe',
                haircolor : 'brown'
              },
              function(err, second_next_id)
              {
                second_next_id.should.eql(2);
                done();
              }
              );
            }
          );
        }
        );

      it('should retrieve a saved hash', function(done)
        {
          var base_model = new BaseModel();
          base_model.save(
          {
            name      : 'Joe',
            haircolor : 'brown'
          },
          function(err, next_id)
          {
            base_model.findById(next_id, function(err, hash)
              {
                hash.should.eql({
                  name      : 'Joe',
                  haircolor : 'brown'
                });
                done();
              }
            );
          }
          );
        }
        );

    }
);
