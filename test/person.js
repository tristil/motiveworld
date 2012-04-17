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
    }
);
