var Person = require('../models/person').Person,
    should = require('should');

describe('Person', function()
    {
      it('should be initialized', function()
        {
          new Person();
        }
        );

      it('should have BaseModel methods', function()
        {
          new Person().should.have.property('getConnection');
        }
        );

      it('should have the correct base-string', function()
        {
          new Person().getBaseString().should.eql('motiveworld:people');
        }
      );

      it('should save, retrieve and update records', function(done)
        {
          var person_model  = new Person();

          var person = person_model.create();
          person.setData({name : 'Joe', haircolor : 'brown'});
          person.save(
            function(err, id) {
              person_model.findById(id, function(err, record)
                {
                  if(err)
                  {
                    throw err;
                  }
                  record.setData({name : 'Bob', haircolor : 'blonde'});
                  record.update(
                    function(err){
                      if(err)
                      {
                        throw err;
                      }
                      person_model.findById(id, function(err, updated_record)
                        {
                          if(err)
                          {
                            throw err;
                          }
                          updated_record.getData().should.eql({name : 'Bob', haircolor : 'blonde'});
                          done();
                        });
                    });
                });
            });
        });
    });
