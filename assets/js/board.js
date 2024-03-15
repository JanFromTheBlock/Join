let taskTitles = ["1", "2", "3", "4"]; //Array, um Drag und Drop Zielarea festzulegen
let taskNames = ["To do", "In progress", "Await feedback", "Done"]; //Array, um beim Rendern der Rask-areas die Titel zu vergeben
let currentDraggedElement; // In dieser Variable wird die id der gedraggten Task gespeichert
let openedTask;
let saveChangedTask = false;
let jsonToEdit;
let edit = false;
let doneSubtaskClicked = false;
let progress;
let doneSubtask = 0;
let subtasksWereChecked
let zero = true;

/**
 * Function to render the board input area and task areas.
 */
function addBoardRender() {
  renderBoardInput();
  renderTaskAreas();
  addTaskRender();
  addTaskRenderOption()
  loadTasks();
}

/**
 * Function to load tasks and render them on the board.
 */
function loadTasks() {
  emptyTaskDivs();
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    renderTask(i);
    renderContactArea(task, i);
  }
  addContactsToTasks(0); //mainrender.js
  findEmptyTaskAreas();
}

/**
 * Function to get the initials of a contact's name.
 * @param {string} firstName - The first name of the contact.
 * @param {string} lastName - The last name of the contact.
 * @returns {string} The initials of the contact's name.
 */
function getInitialsTask(firstName, lastName) {
  if (lastName) {
    let initials = firstName.charAt(0) + lastName.charAt(0);
    return initials.toUpperCase();
  }else{
    let initials = firstName.charAt(0);
    return initials.toUpperCase();
  }
}

/**
 * Function to find empty task areas and display a message.
 */
function findEmptyTaskAreas() {
  for (let i = 0; i < taskTitles.length; i++) {
    let progressTitle = taskNames[i];
    if (docID(`tasks${i+1}`).childElementCount === 0) {
      docID(`tasks${i+1}`).innerHTML = /*html*/ `
        <div id = "notask${i}" class = "notasks">No tasks ${progressTitle}</div>
      `;
    }
  }
}

/**
 * Function to empty task divs.
 */
function emptyTaskDivs() {
  for (let i = 1; i < taskTitles.length +1; i++) {
    docID(`tasks${i}`).innerHTML = "";
  }
}

/**
 * Function to start dragging a task.
 * @param {string} element - The ID of the dragged element.
 */
function startDragging(element) {
  currentDraggedElement = element;
}

/**
 * Function to allow dropping of a dragged element.
 * @param {Event} ev - The drop event.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Function to move a task to a specified progress area.
 * @param {string} progress - The progress area to move the task to.
 */
function moveTo(progress) {
  tasks[currentDraggedElement]["progress"] = progress;
  setElement("tasks", tasks);
  addBoardRender();
}

/**
 * Function to filter tasks based on the search text.
 */
function filterTasks() {
  const search = getSearchText();
  emptyTaskDivs();

  for (let id = 0; id < tasks.length; id++) {
    const name = tasks[id]["title"];
    const desc = tasks[id]["description"];
    if (name.toLowerCase().includes(search) || desc.toLowerCase().includes(search)) { //searching in tasks.description & tasks.name for the input text
      renderTask(id);
      renderContactFilterArea(id);
    }
  }
  findEmptyTaskAreas();
}

/**
 * Function to render a task on the board.
 * @param {number} id - The ID of the task.
 */
function renderTask(id) {
  renderTaskBody(id);
  renderSubtasks(id);
  renderUrgencySymbol(id);
  renderCategoryColor(id);
}

/**
 * Function to handle key presses, specifically the Enter key.
 * @param {KeyboardEvent} event - The key press event.
 */
function handleKeyPress(event) {
  if (event.key === "Enter") {
    clearInput();
  }
}

/**
 * Function to render the task window with details.
 * @param {number} id - The ID of the task.
 * @param {number} IdOfTask - The ID of the task.
 */
