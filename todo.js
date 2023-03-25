let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskToDOM(task){

    const li=document.createElement('li');

    li.innerHTML=`
         
          <input type="checkbox" id="${task.id}"  ${task.done ? 'checked' : ''} class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <img src="bin.svg" class="delete" data-id="${task.id}" />
        
    `;

    tasksList.append(li);
}

function renderList () {

    tasksList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML=tasks.length;
}

function markTaskAsComplete (taskId) {
    const newtasks= tasks.filter(function(task){
        return task.id === Number(taskId)
    });
    
    if(tasks.length>0){
        const currentTask=tasks[0];

        currentTask.done=!currentTask.done;
        renderList();
        // showNotification('Task completed successfully!');
        return;

    }

    showNotification('Could not complete the task');

}

function deleteTask (taskId) {
    const newtasks= tasks.filter(function(task){
        return task.id !== taskId
    });

    tasks=newtasks;
    renderList();
    // showNotification('Task Deleted Successfully');
    }


function addTask (task) {
if(task){
    tasks.push(task);
    renderList();
    // showNotification('Task Added Succesfully!!');
    return;
}

showNotification('Task cannot be added ');

}

function showNotification(text) {
    alert(text);
}

function handleInputkeypress(e){
    if(e.key=='Enter'){
        const text=e.target.value;
        // console.log('text',text);
    
    if(!text){
        showNotification('Task text can not be empty!!');
        return;
    }    

    const task={
        text,
        id: Date.now().toString(),
        done: false
    }

    e.target.value='';
    addTask(task);
    }
}

function handleclicklistener(e){
const target=e.target;

if(target.className == 'delete'){
    const taskid=target.dataset.id;
    deleteTask(taskid);
    return;

}else if(target.className == 'custom-checkbox'){
    const taskid=target.id;
    markTaskAsComplete(taskid);
    return;
}
}

    
    addTaskInput.addEventListener('keyup', handleInputkeypress);
    document.addEventListener('click',handleclicklistener);


