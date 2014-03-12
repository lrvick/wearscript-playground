'use strict';

describe('Service: Playground', function () {

  // load the service's module
  beforeEach(module('wearscriptPlaygroundApp'));

  // instantiate service
  var Playground;
  beforeEach(inject(function (_Playground_) {
    Playground = _Playground_;
  }));

  it('should do something', function () {
    expect(!!Playground).toBe(true);
  });

});
