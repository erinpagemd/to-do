/* jshint mocha: true, expr: true, strict: false, undef: false */

describe('beforeEach test', function () {
  beforeEach(function(done) {
    //stuff
    done();
  });
});

describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});

describe('getNewToDo', function () {
  it('should clear the input value', function () {
    var input = $('<input id="newToDo" value"this is value">');
//    $('#newToDo').val.should.equal('');
//    $('#addNewToDo').click();
//    getNewToDo()
//    $('input').text.should.equal('');
  });
});//end of getNewToDo
