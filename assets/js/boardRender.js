/**
 * Function to render the board input area.
 */
function renderBoardInput() {
  docID("board").innerHTML = "";
  docID("board").innerHTML += renderBoardInputHTML();
}

/**
 * Function to render the HTML structure for the board input area.
 * @returns {string} HTML code for the board input area.
 */
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

/**
 * Function to render the HTML structure for task areas on the board.
 * @param {string} taskTitle - The title of the task.
 * @param {string} taskName - The name of the task.
 * @param {number} indexFinal - The final index of the task.
 * @param {number} index - The index of the task.
 * @returns {string} HTML code for the task areas on the board.
 */
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

/**
 * Function to render the HTML structure for a task body on the board.
 * @param {number} id - The ID of the task.
 * @param {number} IdOfTask - The ID of the task window.
 * @param {string} prioritySmall - The small priority (urgency) of the task.
 * @param {string} editSubtasks - HTML code for editing subtasks.
 * @returns {string} HTML code for the task body on the board.
 */
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

/**
 * Function to handle the backward change of progress for a task.
 * @param {Event} event - The event object.
 * @param {number} id - The ID of the task.
 */
function changeProgressBackward(event, id){
  event.stopPropagation();
  if(tasks[id]['progress'] !== 1){
    tasks[id]['progress'] = parseInt(tasks[id]['progress']) - 1;
    setElement("tasks", tasks);
    addBoardInit();
  }
}

/**
 * Function to handle the forward change of progress for a task.
 * @param {Event} event - The event object.
 * @param {number} id - The ID of the task.
 */
function changeProgressForward(event, id){
  event.stopPropagation();
  if(tasks[id]['progress'] !== 4){
    tasks[id]['progress'] = tasks[id]['progress'] + 1;
    setElement("tasks", tasks);
    addBoardInit();
  }
}

/**
 * Function to create HTML code for the task window.
 * @param {number} taskId - The ID of the task.
 * @param {Array} subtasks - An array of subtasks associated with the task.
 * @param {string} subtaskHTML - HTML code for subtasks.
 * @param {number} IdOfTask - The ID of the task window.
 * @returns {string} HTML code for the task window.
 */
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

/**
 * Function to render the task areas on the board.
 */
function renderTaskAreas() {
  for (let index = 0; index < taskTitles.length; index++) {
    let indexFinal = index + 1;
    docID("task-area").innerHTML += renderTaskAreasHTML(taskTitles[index], taskNames[index], indexFinal, index);
  }
  docID("task-img3").classList.add("d-none");
}

/**
 * Function to render the task body on the board.
 * @param {number} id - The ID of the task.
 */
function renderTaskBody(id) {
  let taskBody = docID("tasks" + tasks[id]["progress"]);
  taskBody.innerHTML += renderTaskBodyHTML(id, tasks[id]["taskId"], tasks[id]["urgency"], subtasks[id]);
}

/**
 * Function to render the urgency symbol for a task.
 * @param {number} id - The ID of the task.
 */
function renderUrgencySymbol(id) {
  docID("contact-area-img" + id).src = tasks[id]["urgency"];
}

/**
 * Function to render the category color for a task.
 * @param {number} id - The ID of the task.
 */
function renderCategoryColor(id) {
  docID("task-category" + id).style.backgroundColor = tasks[id]["category-color"];
}

/**
 * Function to render the structure of the task window.
 * @param {number} taskId - The ID of the task.
 * @param {number} IdOfTask - The ID of the task window.
 * @param {Array} subtask - An array of subtasks associated with the task.
 * @param {string} editLabelsSubtasks - HTML code for editing subtask labels.
 */
async function renderStructureOfTheWindow(taskId, IdOfTask, subtask, editLabelsSubtasks) {
  if (saveChangedTask != true) {subtask = null;}

  let subtasks = prepareSubtasks(subtask, editLabelsSubtasks, taskId);
  let subtaskHTML = generateSubtaskHTML(subtasks);
  let taskWindow = docID("task-window");

  taskWindow.innerHTML = createTaskWindowHTML(taskId, subtasks, subtaskHTML, IdOfTask);
}

/**
 * Function to add the urgency image to the task window.
 * @param {number} id - The ID of the task.
 */
function addUrgencyImage(id) {
  docID("window-contact-img").src = tasks[id]["urgency"];
}

/**
 * Function to add the urgency color to the task window.
 * @param {number} id - The ID of the task.
 */
function addUrgencyColor(id) {
  if (tasks[id]["urgency"] === "low") {
    docID("window-priority-inside").style.backgroundColor = "#CBFFC2";
  }
  if (tasks[id]["urgency"] === "medium") {
    docID("window-priority-inside").style.backgroundColor = "#FFEBB9";
  }
  if (tasks[id]["urgency"] === "urgent") {
    docID("window-priority-inside").style.backgroundColor = "#FFD2D2";
  }
}

/**
 * Function to set the edit mode for the add task section.
 */
function setEditMode() {
  docID("addTaskButtonToBoard").innerHTML = "Edit Task";
}

/**
 * Function to adjust the opacity of background elements.
 * @param {Object} elements - An object containing background elements.
 */
function adjustBackgroundElements(elements) {
  for (const key in elements) {
    if (elements.hasOwnProperty(key)) {
      const element = elements[key];
      element.classList.add(`decrease-opacity`);
      element.classList.remove(`full-opacity`);
    }
  }
}

/**
 * Function to hide elements when closing the add task section.
 */
function hideAddTaskMain() {
  let backgroundArray = [docID(`board`), docID(`nav`), docID(`header`) ]
  for (let i = 0; i < backgroundArray.length; i++) {
    backgroundArray[i].classList.add(`full-opacity`);
    backgroundArray[i].classList.remove(`decrease-opacity`);
  }
}

/**
 * Function to get the search text from the input field.
 * @returns {string} The search text.
 */
function getSearchText() {
  return docID("input").value.toLowerCase();
}

/**
 * Function to change the delete image based on hovering.
 * @param {boolean} isHovering - Indicates whether the mouse is hovering.
 */
function changeDeleteImage(isHovering) {
  docID("delete-button").src = isHovering ? "./assets/img/delete_hover.png" : "./assets/img/delete.png";
}

/**
 * Function to open the task window.
 * @param {Event} event - The event that triggered the opening of the window.
 * @param {number} id - The ID of the task.
 * @param {number} IdOfTask - The ID of the task.
 */
function openWindow(event, id, IdOfTask) {
  docID("task-window").classList.remove("d-none");
  docID("task-area").style.position = "fixed";
  docID("board-input").style.position = "fixed";
  docID("task-window").style.paddingBottom = "100px";
  event.stopPropagation();
  window.scrollTo(0, 0);
  let backgroundElements = getBackgroundElements();
  adjustBackgroundElements(backgroundElements);
  renderWindow(id, IdOfTask);
  openedTask = id;
  subtaskStatus = [];
}

/**
 * Function to clear the input field.
 */
function clearInput() {
  docID("input").value = "";
}

/**
 * Function to close the task window.
 */
function closeWindow() {
  docID("task-window").classList.add("d-none");
  docID("task-area").style.position = "static";
  docID("board-input").style.position = "static";
  hideAddTaskMain();
}

/**
 * Function to render the priority of the task in the window.
 * @param {number} id - The ID of the task.
 */
function renderPriorityToTheWindow(id) {
  addUrgencyImage(id);
  addUrgencyColor(id);
}