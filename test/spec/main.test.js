/* jshint mocha: true, expr: true, strict: false, undef: false */

describe('beforeEach test', function () {
  beforeEach(function(done) {
    $('body').empty();
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
  var $divToRemove = $('<div class="tableBody"></div>');
  $('body').append($divToRemove);
  var $target = $('<div class="target"></div>');
  $divToRemove.append($target);
  var event = {};
  event.preventDefault = function () {};

  //not sure how to use event.target here.
  // console.log($divToRemove);
  //
  // removeTask(event);
  //
  // console.log($divToRemove);


})//end removeTask

describe('getExistingTasks', function () {
  //test the things
})//end getExisting Tasks

describe('loadTask', function () {

  it('should make an array of tasks', function () {
    var $divToEmpty = $('<div class="tasks"></div>');
    $('body').append($divToEmpty);
    var data = { task: 'get jenny number' };
    var uuid = '8675309';
    var loaded = loadTask(uuid, data);

    expect(loaded).to.be.an('array');
    expect(loaded.length).to.equal(1);
  });

});//end loadTask

describe('makeTaskDiv', function () {
  var data = { task: 'get jenny number' };
  var uuid = '8675309';

  var div = makeTaskDiv(uuid, data);
  var li = div.children('li');

  it('should have one li child', function () {
    expect(div.children('li').length).to.equal(1);
  });
  it('should give a data attribute to the div', function () {
    expect(div.data('uuid')).to.equal(8675309);
  });
  it('should have a text node equal to data.taskx (bc of the button text of x) on the li', function () {
    expect(li.text()).to.equal('get jenny numberx');
  });

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
