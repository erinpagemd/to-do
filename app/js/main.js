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

  getExistingTasks();
}//end of initialize

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
  var $divText = $('<div>' + data.task + '</div>');

  //append the items to the task div
  $divTask.append($divText);
  $divTask.attr('data-uuid', uuid);

  return $divTask;
}

//add the new to-do to firebase
function addNewToDo (event) {
  var url = FIREBASE_URL + 'tasks/.json';
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
