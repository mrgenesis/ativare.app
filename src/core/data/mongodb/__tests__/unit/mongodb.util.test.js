const MongoDBUtil = require('../../mongodb.util');

describe('MongoDBUtil', function () {
  describe('mongo.util file', function () {
    it('should read the mongodb.util file', function () {
      expect(typeof MongoDBUtil).toBe('object');
    });
    it('should confirm init function exist', function () {
      expect(typeof MongoDBUtil.init).toBe('function');
    });
  });
});