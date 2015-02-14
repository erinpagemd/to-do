/* jshint node: true */

// var $ = require('jquery'),
//     _ = require('lodash'),
//    Firebase = require('firebase');

var FIREBASE_URL = 'https://honey-dew.firebaseio.com/',
    fb,
    usersFbUrl;

$(document).ready(initialize);
function initialize () {

  $('#addNewToDo').click(addNewToDo);


}//end of initialize

//add the new to-do to firebase
function addNewToDo (event) {
  var url = FIREBASE_URL + '.json';
  var toDoObj = JSON.stringify({task: getNewToDo(event)});
  $.post(url, toDoObj, function(res){});
}//end of addNewToDo

//grab the new to-do
function getNewToDo (event) {
  event.preventDefault();
  var newToDo = $('#newToDo').val();
  $('#newToDo').val('');
  return newToDo;
}//end of addNewToDo
