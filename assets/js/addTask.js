let categories = [
  {
    name: "Design",
    img: "./assets/img/ellipseOrange.png",
    color: "#FF7A00",
  },
  {
    name: "Sales",
    img: "./assets/img/ellipseRosa.png",
    color: "#E200BE",
  },
  {
    name: "Backoffice",
    img: "./assets/img/ellipseLightblue.png",
    color: "#1FD7C1",
  },
  {
    name: "Media",
    img: "./assets/img/ellipseBlue.png",
    color: "#0038FF",
  },
  {
    name: "Marketing",
    img: "./assets/img/ellipsegreen.png",
    color: "#2AD300"
  }
];

let tasks = [];
let subtasks;
let contact;
let urgency;
let categoryColor;
let categoryId;
let editLabelsSubtasks;
edit = false;
let subtaskStatus = [];
let statusSubtask;
let amountOfAddedTask = 0;

function showSubtasks(id) {
  let subtaskArea = document.getElementById(`subTaskArea`);
  let inputSubtask = document.getElementById(`inputSubtask`).value;
  if (edit === false || id === undefined) {
    statusSubtask = 0;
  } else {
    statusSubtask = jsonToEdit.subtaskStatus[id];
  }
  if (id === undefined) {
    id = amountOfAddedTask;
  }

  subtaskArea.classList.remove(`d-none`);
  subtasks.push(inputSubtask);
  subtaskStatus.push(statusSubtask)
  subtaskArea.innerHTML += /*html*/ `
  <div id = "subtask${id}" class="subTaskArea subtask${id}">
  <div class ="inner-subtask1">
    <input onclick=" pushDoneSubtask(${id})" id="subtaskCheckbox${id}" class="cursor-pointer" type="checkbox">
    <label id="labelForSubtask${id}">${inputSubtask}</label>
  </div>
    <div class="inner-subtask2" id="inner-subtask${id}">
      <img onclick="deleteSubtask(${id})" class="delete-subtask-button" src="./assets/img/delete_contact.png">
      <img onclick = "renameSubtask(${id})" src="./assets/img/edit_contact.png">
    </div>
  </div>
  `;

  document.getElementById(`inputSubtask`).value = '';
  setElement("subtasks", subtasks);
  if (subtasksWereChecked === true) {
    checkSubtasks();
    doneSubtask = tasks[openedTask]["done-tasks"]
  }
  if (jsonToEdit.subtaskStatus[id] === 1) {
    docID('inner-subtask' + id).classList.add('d-none');
  }
  if (jsonToEdit.subtasks[id] === undefined) {
    docID('subtaskCheckbox' + id).disabled = true;
    docID('subtaskCheckbox' + id).classList.remove('cursor-pointer')

  }
  amountOfAddedTask++;
}

//Onclick auf PriorityButtons

function changeColorUrgent() {
  let urgent = document.getElementById(`urgent`);
  let low = document.getElementById(`low`);
  let medium = document.getElementById(`medium`);
  let lowLogo = document.getElementById(`lowLogo`);
  let mediumLogo = document.getElementById(`mediumLogo`);
  let urgentLogo = document.getElementById(`urgentLogo`);
  urgent.classList.add("change-color-urgent");
  urgent.classList.add("clicked");
  medium.classList.remove("change-color-medium");
  medium.classList.remove("clicked");
  low.classList.remove("clicked");
  low.classList.remove("change-color-low");
  urgentLogo.src = `./assets/img/urgentLogoWhite.png`;
  lowLogo.src = `./assets/img/lowLogo.png`;
  mediumLogo.src = `./assets/img/mediumLogo.png`;
}

function changeColorMedium() {
  let urgent = document.getElementById(`urgent`);
  let low = document.getElementById(`low`);
  let medium = document.getElementById(`medium`);
  let lowLogo = document.getElementById(`lowLogo`);
  let mediumLogo = document.getElementById(`mediumLogo`);
  let urgentLogo = document.getElementById(`urgentLogo`);
  urgent.classList.remove("change-color-urgent");
  medium.classList.add("clicked");
  low.classList.remove("clicked");
  urgent.classList.remove("clicked");
  medium.classList.add("change-color-medium");
  low.classList.remove("change-color-low");
  lowLogo.src = `./assets/img/lowLogo.png`;
  urgentLogo.src = `./assets/img/urgentLogo.png`;
  mediumLogo.src = `./assets/img/mediumLogoWhite.png`;
}