function renderWindow(id, IdOfTask) {
  renderStructureOfTheWindow(id, IdOfTask);
  addColorOfTheCategory(id);
  renderPriorityToTheWindow(id);
  renderContactsToWindow(id);
}

/**
 * Function to add the color of the category to the task window.
 * @param {number} id - The ID of the task.
 */
function addColorOfTheCategory(id) {
  let color = tasks[id]["category-color"];
  docID("window-category" + id).style.backgroundColor = color;
}

/**
 * Function to delete a task.
 * @param {number} id - The ID of the task.
 */
function deleteTask(id) {
  tasks.splice(id, 1);
  subtasks.splice(id, 1); 
  setElement("tasks", tasks);
  setElement("subtasks", subtasks);
  addBoardRender();
  closeWindow();
}

/**
 * Function to open the add task section.
 * @param {number} IdOfTask - The ID of the task.
 */
function openAddTask(IdOfTask) {
  windowscrollToTop();
  let backgroundElements = getBackgroundElements();
  adjustBackgroundElements(backgroundElements);
  toggleAddTaskDisplay(docID(`addTask`), docID(`addTaskButtonToBoard`));
  updateBoardBodyStyles(docID(`boardBody`));
  if (IdOfTask < 4) {
    setProgress(IdOfTask);
  }
  if (IdOfTask > 3) {
    handleEditTask(IdOfTask);
  }
}

/**
 * Function to scroll to the top of the window.
 */
function windowscrollToTop() {
  window.scrollTo(0, 0);
}

/**
 * Function to get the background elements.
 * @returns {Object} An object containing background elements.
 */
function getBackgroundElements() {
  return {
    backgroundBoard: docID(`board`),
    backgroundNav: docID(`nav`),
    backgroundHeader: docID(`header`),
  };
}

/**
 * Function to toggle the display of the add task section.
 * @param {HTMLElement} addTaskUnder - The element representing the add task section.
 * @param {HTMLElement} addTaskButtonToBoard - The element representing the add task button.
 */
function toggleAddTaskDisplay(addTaskUnder, addTaskButtonToBoard) {
  addTaskUnder.classList.remove(`d-none`);
  setTimeout(() => {
    addTaskButtonToBoard.classList.remove(`d-none`);
    addTaskUnder.classList.remove(`add-task-to-board-hide`);
  }, 100);
}

/**
 * Function to update styles for the board body.
 * @param {HTMLElement} boardBody - The element representing the board body.
 */
function updateBoardBodyStyles(boardBody) {
  boardBody.style.backgroundAttachment = "fixed";
  boardBody.style.overflow = "hidden";
  boardBody.classList.remove(`overflow-hidden`);
  board.classList.add(`overflowY`);
}

/**
 * Function to set the progress of the task being added.
 * @param {number} IdOfTask - The ID of the task.
 */
function setProgress(IdOfTask) {
  progress = IdOfTask;
  edit = false;
}

/**
 * Function to handle editing an existing task.
 * @param {number} IdOfTask - The ID of the task being edited.
 */
function handleEditTask(IdOfTask) {
  findJSON(IdOfTask, tasks)
  setEditTaskUI(jsonToEdit);
  setTaskPriority(jsonToEdit.urgency);
  setTaskContacts(jsonToEdit.contactid);
  edit = true;
  setSubtasks(jsonToEdit.subtasks);
  setEditMode();
}

/**
 * Function to set the UI for editing a task.
 * @param {Object} jsonToEdit - The JSON object representing the task being edited.
 */
function setEditTaskUI(jsonToEdit) {
  docID("add-edit-task").innerHTML = "Edit Task";
  docID("inputFieldTitle").value = jsonToEdit.title;
  docID("inputDate").value = jsonToEdit.date;
  docID("selectCategory").value = jsonToEdit.category;
  showCategories();
  docID("savedCategory" + jsonToEdit.categoryId).click();
  docID("description").value = jsonToEdit.description;
}

