var Record = require('../models/record').Record;

describe('Record', function()
    {
      it('should be initialized with a model', function()
        {
          (function() { new Record();}).should.throw();
        }
        );

      it('should set and retrieve data', function()
        {
          var base_model = new BaseModel();
          var record = new Record(base_model);
          record.setData(
          {
            name : 'Joe',
            haircolor : 'brown'
          }
          );

          record.getData().should.eql({name : 'Joe', haircolor : 'brown'});
        }
        );

      it('should save', function(done)
        {
          var base_model = new BaseModel();
          var record = base_model.create();
          record.setData(
          {
            name : 'Joe',
            haircolor : 'brown'
          }
          );

          record.save(
            function(err, next_id) {
              next_id.should.eql(1);
              record.getId().should.eql(1);
              done();
            }
          );
        }
        );

      it('should update', function(done)
        {
          var base_model = new BaseModel();
          var record = base_model.create();
          record.setData(
          {
            name : 'Joe',
            haircolor : 'brown'
          }
          );

          record.save(
            function(err, next_id) {
              record.setData( { name : 'Bob', haircolor : 'blonde' } );
              record.update(
                function(err) {
                  base_model.findById(next_id, function(err, new_record)
                    {
                      new_record.getData().should.eql({ name : 'Bob', haircolor : 'blonde'});
                      done();
                    }
                  );
                }
              );
            }
          );

        }
        );


    }
);


