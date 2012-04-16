describe("jasmine.slow below threshold", function() {
  var clock = sinon.useFakeTimers();
  var log = jasmine.createSpy("log");
  window.console.log = log;

  beforeEach(function(){
    clock = sinon.useFakeTimers();
  });

  describe("#enable", function() {
    describe("when specs take longer than the threshold", function() {
      describe("when passed a threshold", function() {
        beforeEach(function() {
          jasmine.slow.enable(25);

          afterEach(function() {
            expect(window.console.log.callCount).toEqual(0);
          });
        });

        it("should not log this spec", function() {
          clock.tick(24);
        });
      });

      describe("when not passed a threshold", function() {
        beforeEach(function() {
          jasmine.slow.enable();

          afterEach(function() {
            expect(window.console.log.callCount).toEqual(0);
          });
        });

        it("should not log specs that are faster than the default 75ms", function() {
          clock.tick(74);
        });
      });
    });
  });
});
