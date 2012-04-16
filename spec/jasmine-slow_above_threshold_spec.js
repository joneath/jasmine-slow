describe("jasmine.slow above threshold", function() {
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
            expect(window.console.log.callCount).toEqual(1);
          });
        });

        it("should log this spec", function() {
          clock.tick(26);
        });
      });

      describe("when not passed a threshold", function() {
        beforeEach(function() {
          jasmine.slow.enable();

          afterEach(function() {
            expect(window.console.log.callCount).toEqual(2);
          });
        });

        it("should log specs that take longer than the default 75ms", function() {
          clock.tick(76);
        });
      });
    });
  });
});
