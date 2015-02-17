/* jshint node: true */

// var $ = require('jquery'),
//     _ = require('lodash'),
//    Firebase = require('firebase');

var FIREBASE_URL = 'https://honey-dew.firebaseio.com',
    fb = new Firebase(FIREBASE_URL),
    usersFbUrl;

$(document).ready(initialize);
function initialize () {

  //first come to website, are you logged in?
  if(fb.getAuth()) {
    //console.log(getAuth());
    //hide the login form
    // $('#emailLogin').hide();
    //hide the email
    $('#emailLogin').hide();
    //hide the password
    $('#passwordLogin').hide();
    //verify
    $('#verifyPassword').hide();
    //hide the sign me in button
    $('#auth').hide();
    //hide the sign me up button
    $('#firstTime').hide();
    //hide the image
    $('#image').hide();
    //hide the action buttons
    $('#authActionForm').hide();
    //set the usersFbUrl
    usersFbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';
    //show the task list
    //get the existing tasks
    getExistingTasks();

  } else {
    //hide the login form elements
    // $('#loginForm').hide();
    //email
    $('#emailLogin').hide();
    //password
    $('#passwordLogin').hide();
    //verify
    $('#verifyPassword').hide();
    //sign me in button
    $('#auth').hide();
    //sign me up button
    $('#firstTime').hide();
    //hide the add task form
    $('#createTask').hide()
    //hide the task list
    $('.tasks').hide();
  }

  //getExistingTasks();

  //click login
  $('#login').click(showLogin);

  //click signup
  $('#signup').click(showSignup);

  //click logout
  $('#logout').click(logoutUser);

  //click sign me IN
  $('#auth').click(loginExistingUser);

  //click sign me UP
  $('#firstTime').click(createNewUser);

  //add task to the firebase when click on add to list
  $('#addNewToDo').click(addNewToDo);
  //click the 'x' to remove the task. click event is happening on the .tasks due to div being added after. need to specify the button.
  // $('.tasks').on('click', '.btn-warning', removeTask);
  //how to use submit event?

}//end of initialize

//logout the user
function logoutUser (event) {
  event.preventDefault();
  fb.unauth();
  location.reload(true);
}//end logoutUser

//show the signup form
function showSignup (event) {
  event.preventDefault();
  //show the email
  $('#emailLogin').toggle();
  //show the password
  $('#passwordLogin').toggle();
  //show the verify password
  $('#verifyPassword').toggle();
  //show the signup button
  $('#firstTime').toggle();
  //hide authActionForm
  $('#authActionForm').toggle();

}//end showSignup

//show the login form
function showLogin (event) {
  event.preventDefault();
  //show the email
  $('#emailLogin').toggle();
  //show the password
  $('#passwordLogin').toggle();
  //show the sign me in button
  $('#auth').toggle();
  //hide authActionForm
  $('#authActionForm').toggle();

}//end showLogin

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
}//end of getUserInfo

//create a new user account and login
function createNewUser (event) {
  event.preventDefault();
  fb.createUser(getUserInfo(event), function(error) {
    if (error === null) {
      loginExistingUser(event);
    } else {
      //hide and show certain things
      alert('rejected! ', error.code);
    }
  });
}//end createNewUser

//log a user in that already has an account
function loginExistingUser (event) {
  event.preventDefault();
  fb.authWithPassword(getUserInfo(event), function(error, authData) {
    if (error) {
      alert('login failed', error);
      console.log(error);
    } else {
      //hide the login form
      $('#loginForm').toggle();
      //hide the picture
      $('#image').toggle();
      //show the task add form
      $('#createTask').toggle();
      //show the task list
      $('.tasks').toggle();
      //set the usersFbUrl
      usersFbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';
      //load the exisiting tasks
      getExistingTasks();
      console.log('Authenticated successfully with payload: ', authData);
    }
  });

  clearLoginInputs();
}//end loginExistingUser

//clear the login input values
function clearLoginInputs () {
  var $emailLogin = $('#emailLogin').val('');
  var $passwordLogin = $('#passwordLogin').val('');
  var $verifyPassword = $('#verifyPassword').val('');
}//end clearLoginInputs

//remove the task from firebase and the view
function removeTask (event) {
  event.preventDefault();
  var $divToRemove = $(event.target).closest('.tableBody');
  var uuid = $divToRemove.data('uuid');

  var urlItem = usersFbUrl + '/tasks/' + uuid + '.json';
  $.ajax(urlItem, {type: 'DELETE'});

  $divToRemove.remove();
}//end removeTask

//get the data from firebase
function getExistingTasks () {
  $.get(usersFbUrl + '/tasks.json', function(resFB) {
    console.log(usersFbUrl);
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
  usersFbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';
  var toDoObj = JSON.stringify({task: getNewToDo(event)});
  $.post(usersFbUrl + '/tasks.json', toDoObj, function(res){
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