function changeColorLow() {
  let urgent = document.getElementById(`urgent`);
  let low = document.getElementById(`low`);
  let medium = document.getElementById(`medium`);
  let lowLogo = document.getElementById(`lowLogo`);
  let mediumLogo = document.getElementById(`mediumLogo`);
  let urgentLogo = document.getElementById(`urgentLogo`);
  urgent.classList.remove("change-color-urgent");
  medium.classList.remove("change-color-medium");
  low.classList.add("change-color-low");
  medium.classList.remove("clicked");
  urgent.classList.remove("clicked");
  low.classList.add("clicked");
  lowLogo.src = `./assets/img/lowLogoWhite.png`;
  urgentLogo.src = `./assets/img/urgentLogo.png`;
  mediumLogo.src = `./assets/img/mediumLogo.png`;
}

function changeColor(i) {
  if (i === "urgent") {
    changeColorUrgent(i);
    urgency = "./assets/img/urgentLogo.png";
  } else if (i === "medium") {
    changeColorMedium(i);
    urgency = "./assets/img/mediumLogo.png";
  } else if (i === "low") {
    urgency = "./assets/img/lowLogo.png";
    changeColorLow(i);
  }
}

function createJsonTask(title, description, category, subtasks, subtasksLength, urgency, date, firstName, lastName, categoryColor, contactIds, contactcolors, taskId) {
  return {
    title: title,
    description: description,
    category: category,
    "category-color": categoryColor,
    progress: progress,
    subtasksLength: subtasksLength,
    subtasks: subtasks,
    "done-tasks": 0,
    urgency: urgency,
    date: date,
    "contact-firstname": firstName,
    "contact-lastname": lastName,
    "contact-color": contactcolors,
    arrayId: 0,
    contactid: contactIds,
    taskId: taskId,
    categoryId: categoryId,
    subtaskStatus: subtaskStatus
  };
}
let firstName = [];
let lastName = [];
let contactcolors = [];
let contactIds = [];


function newTask() {
  if (edit === true) {
    safeEditedTask();
  }
  else {
    let title = document.getElementById(`inputFieldTitle`).value;
    let date = document.getElementById(`inputDate`).value;
    let category = document.getElementById(`selectCategory`).value;
    let description = document.getElementById(`description`).value;
    let subtasksLength = subtasks.length;
    let taskAddedToBoard = document.getElementById(`taskAddedToBoard`);

    taskAddedToBoard.classList.remove(`d-none`);
    taskAddedToBoard.classList.remove(`task-added-to-board-hide`);
    taskAddedToBoard.classList.add(`task-added-to-board`);
    setTimeout(() => {
      window.location.href = "./board.html"; // springt nachdem AddTask gerendert wurde auf die BoardSeite
      closeAddTaskToBoard();
    }, 2000);
    document.getElementById(`inputSubtask`).value = ``;
    safeContactsInTask();
    const highestTaskId = findHighestId(tasks);
    taskId = highestTaskId + 1;
    clearTaskMask();
    let task = createJsonTask(title, description, category, subtasks, subtasksLength, urgency, date, firstName, lastName, categoryColor, contactIds, contactcolors, taskId);
    getElement('tasks');
    firstName = [];
    lastName = [];
    numberOfContactsToAdd = [];
    numberOfColorsToAdd = [];
    numberOfIdsToAdd = [];
    subtaskStatus = [];
    amountOfAddedTask = 0;
    tasks.push(task);
    setElement('tasks', tasks);
    addBoardInit();
  }

  function findHighestId(tasks) {
    let highestTaskId = 3;

    for (const task of tasks) {
      if (task.taskId > highestTaskId) {
        highestTaskId = task.taskId;
      }
    }
    return highestTaskId;
  }
}

function clearTaskMask() {
  document.getElementById(`inputFieldTitle`).value = ``;
  document.getElementById(`description`).value = ``;
  document.getElementById(`selectContact`).value = ``;
  document.getElementById(`selectCategory`).value = ``;
  document.getElementById(`placeholderColorCategory`).classList.add(`d-none`);
}

function clearTask(i) {
  tasks.splice(i, 1);
  subtasks.splice(i, 1);
  setElement('tasks', tasks);
  setElement('subtasks', subtasks);
}

function toggleVisibility(elementId) {
  let element = document.getElementById(elementId);
  element.classList.remove("d-none");
  docID('showCategories').innerHTML = ''

  if (element.classList.contains("add-task-hide-contacts")) {
    element.classList.remove("add-task-hide-contacts");
  } else {
    element.classList.add("add-task-hide-contacts");
  }
}

function showContactList(id) {
  toggleVisibility("showContacts" + id);
}


