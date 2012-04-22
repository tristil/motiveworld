redis = require('redis'),
DatabaseManager = require('../database').DatabaseManager,
BaseModel = require('../models/base_model').BaseModel,
Record = require('../models/record').Record;

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

      it('should create new records', function()
          {
            var base_model = new BaseModel();
            var record = base_model.create();
          }
      );

      it('save should require data', function()
        {
          var base_model = new BaseModel();
          (function() {
            base_model.save();
              }).should.throw();

          (function() {
            base_model.save({name : 'Joe'});
          }).should.not.throw();
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
            base_model.findById(next_id, function(err, record)
              {
                record.should.be.an.instanceof(Record);
                record.getData().should.eql({
                  name      : 'Joe',
                  haircolor : 'brown'
                });
                record.getId().should.eql(next_id);
                done();
              }
            );
          }
          );
        }
        );

      it('should update a saved hash', function(done)
        {
          var base_model = new BaseModel();
          base_model.save(
          {
            name      : 'Joe',
            haircolor : 'brown'
          },
          function(err, next_id)
          {
            base_model.update(
              next_id,
              {
                name      : 'Bob',
                haircolor : 'blonde'
              },
              function(err)
              {
                base_model.findById(next_id, function(err, record)
                {
                  record.getData().should.eql({
                    name      : 'Bob',
                    haircolor : 'blonde'
                  });
                  done();
                });
              }
            );
          }
          );
        }
        );

    }
);
