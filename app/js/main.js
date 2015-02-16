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

  //click the 'x' to remove the task
  $('.tasks').click(removeTask);

  getExistingTasks();
}//end of initialize

//remove the task from firebase and the view
function removeTask (event) {
  event.preventDefault();
  var $divToRemove = $(event.target).closest('.tableBody');
  var uuid = $divToRemove.data('uuid');

  var urlItem = FIREBASE_URL + '/tasks/' + uuid + '.json';
  $.ajax(urlItem, {type: 'DELETE'});

  $divToRemove.remove();
}

//get the data from firebase
function getExistingTasks () {
  $.get(FIREBASE_URL + 'tasks/.json', function(resFB) {
    Object.keys(resFB).forEach(function(uuid) {
      loadTask(uuid, resFB[uuid]);
    });
  });
}//end getExistingTasks

//load each task
function loadTask (uuid, data) {
  var tasks = [];
  tasks.push(makeTaskDiv(uuid, data));
  $('.tasks').append(tasks);
  return tasks;
}

//make all the items in each task
function makeTaskDiv (uuid, data) {
  var $divTask = $('<div class="tableBody"></div>');

  //each item in the task
  var $li = $('<li><input type="checkbox">  ' + data.task + '<button class="btn btn-warning">x</button></li>');

  //append the items to the task div
  $divTask.append($li);
  $divTask.attr('data-uuid', uuid);

  return $divTask;
}

//add the new to-do to firebase
function addNewToDo (event) {
  var url = FIREBASE_URL + 'tasks/.json';
  var toDoObj = JSON.stringify({task: getNewToDo(event)});
  $.post(url, toDoObj, function(res){});
  $('.tasks').empty();
  getExistingTasks();
}//end of addNewToDo

//grab the new to-do
function getNewToDo (event) {
  event.preventDefault();
  var newToDo = $('#newToDo').val();
  $('#newToDo').val('');
  return newToDo;
}//end of addNewToDo
