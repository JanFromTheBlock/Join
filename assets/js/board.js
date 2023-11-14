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


function addBoardRender() {
  renderBoardInput();
  renderTaskAreas();
  addTaskRender();
  loadTasks();
}


function renderBoardInput() {
  docID("board").innerHTML = "";
  docID("board").innerHTML += renderBoardInputHTML();
}


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


function getInitialsTask(firstName, lastName) {
  if (lastName) {
    let initials = firstName.charAt(0) + lastName.charAt(0);
    return initials.toUpperCase();
  }else{
    let initials = firstName.charAt(0);
    return initials.toUpperCase();
  }
}


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


function emptyTaskDivs() {
  for (let i = 1; i < taskTitles.length +1; i++) {
    docID(`tasks${i}`).innerHTML = "";
  }
}


function startDragging(element) {
  currentDraggedElement = element;
}


function allowDrop(ev) {
  ev.preventDefault();
}


function moveTo(progress) {
  tasks[currentDraggedElement]["progress"] = progress;
  setElement("tasks", tasks);
  addBoardRender();
}


function filterTasks() {
  const search = getSearchText();
  emptyTaskDivs();

  for (let id = 0; id < tasks.length; id++) {
    const name = tasks[id]["title"];
    if (name.toLowerCase().includes(search)) {
      renderTask(id);
      renderContactFilterArea(id);
    }
  }
  findEmptyTaskAreas();
}


function getSearchText() {
  return docID("input").value.toLowerCase();
}


function renderTask(id) {
  renderTaskBody(id);
  renderSubtasks(id);
  renderUrgencySymbol(id);
  renderCategoryColor(id);
}


function clearInput() {
  docID("input").value = "";
}


function handleKeyPress(event) {
  if (event.key === "Enter") {
    clearInput();
  }
}


function openWindow(event, id, IdOfTask) {
  docID("task-window").classList.remove("d-none");
  event.stopPropagation();
  window.scrollTo(0, 0);
  renderWindow(id, IdOfTask);
  openedTask = id;
  subtaskStatus = [];
}


function closeWindow() {
  docID("task-window").classList.add("d-none");
}


function renderWindow(id, IdOfTask) {
  renderStructureOfTheWindow(id, IdOfTask);
  addColorOfTheCategory(id);
  renderPriorityToTheWindow(id);
  renderContactsToWindow(id);
}


function addColorOfTheCategory(id) {
  let color = tasks[id]["category-color"];
  docID("window-category" + id).style.backgroundColor = color;
}


function renderPriorityToTheWindow(id) {
  addUrgencyImage(id);
  addUrgencyColor(id);
}


function addUrgencyImage(id) {
  docID("window-contact-img").src = tasks[id]["urgency"];
}


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


function deleteTask(id) {
  tasks.splice(id, 1);
  subtasks.splice(id, 1); 
  setElement("tasks", tasks);
  setElement("subtasks", subtasks);
  addBoardRender();
  closeWindow();
}


function changeDeleteImage(isHovering) {
  docID("delete-button").src = isHovering ? "./assets/img/delete_hover.png" : "./assets/img/delete.png";
}


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


function windowscrollToTop() {
  window.scrollTo(0, 0);
}


function getBackgroundElements() {
  return {
    backgroundBoard: docID(`board`),
    backgroundNav: docID(`nav`),
    backgroundHeader: docID(`header`),
  };
}


function adjustBackgroundElements(elements) {
  for (const key in elements) {
    if (elements.hasOwnProperty(key)) {
      const element = elements[key];
      element.classList.add(`decrease-opacity`);
      element.classList.remove(`full-opacity`);
    }
  }
}


function toggleAddTaskDisplay(addTaskUnder, addTaskButtonToBoard) {
  addTaskUnder.classList.remove(`d-none`);
  setTimeout(() => {
    addTaskButtonToBoard.classList.remove(`d-none`);
    addTaskUnder.classList.remove(`add-task-to-board-hide`);
  }, 100);
}


function updateBoardBodyStyles(boardBody) {
  boardBody.style.backgroundAttachment = "fixed";
  boardBody.style.overflow = "hidden";
  boardBody.classList.remove(`overflow-hidden`);
  board.classList.add(`overflowY`);
}


function setProgress(IdOfTask) {
  progress = IdOfTask;
  edit = false;
}


function handleEditTask(IdOfTask) {
  findJSON(IdOfTask, tasks)
  setEditTaskUI(jsonToEdit);
  setTaskPriority(jsonToEdit.urgency);
  setTaskContacts(jsonToEdit.contactid);
  edit = true;
  setSubtasks(jsonToEdit.subtasks);
  setEditMode();
}


function setEditTaskUI(jsonToEdit) {
  docID("add-edit-task").innerHTML = "Edit Task";
  docID("inputFieldTitle").value = jsonToEdit.title;
  docID("inputDate").value = jsonToEdit.date;
  docID("selectCategory").value = jsonToEdit.category;
  showCategories();
  docID("savedCategory" + jsonToEdit.categoryId).click();
  docID("description").value = jsonToEdit.description;
}


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


function setEditMode() {
  docID("addTaskButtonToBoard").innerHTML = "Edit Task";
}


function findJSON(IdOfTask, tasks) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === IdOfTask) {
      jsonToEdit = tasks[i];
    }
  }
}


function closeAddTaskToBoard() {
  let addTask = docID(`addTask`);
  let backgroundBoard = docID(`board`);
  let backgroundNav = docID(`nav`);
  let backgroundHeader = docID(`header`);
  let addTaskButtonToBoard = docID(`addTaskButtonToBoard`);
  hideAddTaskAtBoard(addTask, backgroundBoard, backgroundNav, backgroundHeader, addTaskButtonToBoard)
  addBoardInit();
  resetAddTaskMask();
}


function hideAddTaskAtBoard(addTask, backgroundBoard, backgroundNav, backgroundHeader, addTaskButtonToBoard){
  boardBody.style.backgroundAttachment = "initial";
  boardBody.style.overflow = "visible";
  addTaskButtonToBoard.classList.add(`d-none`);
  board.classList.remove(`overflowY`);
  addTask.classList.add(`add-task-to-board-hide`);
  setTimeout(() => {
    addTask.classList.add(`d-none`);
  }, 325);
  backgroundBoard.classList.add(`full-opacity`);
  backgroundHeader.classList.add(`full-opacity`);
  backgroundNav.classList.add(`full-opacity`);
  backgroundBoard.classList.remove(`decrease-opacity`);
  backgroundHeader.classList.remove(`decrease-opacity`);
  backgroundNav.classList.remove(`decrease-opacity`);
}


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


function safeEditedTask() {
  edit = true;
  jsonToEdit.title = docID("inputFieldTitle").value;
  jsonToEdit.date = docID("inputDate").value;
  jsonToEdit.category = docID("selectCategory").value;
  jsonToEdit["category-color"] = categoryColor;
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


function saveAndClearEditedTask(){
  setElement("tasks", tasks);
  doneSubtask = '';
  addBoardInit();
  closeAddTaskToBoard();
  subtaskStatus = [];
  jsonToEdit = undefined;
}


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