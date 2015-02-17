/* jshint mocha: true, expr: true, strict: false, undef: false */

describe('beforeEach test', function () {
  beforeEach(function(done) {
    if (window.__karma__) {
      $('body').empty();
      $('body').append($('<div class="tasks"></div>'));
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

describe('getNewToDo', function () {
  it('should clear the input value', function () {
    var input = $('<input id="newToDo" value="this is a value">');
    $('.tasks').append(input);
    var valueInput = input;
    console.log(valueInput);
    input.length.should.equal('');
//    $('#addNewToDo').click();
//    getNewToDo()
//    $('input').text.should.equal('');
  });
});//end of getNewToDo
