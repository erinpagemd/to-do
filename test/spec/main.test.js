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
  var data = {task: 'this is a task'};
  var uuid = '8675309';

  var toTest = makeTaskDiv(uuid, data);

  console.log(toTest, toTest.data('uuid'));

  it('should have one li child', function () {
    expect(toTest.children('li').length).to.equal(1);
  });
  it('should give a data attribute to the div', function () {
    expect(toTest.data('uuid')).to.equal(8675309);
  });
  //the text of the li should be the data.task
});// end makeTaskDiv

describe('addNewToDo', function () {
  it('should empty the div with class tasks', function () {
    var $divToEmpty = $('<div class="tasks"></div>');
    $('body').append($divToEmpty);
    var $divToClear = $('<div></div>');
    $divToEmpty.append($divToClear);
    var event = {};
    event.preventDefault = function () {};

    expect($divToEmpty.children().length).to.equal(1);
    addNewToDo(event);
    expect($divToEmpty.children().length).to.equal(0);
  });
});// end addNewToDo

describe('getNewToDo', function () {
  it('should clear the input value', function () {
    var $input = $('<input id="newToDo" value="this is a value">');
    $('body').append($input);
    var event = {};
    event.preventDefault = function () {};

    $input.val().should.equal('this is a value');
    getNewToDo(event);
    $('input').val().should.equal('');
  });
  // it('should return the input start value', function () {
  //   //newToDo = 'this is a value'
  // });
});//end of getNewToDo