/**
 * Function to set the priority of the task being edited.
 * @param {string} priority - The urgency/priority of the task.
 */
function setTaskPriority(priority) {
  const priorityMap = {
    "./assets/img/urgentLogo.png": "urgent",
    "./assets/img/mediumLogo.png": "medium",
    "./assets/img/lowLogo.png": "low"
  };
  if (priority in priorityMap) {
    docID(priorityMap[priority]).click();
  }
}

/**
 * Function to find a JSON object by task ID.
 * @param {number} IdOfTask - The ID of the task.
 * @param {Array} tasks - An array of tasks.
 */
function findJSON(IdOfTask, tasks) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === IdOfTask) {
      jsonToEdit = tasks[i];
    }
  }
}

/**
 * Function to close the add task section.
 */
function closeAddTaskToBoard() {
  let addTask = docID(`addTask`);
  let addTaskButtonToBoard = docID(`addTaskButtonToBoard`);
  hideAddTaskAtBoard(addTask, addTaskButtonToBoard);
  hideAddTaskMain();
  addBoardInit();
  resetAddTaskMask();
}

/**
 * Function to hide the add task section at the board.
 * @param {HTMLElement} addTask - The element representing the add task section.
 * @param {HTMLElement} addTaskButtonToBoard - The element representing the add task button.
 */
function hideAddTaskAtBoard(addTask, addTaskButtonToBoard){
  boardBody.style.backgroundAttachment = "initial";
  boardBody.style.overflow = "visible";
  addTaskButtonToBoard.classList.add(`d-none`);
  board.classList.remove(`overflowY`);
  addTask.classList.add(`add-task-to-board-hide`);
  setTimeout(() => {
    addTask.classList.add(`d-none`);
  }, 325);
}

/**
 * Function to reset the add task section.
 */
function resetAddTaskMask(){
  contactStatusMap.clear();
  numberOfContactsToAdd = [];
  numberOfColorsToAdd = [];
  numberOfIdsToAdd = [];
  contactcolors = [];
  contactIds = [];
  lastName = [];
  firstName = [];
  edit = false;
  subtasksWereChecked = false;
  zero = true;
  subtaskCounter = 0;
  jsonToEdit = undefined;
}

/**
 * Function to save the edited task.
 */
function safeEditedTask() {
  edit = true;
  jsonToEdit.title = docID("inputFieldTitle").value;
  jsonToEdit.date = docID("inputDate").value;
  jsonToEdit.category = docID("selectCategory").value;
  jsonToEdit["category-color"] = categories[categoryId]['color'];
  jsonToEdit.categoryId = categoryId;
  jsonToEdit.description = docID("description").value;
  jsonToEdit.urgency = urgency;
  safeContactsInTask();
  jsonToEdit.contactid = contactIds;
  jsonToEdit["contact-color"] = contactcolors;
  jsonToEdit["contact-firstname"] = firstName;
  jsonToEdit["contact-lastname"] = lastName;
  jsonToEdit.subtasks = subtasks;
  jsonToEdit['done-tasks'] = doneSubtask;
  jsonToEdit.subtaskStatus = subtaskStatus;
  saveAndClearEditedTask();
}

/**
 * Function to save and clear the edited task.
 */
function saveAndClearEditedTask(){
  setElement("tasks", tasks);
  doneSubtask = '';
  addBoardInit();
  closeAddTaskToBoard();
  subtaskStatus = [];
  jsonToEdit = undefined;
}

/**
 * Function to set up the input field for subtasks.
 */
function setupInputField(){
  const inputField = docID('inputSubtask');
  if (inputField) {
    docID('inputSubtask').addEventListener('keydown', function (event) {
      if (event.key === "Enter") {
          event.preventDefault(); 
          showSubtasks();
      }
    });
  }
}