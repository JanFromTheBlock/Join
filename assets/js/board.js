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


function renderTaskAreas() {
  for (let index = 0; index < taskTitles.length; index++) {
    let indexFinal = index + 1;
    docID("task-area").innerHTML += renderTaskAreasHTML(taskTitles[index], taskNames[index], indexFinal, index);
  }
  docID("task-img3").classList.add("d-none");
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


function renderContactArea(task, id) {
  const contactArea = docID("contact-area" + id);
  contactArea.innerHTML = "";
  for (let contactIndex = 0; contactIndex < task["contact-firstname"].length; contactIndex++) {
    const firstName = task["contact-firstname"][contactIndex];
    const lastName = task["contact-lastname"][contactIndex];
    const initials = getInitialsTask(firstName, lastName);
    const color = task["contact-color"][contactIndex];
    renderContactSymbol(contactArea, initials, color);
  }
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


function renderContactSymbol(contactArea, initials, color) {
  const contactSymbol = document.createElement("span");
  contactSymbol.className = "contacts";
  contactSymbol.style.backgroundColor = color;
  contactSymbol.textContent = initials;
  contactArea.appendChild(contactSymbol);
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


function renderTaskBody(id) {
  let taskBody = docID("tasks" + tasks[id]["progress"]);
  taskBody.innerHTML += renderTaskBodyHTML(id, tasks[id]["taskId"], tasks[id]["urgency"], subtasks[id]);
}


function startDragging(element) {
  //Funktion um die id der gedraggten Task in der Variable zu speichern; muss auch um 1 gesenkt werden, da bei den ids bei 1 statt bei 0 angefangen wurde
  currentDraggedElement = element;
}


function allowDrop(ev) {
  //Funktion die dafür sorgt, dass Tasks gedroppt werden können in dem Bereich
  ev.preventDefault();
}


function moveTo(progress) {
  //Funktion bekommt als Parameter den Ort, wo die gedraggte Task gedropt werden soll
  tasks[currentDraggedElement]["progress"] = progress; // anschließend wird dies im array verändert an der entsprechenden Position
  setElement("tasks", tasks);
  addBoardRender(); // anschließend muss alles neu gerendert werden, damit die Änderungen geladen werden
}


function renderSubtasks(id) {
    let a = tasks[id]["subtasks"].length; // Variable a sind die Anzahl an subtasks
    let b = tasks[id]["done-tasks"]; // Variable b sind die Anzahl erledigter subtasks
    let percent = (b / a) * 100; // Prozentanteil erledigter aufgaben wird berechnet
    docID("progress-bar" + id).classList.remove("d-none"); //der progress-bar wird das d-none entfernt und sie wird sichtbar
    docID("windowSubtask" + id).innerHTML = renderSubtasksHTML(a, b);// die Anzahl an subtass wird neben die progress-bar gerendert
    docID("progress-bar-inside" + id).style.width = `${percent}%`; //der Prozentanteil erledigter Aufgaben wird als Füllmenge für die progress-bar verwnedet
    subtasks.splice(id, subtasks.length); // alle subtasks werden gelöscht, so dass nicht alle in allen Tasks angezeigt werden
}


function renderSubtasksHTML(a, b) {
  return /*html*/ `${b}/${a} Subtasks`; // die Anzahl an subtasks wird neben die progress-bar gerendert
}


function renderUrgencySymbol(id) {
  docID("contact-area-img" + id).src = tasks[id]["urgency"]; //je nachdem welche urgency besteht, wird ein anderes Bild gerendert
}


function renderCategoryColor(id) {
  //die Hintergrundfarbe für die Task-Kategorie wird geladen und dem div gegeben
  docID("task-category" + id).style.backgroundColor = tasks[id]["category-color"];
}


function filterTasks() {
  const search = getSearchText();
  emptyTaskDivs();
  k = 0;

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
  const searchInput = docID("input");
  return searchInput.value.toLowerCase();
}


function renderTask(id) {
  renderTaskBody(id);
  renderSubtasks(id);
  renderUrgencySymbol(id);
  renderCategoryColor(id);
}


function renderContactFilterArea(id) {
  const contactArea = docID("contact-area" + id);
  contactArea.innerHTML = "";
  for (let i = 0; i < tasks[id]["contact-firstname"].length; i++) {
    const initials = getContactInitials(id, i);
    k++;
    contactArea.innerHTML += createContactHTML(k, initials);
    setContactBackgroundColor(k, tasks[id]["contact-color"][i]);
  }
}


function getContactInitials(id, i) {
  const firstName = tasks[id]["contact-firstname"][i];
  const lastName = tasks[id]["contact-lastname"][i];
  const initial1 = firstName.charAt(0);
  const initial2 = lastName.charAt(0);
  return (initial1 + initial2).toUpperCase();
}


function createContactHTML(k, initials) {
  return `<span class="contacts" id="contacts${k}">${initials}</span>`;
}


function setContactBackgroundColor(k, color) {
  docID("contacts" + k).style.backgroundColor = color;
}


function clearInput() {
  docID("input").value = ""; // Setze den Wert des Input-Feldes auf leer
}


function handleKeyPress(event) {
  if (event.key === "Enter") {
    clearInput();
    // Hier kannst du die Funktion aufrufen, die deine divs nach dem Text filtert
  }
}


function openWindow(event, id, IdOfTask) {
  docID("task-window").classList.remove("d-none"); //dem Div wird die d-none-Klasse genommen. und das Window wird sichtbar
  event.stopPropagation(); // Funktion sorgt dafür, dass das Window nicht geschlossen wird, wenn man auf den onclick-Button drückt
  window.scrollTo(0, 0); // wenn Fenster geöffnet wird, wird nach oben gescrollt
  renderWindow(id, IdOfTask); // das Window wird mit seinen Inhalten gerendert
  openedTask = id;
  subtaskStatus = [];
}


function closeWindow() {
  docID("task-window").classList.add("d-none"); //das window wird geschlossen, indem dem div die d-none-Klasse wieder hinzugefügt wird
}


function renderWindow(id, IdOfTask) {
  //das Window wird gerendert
  renderStructureOfTheWindow(id, IdOfTask);
  addColorOfTheCategory(id);
  renderPriorityToTheWindow(id);
  renderContactsToWindow(id);
}


async function renderStructureOfTheWindow(taskId, IdOfTask, subtask, editLabelsSubtasks) {
  if (saveChangedTask == true) {
    // Führe die Aufgabe aus
  } else {
    subtask = null;
  }

  const subtasks = prepareSubtasks(subtask, editLabelsSubtasks, taskId);
  const subtaskHTML = generateSubtaskHTML(subtasks);
  
  const taskWindow = docID("task-window");
  taskWindow.innerHTML = createTaskWindowHTML(taskId, subtasks, subtaskHTML, IdOfTask);
}


function prepareSubtasks(subtask, editLabelsSubtasks, taskId) {
  let subtasks = tasks[taskId]["subtasks"]; // Subtasks für diese Aufgabe

  if (subtask !== null) {
    subtask = editLabelsSubtasks;
    subtasks.push(subtask);
    subtasks = subtasks.filter((item) => item !== undefined);
  }
  return subtasks;
}


function generateSubtaskHTML(subtasks) {
  let subtaskHTML = "";
  for (let subtaskIndex = 0; subtaskIndex < subtasks.length; subtaskIndex++) {
    let subtask = subtasks[subtaskIndex];
    subtaskHTML += /*html*/ `
      <div id="editSubtask${subtaskIndex}">${subtask}</div> 
    `;
  }
  return subtaskHTML;
}


function addColorOfTheCategory(id) {
  //Hintergrundfarbe der Kategorie wird angepasst
  let color = tasks[id]["category-color"];
  docID("window-category" + id).style.backgroundColor = color;
}


function renderPriorityToTheWindow(id) {
  addUrgencyImage(id);
  addUrgencyColor(id);
}


function addUrgencyImage(id) {
  //die Urgency de Tasks wird aus dem Array gelesen und in die src für das dazugehörige Img eingefügt, damit das entsprechende Bild angezeigt wird
  let urgency = tasks[id]["urgency"];
  docID("window-contact-img").src = urgency;
}


function addUrgencyColor(id) {
  //Mit if-Abfragen wird abgefragt, welches der drei möglichen Prioritäten in dem array an Stelle id stehen. Je nachdem wird dann die dazugehörige Hintergrundfarbe dargstellt
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


function renderContactInitials(id, contactID) {
  let firstName = tasks[id]["contact-firstname"][contactID];
  let lastName = tasks[id]["contact-lastname"][contactID];
  let Initial1 = firstName.charAt(0);
  let Initial2 = lastName.charAt(0);
  let initials = Initial1 + Initial2;
  let initialsUpper = initials.toLocaleUpperCase();
  let color = tasks[id]["contact-color"][contactID]; //Warum das?

  return /*html*/ `
      <div id="window-contact-area-inside">
          <div class="initials" id="initials${contactID}">${initialsUpper}</div>
          <div class="name-contact">
              <div>${firstName}</div>
              <div>${lastName}</div>
          </div>
      </div>`;
}


function renderContactsToWindow(id) {
  let windowContactArea = docID("window-contact-area");
  windowContactArea.innerHTML = "";

  for (let contactID = 0; contactID < tasks[id]["contact-firstname"].length; contactID++) {
      const contactHtml = renderContactInitials(id, contactID);
      windowContactArea.insertAdjacentHTML("beforeend", contactHtml);
      docID("initials" + contactID).style.backgroundColor = tasks[id]["contact-color"][contactID];
  }
}


function deleteTask(id) {
  //Löschen der ausgewählten Aufgabe
  tasks.splice(id, 1); //aus dem array wird die Aufgabe an der Stelle id gelöscht
  subtasks.splice(id, 1); // aus dem Array Subtask wird das Subtask an der Stelle id gelöscht
  setElement("tasks", tasks);
  setElement("subtasks", subtasks);
  addBoardRender(); //anschließend wird das Board neu gerendert ohne das gelöschte Element
  closeWindow(); //dann wird das Fenster wieder geschlossen
}


function changeDeleteImage(isHovering) {
  const deleteButton = docID("delete-button");
  if (isHovering) {
    deleteButton.src = "./assets/img/delete_hover.png";
  } else {
    deleteButton.src = "./assets/img/Delete.png";
  }
}


function openAddTask(IdOfTask) {
  windowscrollToTop();
  const addTaskUnder = docID(`addTask`);
  const backgroundElements = getBackgroundElements();
  const boardBody = docID(`boardBody`);
  const board = docID(`board`);
  const addTaskButtonToBoard = docID(`addTaskButtonToBoard`);
  adjustBackgroundElements(backgroundElements);
  toggleAddTaskDisplay(addTaskUnder, addTaskButtonToBoard);
  updateBoardBodyStyles(boardBody);
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


function setTaskContacts(contactIds) {
  docID("selectContact").click();
  for (let i = 0; i < contactIds.length; i++) {
    const elementId = `0and${contactIds[i]}`;
    const element = docID(elementId);
    if (element) {
      element.click();

    }
  }
  docID("selectContact").click();
}


function setSubtasks() {
    doneSubtask = tasks[openedTask]["done-tasks"];
    for (
      let subtaskToLoad = 0;subtaskToLoad < jsonToEdit.subtasks.length; subtaskToLoad++    ) {
      const element = jsonToEdit.subtasks[subtaskToLoad];
      docID(`inputSubtask`).value = element;
      showSubtasks(subtaskToLoad);
      
    }

  checkSubtasks();
}


function setEditMode() {
  docID("addTaskButtonToBoard").innerHTML = "Edit Task";
}


function checkSubtasks(){
  for (let i = 0; i < subtasks.length; i++) {
    if (subtaskStatus[i] === 1) {
      let subtaskCheckbox = docID('subtaskCheckbox' + i);
      subtaskCheckbox.checked = true; 
      subtasksWereChecked = true
    }

  }
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
  jsonToEdit.category = docID("selectCategory").value; // speichert neue Category
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


function safeContactsInTask() {
  for (let i = 0; i < numberOfContactsToAdd.length; i++) {
    let contactDiv = numberOfContactsToAdd[i];
    const [firstNames, lastNames] = contactDiv.split(" ");
    const contactcolor = numberOfColorsToAdd[i];
    const contactid = numberOfIdsToAdd[i];
    firstName.push(firstNames);
    lastName.push(lastNames);
    contactcolors.push(contactcolor);
    contactIds.push(contactid);
  }
}


function pushDoneSubtask(id) {
  let subtaskCheckbox = docID(`subtaskCheckbox${id}`);
  let isChecked = subtaskCheckbox.checked;
  defineDoneSubtask();
  adjustValuesOfTheSubtasks(id, isChecked)
  taskId = tasks[openedTask]["taskId"];
  doneSubtaskClicked = true;
}


function defineDoneSubtask(){
  if (doneSubtask === 0) {
    if (zero === false) { 
    }
    else{
      doneSubtask = tasks[openedTask]["done-tasks"];
    }
  }
}


function adjustValuesOfTheSubtasks(id, isChecked){
  if (isChecked) {   // Überprüfe den Status der Checkbox und füge/entferne die Teilaufgabe entsprechend hinzu/entferne
    doneSubtask++;
    subtaskStatus[id] = 1;
  } else {     // Entferne die Teilaufgabe mit taskId aus doneSubtasks, wenn sie vorhanden ist
    subtaskStatus[id] = 0;
    doneSubtask--;
    zero = false
  }
}


function setupInputField(){
  const inputField = docID('inputSubtask');
  if (inputField) {
    docID('inputSubtask').addEventListener('keydown', function (event) {
      if (event.key === "Enter") {
          event.preventDefault(); // Verhindert das Standardverhalten (z. B. Formularübermittlung)
          showSubtasks(); // Ruft die Funktion addSubtask() auf
      }
    });
  }
}




  
