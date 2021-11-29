const MongoDBModule = require('../../mongodb.module')
  , MongoDBUtil = require('../../mongodb.module').MongoDBUtil;

describe('MongoDBModule', function () { 
  describe('mongodb.module file', function () { 
    it('should read the mongodb.module file', function () {
      expect(typeof MongoDBModule).toBe('object');
    });
    it('should confirm MongoDBUtil exist', function () {
      expect(typeof MongoDBUtil).toBe('object');
    });
  });
});
  