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

      it('should increment the next_id', function()
        {
          new BaseModel().incrementKey(
            function(err, obj){
              obj.should.eql(1);
            }
          );
        }
        );
    }
);
