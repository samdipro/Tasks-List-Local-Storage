// Define Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('#collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');

// Event Listeners
loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTask);
  }

  // Get Tasks from LS
  function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

      tasks.forEach(function(task){
        const li = document.createElement('li');
      li.className = 'list-group-item border-bottom';
      li.appendChild(document.createTextNode(task));
      const link = document.createElement('a');
      link.className = 'delete-item position-absolute top-50 end-0 translate-middle-y';
      link.innerHTML = '<i class="bi bi-x-square-fill">delete</i>';
      li.appendChild(link);
      taskList.appendChild(li);
        
      });
  }

  // Add Task from Form
  function addTask(Event){
    if(taskInput.value === '') {
      alert('!Add a task');
    } else {
      const li = document.createElement('li');
      li.className = 'list-group-item border-bottom';
      li.appendChild(document.createTextNode(taskInput.value));
      const link = document.createElement('a');
      link.className = 'delete-item position-absolute top-50 end-0 translate-middle-y';
      link.innerHTML = '<i class="bi bi-x-square-fill">delete</i>';
      li.appendChild(link);
      taskList.appendChild(li);

      // Local Storage
      storeTasksInLocalStorage(taskInput.value);

      // Clear Input
      taskInput.value='';

      Event.preventDefault();
    }
  }

  // Add to Local Storage
  function storeTasksInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  //Remove Task
  function removeTask(Event) {
    if(Event.target.parentElement.classList.contains('delete-item'))
    {
      if(confirm('Delete this task?')){
        Event.target.parentElement.parentElement.remove();
      }

      // Remove from LS
      removeTaskFromLocalStorage(Event.target.parentElement.parentElement);
    }
  }

  // Remove from LS
  function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Clear Task
  function clearTask(Event){
    // taskList.innerHTML='';
    while (taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
    clearTaskFromLocalStorage();
  }

  // Clear Task from LS
  function clearTaskFromLocalStorage(){
    localStorage.clear();
  }