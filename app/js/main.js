/* jshint node: true */

// var $ = require('jquery'),
//     _ = require('lodash'),
//    Firebase = require('firebase');

var FIREBASE_URL = 'https://honey-dew.firebaseio.com/',
    fb = new Firebase(FIREBASE_URL),
    usersFbUrl;

$(document).ready(initialize);
function initialize () {

  //login stuff
  $('#auth').click(getUserInfo)

  //add task to the firebase when click on add to list
  $('#addNewToDo').click(addNewToDo);
  //click the 'x' to remove the task. click event is happening on the .tasks due to div being added after. need to specify the button.
  $('.tasks').on('click', '.btn-warning', removeTask);
  //how to use submit event?

  getExistingTasks();
}//end of initialize

//get the users credentials
function getUserInfo (event) {
  event.preventDefault();
  var $emailLogin = $('#emailLogin').val();
  var $passwordLogin = $('#passwordLogin').val();
  var $verifyPassword = $('#verifyPassword').val();
  var loginObj = {
    email: $emailLogin,
    password: $passwordLogin
  }
  createNewUser(loginObj);
  //have a function that gets the auth
  //if already a user login, if not then create user and login

}

//create a new user account
function createNewUser (obj) {
  fb.createUser(obj, function(error, userData) {
    if (error) {
      console.log('Error creating user: ', error);
    } else {
      console.log('Successfully created user account with uid: ', userData.uid);
    }
  });
}


//remove the task from firebase and the view
function removeTask (event) {
  event.preventDefault();
  var $divToRemove = $(event.target).closest('.tableBody');
  var uuid = $divToRemove.data('uuid');

  var urlItem = FIREBASE_URL + '/tasks/' + uuid + '.json';
  $.ajax(urlItem, {type: 'DELETE'});

  $divToRemove.remove();
}//end removeTask

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
  var $li = $('<li class="tableRow">' + data.task + '<button class="btn btn-warning">x</button></li>');

  //append the items to the task div
  $divTask.append($li);
  $divTask.attr('data-uuid', uuid);

  return $divTask;
}

//add the new to-do to firebase
function addNewToDo (event) {
  var url = FIREBASE_URL + 'tasks/.json';
  var toDoObj = JSON.stringify({task: getNewToDo(event)});
  $.post(url, toDoObj, function(res){
    // var newestTask = makeTaskDiv(res.name, toDoObj);
    // console.log(res.name, newestTask);
    // $('.tasks').append(newestTask);

  });
  $('.tasks').empty();

  //next try to add the div to the page without reloading
  getExistingTasks();
}//end of addNewToDo

//grab the new to-do
function getNewToDo (event) {
  event.preventDefault();
  var newToDo = $('#newToDo').val();
  $('#newToDo').val('');
  return newToDo;
}//end of addNewToDo
