function renderBoardInputHTML() {
  return /*html*/ `
            <div id="board-input">
                <div id="find-task">
                    <input id="input" type="text" placeholder="Find Task" onkeyup="filterTasks(); handleKeyPress(event)">
                    <div id="img-search-margin">
                        <img id="img-search" onclick="clearInput()" src="./assets/img/search.png">
                    </div>
                </div>
                <button onclick="openAddTask(1)" id="board-button">Add Task <span id="board-button-plus">+</span></button>
            </div>
            <div id="task-area"></div>
          `
}


function renderTaskAreasHTML(taskTitle, taskName, indexFinal, index) {
  return /*html*/ ` 
    <div ondrop="moveTo('${taskTitle}')" ondragover="allowDrop(event)" class="task-body" id="task-body${index}">
        <div class="task-body-flex">
            <span>${taskName}</span>
            <img onclick="openAddTask(${indexFinal})" id="task-img${index}" src="./assets/img/board_plus.png">
        </div>
        <div id="tasks${indexFinal}"></div>
    </div>
  `;
}


function renderTaskBodyHTML(id, IdOfTask, prioritySmall, editSubtasks) {
  return /*html*/ `           
    <div draggable="true" ondragstart="startDragging(${id})" onclick="openWindow(event, ${id}, ${IdOfTask})" id="task${id}" class="task-decoration">
        <div id="task-category${id}" class="task-category">${tasks[id]["category"]}</div>
        <div id = "arrows-mobile">
          <img id="arrow-mobile-up" onclick="changeProgressBackward(event, ${id})" class = "arrow-mobile" src="./assets/img/back_arrow.png">
          <img id="arrow-mobile-down" onclick="changeProgressForward(event, ${id})" class = "arrow-mobile" src="./assets/img/back_arrow.png">
        </div>
        <div class="task-title" id="task-title${id}">${tasks[id]["title"]}</div>
        <div id="task-description${id}">${tasks[id]["description"]}</div>
        <div class = "progress-bar d-none" id="progress-bar${id}"><div id="progress-bar-outside"><div class="progress-bar-inside" id="progress-bar-inside${id}"></div></div><span id="windowSubtask${id}"></span></div>
        <div class="d-none" id="editSubtaskSmall${id}">${editSubtasks}</div>
        <div id="task-footer">
            <div class="contact-area" id="contact-area${id}"></div>
            <img id="contact-area-img${id}" class= "contact-area-img" src="${prioritySmall}">
        </div>
    </div>
  `
}

function changeProgressBackward(event, id){
  event.stopPropagation();
  if(tasks[id]['progress'] !== 1){
    tasks[id]['progress'] = tasks[id]['progress'] - 1;
    setElement("tasks", tasks);
    addBoardInit();
  }
}

function changeProgressForward(event, id){
  event.stopPropagation();
  if(tasks[id]['progress'] !== 4){
    tasks[id]['progress'] = tasks[id]['progress'] + 1;
    setElement("tasks", tasks);
    addBoardInit();
  }
}


function createTaskWindowHTML(taskId, subtasks, subtaskHTML, IdOfTask) {
  let prioritySmall = tasks[taskId]["urgency"];
  let priority = prioritySmall.charAt(0).toUpperCase() + prioritySmall.slice(1);
  let dueDate = tasks[taskId]["date"];

  return /*html*/ `
      <div>
        <img id="close-img" onclick="closeWindow()" src="./assets/img/close.png">
        <div id="task-window-inside">
          <div id="window-category${taskId}" class="task-category">${tasks[taskId]["category"]}</div>
          <div class="font-size-title" id="window-title${taskId}">${tasks[taskId]["title"]}</div>
          <div id="window-description${taskId}">${tasks[taskId]["description"]}</div>
          <div id="date">Due date: 
            <div id="date-inside${taskId}">${dueDate}</div>
          </div>
          <div id="window-priority">Priority: 
            <div id="window-priority-inside"> <img id="window-contact-img" src="${priority}"></div>
          </div>
          <div id="window-contact-area">
            <div>Assigned to:</div>
          </div>
          <div class="subtask-window">Subtasks:</div>
          ${subtaskHTML}
          <div id="contact-buttons"><img onmouseover="changeDeleteImage(true)" onmouseout="changeDeleteImage(false)" id="delete-button" onclick="deleteTask(${taskId})" src="./assets/img/delete.png"> <img onclick="openAddTask(${IdOfTask})" id="edit-button" src="./assets/img/edit.png"></div>         
        </div>
      </div>
    `;
}


function renderTaskAreas() {
  for (let index = 0; index < taskTitles.length; index++) {
    let indexFinal = index + 1;
    docID("task-area").innerHTML += renderTaskAreasHTML(taskTitles[index], taskNames[index], indexFinal, index);
  }
  docID("task-img3").classList.add("d-none");
}


function renderTaskBody(id) {
  let taskBody = docID("tasks" + tasks[id]["progress"]);
  taskBody.innerHTML += renderTaskBodyHTML(id, tasks[id]["taskId"], tasks[id]["urgency"], subtasks[id]);
}


function renderUrgencySymbol(id) {
  docID("contact-area-img" + id).src = tasks[id]["urgency"];
}


function renderCategoryColor(id) {
  docID("task-category" + id).style.backgroundColor = tasks[id]["category-color"];
}


async function renderStructureOfTheWindow(taskId, IdOfTask, subtask, editLabelsSubtasks) {
  if (saveChangedTask != true) {subtask = null;}

  let subtasks = prepareSubtasks(subtask, editLabelsSubtasks, taskId);
  let subtaskHTML = generateSubtaskHTML(subtasks);
  let taskWindow = docID("task-window");

  taskWindow.innerHTML = createTaskWindowHTML(taskId, subtasks, subtaskHTML, IdOfTask);
}