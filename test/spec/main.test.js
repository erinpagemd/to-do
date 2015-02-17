/* jshint mocha: true, expr: true, strict: false, undef: false */

describe('beforeEach test', function () {
  beforeEach(function(done) {
    if (window.__karma__) {
      $('body').empty();
    }
    done();
  });//end beforeEach
});//end describe beforeEach

describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});//end ts

describe('removeTask', function () {
  //test the things
})//end removeTask

describe('getExistingTasks', function () {
  //test the things
})//end getExisting Tasks

describe('loadTask', function () {
  //here it goes
})//end loadTask

describe('makeTaskDiv', function () {
  //it should do the things
})// end makeTaskDiv

describe('addNewToDo', function () {
  //it should do things
})// end addNewToDo

describe('getNewToDo', function () {
  var input = $('<input id="newToDo" value="this is a value">');
  $('body').append(input);
  var event = {};
  event.preventDefault = function () {};

  it('should clear the input value', function () {
    input.val().should.equal('this is a value');
    getNewToDo(event);
    $('input').val().should.equal('');
  });
  it('should return the input start value', function () {
    //newToDo = 'this is a value'
  });
});//end of getNewToDo