function showCategories() {
  let selectCategory = document.getElementById(`selectCategory`);
  toggleVisibility("showCategories");
  selectCategory.classList.add(`hide-cursor`);
  showAddedCategory(); // zeigt die gespeicherten Catagories an
}
// Eine Map, um den Status der Kontakte zu verfolgen
const contactStatusMap = new Map();
let numberOfContactsToAdd = [];
let numberOfColorsToAdd = [];
let numberOfIdsToAdd = [];

function chooseContact(i, contactName, initials, color, id, contactId) {
  let chooseBoxContact = document.getElementById(`${id}chooseBoxContact${i}`);
  let parentDiv = chooseBoxContact.parentElement;

  // Überprüfe den aktuellen Status des Kontakts
  const isClicked = contactStatusMap.get(i) || false;

  if (!isClicked) {
    chooseBoxContact.src = "./assets/img/checkButtonContact.png";
    contactStatusMap.set(i, true);
    showAddedContact(i, initials, color, id);
    parentDiv.classList.add("add-task-select-contact-activate");

    // Füge den Kontakt zum Array numberOfContactsToAdd hinzu
    numberOfContactsToAdd.push(contactName);
    numberOfColorsToAdd.push(color);
    numberOfIdsToAdd.push(contactId);

  } else {
    chooseBoxContact.src = "./assets/img/logoChooseContact.png";
    contactStatusMap.set(i, false);
    cancelContact(i, id);
    parentDiv.classList.remove("add-task-select-contact-activate");

    // Entferne den Kontakt aus dem Array numberOfContactsToAdd
    const index = numberOfContactsToAdd.indexOf(contactName);
    if (index !== -1) {
      numberOfContactsToAdd.splice(index, 1);
    }
    const indexcol = numberOfColorsToAdd.indexOf(color);
    if (indexcol !== -1) {
      numberOfColorsToAdd.splice(indexcol, 1);
    }
    const indexid = numberOfIdsToAdd.indexOf(contactId);
    if (indexid !== -1) {
      numberOfIdsToAdd.splice(indexid, 1);
    }
  }
}

// add new Contact

function addContact() {
  let editContact = document.getElementById(`editContact`);
  selectContact.placeholder = "Contact email";
  selectContact.classList.remove(`hide-cursor`);
  selectContact.focus();
  editContact.classList.remove(`d-none`);
  contactSelectArrow.classList.add(`d-none`);
}

function showAddedContact(i, initials, color, id) {
  let initialsIcon = document.getElementById(`${id}initials${id}`);
  initialsIcon.classList.remove(`d-none`);
  initialsIcon.innerHTML += `<div id="${id}taskInitials${i}" class="add-task-initials">${initials}</div>`;
  document.getElementById(id + 'taskInitials' + i).style.backgroundColor = color;

}

// Initialien generieren

function getInitials(contact) {
  // Teile den Namen in einzelne Wörter auf
  let words = contact.split(" ");
  // Erzeuge einen leeren String für die Initialen
  let initialsOfName = "";
  // Iteriere über die Wörter
  for (let i = 0; i < words.length; i++) {
    // Extrahiere den ersten Buchstaben des aktuellen Wortes und konvertiere ihn in Großbuchstaben
    initialsOfName += words[i].charAt(0).toUpperCase();
  }
  initials.innerHTML += `<div id="taskInitials" class="add-task-initials">${initialsOfName}</div>`;
}

function newCategory() {
  let showCategories = document.getElementById(`showCategories`);
  let editCategory = document.getElementById(`editCategory`);
  let selectCategory = document.getElementById(`selectCategory`);
  let categoryColors = document.getElementById(`categoryColors`);
  categoryColors.classList.remove(`d-none`);
  categorySelectArrow.classList.add(`d-none`);
  editCategory.classList.remove(`d-none`);
  showCategories.classList.add(`d-none`);
  selectCategory.placeholder = "New category name";
  selectCategory.classList.remove(`hide-cursor`);
  selectCategory.focus();
}

let savedCategory;

function pushCategoryToArray(categoryColor) {
  let selectCategory = document.getElementById(`selectCategory`).value;
  let category = { name: selectCategory, color: categoryColor };

  if (!categories.includes(selectCategory)) {
    categories.push(category);
  } else {
    alert(`Ist bereits vorhanden`);
  }
}

function finishPushCategoryToArray() {
  categoryColors.classList.add(`d-none`);
}

function showAddedCategory() {
  let showCategories = document.getElementById(`showCategories`);

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    showCategories.innerHTML += /*html*/ `<span id="savedCategory${i}" onclick="chooseCategory(${i})" class="add-task-single-priority">
    ${category[`name`]}<img src=${category['img']}></span>`;
  }
}

