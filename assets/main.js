$(document).ready(function(){

  $("#add-task-form").on('submit', function(e){
    addTask(e);
  });

  $("#edit-task-form").on('submit', function(e){
    updateTask(e);
  });

  // Remove Task
  $('#task-table').on('click', '#remove-task', function(){
    id = $(this).data('id');
    removeTask(id);
  });

  // Clear Task
  $('#clear-tasks').on('click', function(){
    clearAllTasks();
  });

  displayTasks();
  
  //Function to display tasks
  function displayTasks() {

    var taskList = JSON.parse(localStorage.getItem('tasks'));

    // Sort task
    if(taskList !== null){
      taskList = taskList.sort(sortByTime); 
    }

    var i = 0;
    // Check tasks
    if(localStorage.getItem('tasks') !== null){

      // iterate through and display it
      $.each(taskList, function(key, value){
        $('#task-table').append('<tr id="' + value.id + '">' +
                                '<td>' + value.task + '</td>' +
                                '<td>' + value.task_priority + '</td>' +
                                '<td>' + value.task_date + '</td>' +
                                '<td>' + value.task_time + '</td>' + 
                                '<td><a href="edit.html?id=' + value.id + '">Edit</a> | <a href="#" id="remove-task" data-id="'+ value.id +'">Remove</a></td>' + 
                                '</tr>');
      })
    }  
  }

  // function to sort task
  function sortByTime(a, b){

    var aTime = a.task_time;
    var bTime = b.task_time;
    return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
  }

  function addTask(e){

    var newDate = new Date();
    id = newDate.getTime();

    var task = $("#task").val();
    var task_date = $("#date").val();
    var task_time = $("#time").val();
    var task_priority = $("#priority").val();

    // Check validation

    if(task == ''){
      alert('Task is required');
      e.preventDefault();
    } else if(task_date == ''){
      alert('Date is required');
      e.preventDefault();
    } else if(task_time == ''){
      alert('Time is required');
      e.preventDefault();
    } else if(task_priority == ''){
      task_priority = 'normal';
    } else {

      tasks = JSON.parse(localStorage.getItem('tasks'));

      if (tasks == null){
        tasks = [];
     }

      var taskList = JSON.parse(localStorage.getItem('tasks'));

      var new_task = {
        "id": id,
        "task": task,
        "task_priority": task_priority,
        "task_date": task_date,
        "task_time": task_time
      }

      tasks.push(new_task);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      console.log("task add!");
    }
  }

  // Update task

  function updateTask(e) {

    var id = $("#task_id").val();
    var task = $("#task").val();
    var task_date = $("#date").val();
    var task_time = $("#time").val();
    var task_priority = $("#priority").val();

    var taskList = JSON.parse(localStorage.getItem('tasks'));

    for(var i=0; i < taskList.length; i++){

      if(taskList[i].id == id) {

        taskList.splice(i,1);
      }
      localStorage.setItem('tasks', JSON.stringify(taskList));
    }

    if(task == ''){
      alert('Task is required');
      e.preventDefault();
    } else if(task_date == ''){
      alert('Date is required');
      e.preventDefault();
    } else if(task_time == ''){
      alert('Time is required');
      e.preventDefault();
    } else if(task_priority == ''){
      task_priority = 'normal';
    } else {

      tasks = JSON.parse(localStorage.getItem('tasks'));

      if (tasks == null){
        tasks = [];
     }

      var taskList = JSON.parse(localStorage.getItem('tasks'));

      var new_task = {
        "id": id,
        "task": task,
        "task_priority": task_priority,
        "task_date": task_date,
        "task_time": task_time
      }

      tasks.push(new_task);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      console.log("task add!");
    }
  }

  //Remove Task
  function removeTask(id){

    if(confirm("Are you sure you want to delete this task?")){
      var taskList = JSON.parse(localStorage.getItem('tasks'));

      for(var i=0; i < taskList.length; i++){

        if(taskList[i].id == id) {

          taskList.splice(i,1);
        }
        localStorage.setItem('tasks', JSON.stringify(taskList));
      }
    }

    location.reload();
  }

  function clearAllTasks(){

    if(confirm("Do you want to clear all tasks")){

      localStorage.clear();
      location.reload();
    }
  }
});

// GET single task
function getTask(){

  var $_GET = getQueryParams(document.location.search);
  id = $_GET['id'];

  var taskList = JSON.parse(localStorage.getItem('tasks'));

  for(var i=0; i < taskList.length; i++){

    if(taskList[i].id == id){
      $('#edit-task-form #task_id').val(taskList[i].id);
      $('#edit-task-form #task').val(taskList[i].task);
      $('#edit-task-form #priority').val(taskList[i].task_priority);
      $('#edit-task-form #date').val(taskList[i].task_date);
      $('#edit-task-form #time').val(taskList[i].task_time);
    }
  }
} 

// GET HTTP GET request
function getQueryParams(qs){

  qs = qs.split("+").join(" ");
  var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

  while(tokens = re.exec(qs)){
    params[decodeURIComponent(tokens[1])]
      = decodeURIComponent(tokens[2]);
  }

  return params;
}