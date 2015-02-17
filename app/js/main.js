/* jshint node: true */

// var $ = require('jquery'),
//     _ = require('lodash'),
//    Firebase = require('firebase');

var FIREBASE_URL = 'https://honey-dew.firebaseio.com/',
    fb = new Firebase(FIREBASE_URL),
    usersFbUrl;

$(document).ready(initialize);
function initialize () {

  //click login

  //click signup

  //click logout

  //click sign me IN
  $('#auth').click(loginExistingUser);

  //click sign me UP
  $('#firstTime').click(createNewUser);

  //add task to the firebase when click on add to list
  $('#addNewToDo').click(addNewToDo);
  //click the 'x' to remove the task. click event is happening on the .tasks due to div being added after. need to specify the button.
  $('.tasks').on('click', '.btn-warning', removeTask);
  //how to use submit event?

  getExistingTasks();
}//end of initialize

//get the users credentials
function getUserInfo (event) {
  var $emailLogin = $('#emailLogin').val();
  var $passwordLogin = $('#passwordLogin').val();
  var $verifyPassword = $('#verifyPassword').val();
  var loginObj = {
    email: $emailLogin,
    password: $passwordLogin
  }

  return loginObj;
}

//create a new user account and login
function createNewUser (event) {
  event.preventDefault();
  fb.createUser(getUserInfo(event), function(error, userData) {
    if (error) {
      alert('REJECTED! ', error.code);
    } else {
      console.log('Successfully created user account with uid: ', userData.uid);
    }
  });

  clearLoginInputs();
}

//log a user in that already has an account
function loginExistingUser (event) {
  event.preventDefault();
  fb.authWithPassword(getUserInfo(event), function(error, authData) {
    if (error) {
      alert('login failed', error);
    } else {
      console.log('Authenteicated successfully with payload: ', authData);
    }
  });

  clearLoginInputs();
}

//clear the login input values
function clearLoginInputs () {
  var $emailLogin = $('#emailLogin').val(' ');
  var $passwordLogin = $('#passwordLogin').val(' ');
  var $verifyPassword = $('#verifyPassword').val(' ');

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