function cancelCategory() {
  cancelInputs(`selectCategory`);
  categoryColors.classList.add(`d-none`);
  selectCategory.placeholder = "Select Task category";
  editCategory.classList.add(`d-none`);
  categorySelectArrow.classList.remove(`d-none`);
  placeholderColorCategory.classList.add(`d-none`);
}

function cancelContact(i, id) {
  const taskInitials = document.getElementById(`${id}taskInitials${i}`);

  if (taskInitials) {
    taskInitials.remove();
  }
}

function cancelInputs(elementId) {
  let element = document.getElementById(elementId);
  element.value = ``;
  initials.classList.add(`d-none`);
}

function addColorToCategory(id) {
  let colorOfCategory = id;
  placeholderColorCategory = document.getElementById(`placeholderColorCategory`);
  placeholderColorCategory.src = `${colorOfCategory}`;
  placeholderColorCategory.classList.remove(`d-none`);

  if (id === "http://127.0.0.1:5500/assets/img/ellipsegreen.png" || id === "./assets/img/ellipsegreen.png") {
    categoryColor = "#2AD300";
  } else if (id === "http://127.0.0.1:5500/assets/img/ellipseOrange.png" || id === "./assets/img/ellipseOrange.png") {
    categoryColor = "#FF7A00";
  } else if (id === "http://127.0.0.1:5500/assets/img/ellipseLightblue.png" || id === "./assets/img/ellipseLightblue.png") {
    categoryColor = "#1FD7C1";
  } else if (id === "http://127.0.0.1:5500/assets/img/ellipseRed.png" || id === "./assets/img/ellipseRed.png") {
    categoryColor = "#FF0000";
  } else if (id === "http://127.0.0.1:5500/assets/img/ellipseBlue.png" || id === "./assets/img/ellipseBlue.png") {
    categoryColor = "#0038FF";
  } else if (id === "http://127.0.0.1:5500/assets/img/ellipseRosa.png" || id === "./assets/img/ellipseRosa.png") {
    categoryColor = "#E200BE";
  }
}

function chooseCategory(i) {
  let savedCategory = document.getElementById(`savedCategory${i}`);
  let showCategories = document.getElementById(`showCategories`);
  let selectCategory = document.getElementById(`selectCategory`);
  let categoryImg = categories[i][`img`];
  // Zugriff auf das <img>-Element innerhalb des savedCategory-Containers
  let savedCategoryImg = savedCategory.querySelector("img");
  // Ersetze das src-Attribut des placeholderColorCategory-Bildes mit dem des savedCategory-Bildes
  let placeholderColorCategory = document.getElementById("placeholderColorCategory");
  placeholderColorCategory.src = savedCategoryImg.src;
  // Setze den Wert des selectCategory-Eingabefeldes auf den Text der ausgewählten Kategorie
  selectCategory.value = savedCategory.textContent;
  placeholderColorCategory.classList.remove(`d-none`);
  selectCategory.style.paddingLeft = "0";
  showCategories.classList.add(`d-none`);
  showCategories.classList.add(`add-task-hide-contacts`);
  addColorToCategory(categoryImg);
  categoryId = i;
}

function markColor() {
  let selectCategory = document.getElementById("selectCategory").value;

  if (selectCategory.includes("Sales")) {
    document.getElementById("rosa").style.boxShadow = "0 4px 4px 0 rgba(0, 0, 0, 0.25)";
    categories.push("#2AD300");
  } else if (selectCategory.includes("Backoffice")) {
    document.getElementById("lightBlue3,").style.boxShadow = "0 4px 4px 0 rgba(0, 0, 0, 0.25)";
  } else if (selectCategory.includes("Design")) {
    document.getElementById("orange").style.boxShadow = "0 4px 4px 0 rgba(0, 0, 0, 0.25)";
  } else if (selectCategory.includes("Marketing")) {
    document.getElementById("green").style.boxShadow = "0 4px 4px 0 rgba(0, 0, 0, 0.25)";
  } else if (selectCategory.includes("Media")) {
    document.getElementById("blue").style.boxShadow = "0 4px 4px 0 rgba(0, 0, 0, 0.25)";
  }
}

function deleteSubtask(id, taskId) {
  subtasks.splice(id, 1);
  subtaskStatus.splice(id, 1);
  docID("subtask" + id).classList.add('d-none')
}

function renameSubtask(id) {
  docID('inputSubtask').value = docID('labelForSubtask' + id).innerHTML
  deleteSubtask(id);

}


