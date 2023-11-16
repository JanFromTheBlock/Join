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
    img: "./assets/img/ellipseGreen.png",
    color: "#2AD300",
  },
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
let newsubtask;
let toggleContacts = false;
let subtaskCounter = 0;
let firstName = [];
let lastName = [];
let contactcolors = [];
let contactIds = [];
let contactsOpen;
const contactStatusMap = new Map();
let numberOfContactsToAdd = [];
let numberOfColorsToAdd = [];
let numberOfIdsToAdd = [];
let savedCategory;


function countDoneTasks(index, count) {
  for (let key in index) {
    if (index.hasOwnProperty(key) && index[key] === 1) {
      count++
    }
  }
  doneSubtask = count;
}


function editCheck(id) {
  if (edit === true) {
    if (jsonToEdit.subtaskStatus[id] === 1) {
      docID("inner-subtask" + id).classList.add("d-none");
    }
  }
}


function undefinedCheck(id) {
  if (jsonToEdit && jsonToEdit.subtasks && jsonToEdit.subtasks[id] === undefined) {
    docID("subtaskCheckbox" + id).disabled = true;
    docID("subtaskCheckbox" + id).classList.remove("cursor-pointer");
  }
}


function jsonToEditCheck(id) {
  if (jsonToEdit) {
  } else {
    docID("subtaskCheckbox" + id).disabled = true;
    docID("subtaskCheckbox" + id).classList.remove("cursor-pointer");
  }
}


function changeColor(status) {
  changeColorIdUrgent(docID(`urgent`), docID(`urgentLogo`), status)
  changeColorIdMedium(docID(`medium`), docID(`mediumLogo`), status)
  changeColorIdLow(docID(`low`), docID(`lowLogo`), status)
}


function changeColorIdUrgent(urgent, urgentLogo, status) {
  if (status == "urgent") {
    urgent.classList.add("change-color-urgent");
    urgent.classList.add("clicked");
    urgency = "./assets/img/urgentLogo.png";
  }
  else {
    urgent.classList.remove("change-color-urgent");
    urgent.classList.remove("clicked");
  }
  urgentLogo.src = `./assets/img/urgentLogoWhite.png`;
}


function changeColorIdMedium(medium, mediumLogo, status) {
  if (status == "medium") {
    medium.classList.add("change-color-medium");
    medium.classList.add("clicked");
    urgency = "./assets/img/mediumLogo.png";
  } else {
    medium.classList.remove("change-color-medium");
    medium.classList.remove("clicked");
  }
  mediumLogo.src = `./assets/img/mediumLogo.png`;
}


function changeColorIdLow(low, lowLogo, status) {
  if (status == "low") {
    low.classList.add("clicked");
    low.classList.add("change-color-low");
    urgency = "./assets/img/lowLogo.png";
  } else {
    low.classList.remove("clicked");
    low.classList.remove("change-color-low");
  }
  lowLogo.src = `./assets/img/lowLogo.png`;
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
    subtaskStatus: subtaskStatus,
  };
}


function showTaskAddedToBoardButton() {
  let taskAddedToBoard = docID(`taskAddedToBoard`);
  taskAddedToBoard.classList.remove(`d-none`, `task-added-to-board-hide`);
  taskAddedToBoard.classList.add(`task-added-to-board`);
}


function cacheOfArrays() { 
  firstName = [];
  lastName = [];
  numberOfContactsToAdd = [];
  numberOfColorsToAdd = [];
  numberOfIdsToAdd = [];
  subtaskStatus = [];
  subtaskCounter = 0;
}


function jumpToBoard() {
  setTimeout(() => {
    window.location.href = "./board.html";
    closeAddTaskToBoard();
  }, 2000);
}


async function newTask() {
  if (edit === true) {
    safeEditedTask();
  } else {
    newTaskElse();
  }
}


async function newTaskElse() {
  if (urgency === undefined)
    changeColor('low');
  showTaskAddedToBoardButton();
  jumpToBoard();
  docID(`inputSubtask`).value = ``;
  safeContactsInTask();
  taskId = findHighestId(tasks) + 1;
  clearTaskMask();
  let task = newTaskJSONCreate();
  await getElement("tasks");
  cacheOfArrays();
  tasks.push(task);
  await setElement("tasks", tasks);
}


function newTaskJSONCreate() {
  let title = docID(`inputFieldTitle`).value;
  let date = docID(`inputDate`).value;
  let category = docID(`selectCategory`).value;
  let description = docID(`description`).value;
  let subtasksLength = subtasks.length;
  return createJsonTask(title, description, category, subtasks, subtasksLength, urgency, date, firstName, lastName, categoryColor, contactIds, contactcolors, taskId);
}


function findHighestId(tasks) {
  let highestTaskId = 0;
  for (const task of tasks) {
    if (task.taskId > highestTaskId) {
      highestTaskId = task.taskId;
    }
  }
  return highestTaskId;
}


function clearTaskMask() {
  let array = [`inputFieldTitle`, `description`, `selectContact`, `selectCategory`];
  for (let i = 0; i < array.length; i++) {
    docID(array[i]).value = ``;
  }
  docID(`placeholderColorCategory`).classList.add(`d-none`);
}


function clearTask(i) {
  tasks.splice(i, 1);
  subtasks.splice(i, 1);
  setElement("tasks", tasks);
  setElement("subtasks", subtasks);
}


function toggleVisibility(elementId) {
  let element = docID(elementId);
  element.classList.remove("d-none");
  docID("showCategories").innerHTML = "";

  if (element.classList.contains("add-task-hide-contacts")) {
    taskHiddenHide(element);
  } else {
    taskHiddenHideElse(element);
  }
}


function taskHiddenHide(element) {
  element.classList.remove("add-task-hide-contacts");
    if (toggleContacts) {
        contactsOpen = true;
    }
}


function taskHiddenHideElse(element) {
  element.classList.add("add-task-hide-contacts");
    if (toggleContacts) {
      contactsOpen = false;
    }
}


function showContactList(id) {
  toggleContacts = true;
  toggleVisibility("showContacts" + id);
  toggleContacts = false;
}


function showCategories() {
  toggleVisibility("showCategories");
  docID(`selectCategory`).classList.add(`hide-cursor`);
  showAddedCategory();
}


function getInitials(contact) {
  let words = contact.split(" "); 
  let initialsOfName = ""; 
    for (let i = 0; i < words.length; i++) {
    initialsOfName += words[i].charAt(0).toUpperCase();
  }
  initials.innerHTML += `<div id="taskInitials" class="add-task-initials">${initialsOfName}</div>`;
}


function newCategory() {
  docID(`categorySelectArrow`).classList.add(`d-none`);
  docID(`editCategory`).classList.remove(`d-none`);
  docID(`showCategories`).classList.add(`d-none`);
  docID(`selectCategory`).placeholder = "New category name";
  docID(`selectCategory`).classList.remove(`hide-cursor`);
  docID(`selectCategory`).focus();
}


function pushCategoryToArray(categoryColor) {
  let selectCategory = docID(`selectCategory`).value;
  let category = { name: selectCategory, color: categoryColor };

  if (!categories.includes(selectCategory)) {
    categories.push(category);
  } else {
    alert(`Ist bereits vorhanden`);
  }
}


function showAddedCategory() {
  let showCategories = docID(`showCategories`);
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    showCategories.innerHTML += /*html*/ `<span id="savedCategory${i}" onclick="chooseCategory(${i})" class="add-task-single-priority">
    ${category[`name`]}<img src=${category["img"]}></span>`;
  }
}

function addColorToCategory(id) {
  placeholderColorCategory = docID(`placeholderColorCategory`);
  placeholderColorCategory.src = `${id}`;
  placeholderColorCategory.classList.remove(`d-none`);
  let imgs = ['ellipsegreen.png', 'ellipseOrange.png', 'ellipseLightblue.png', 'ellipseRed.png', 'ellipseBlue.png', 'ellipseRosa.png'];
  let color = ["#2AD300", "#FF7A00", "#1FD7C1", "#FF0000", "#0038FF", "#E200BE"];
  addcolorLoop(imgs, color, id);
}


function addcolorLoop(imgs, color, id) {
  for (let i = 0; i < imgs.length; i++) {
    if (id.includes(imgs[i])) { categoryColor = color[i]; };
  }
}


function chooseCategory(i) {
  let savedCategoryImg = docID(`savedCategory${i}`).querySelector("img");
  let placeholderColorCategory = docID("placeholderColorCategory");
  placeholderColorCategory.src = savedCategoryImg.src;
  docID(`selectCategory`).value = docID(`savedCategory${i}`).textContent;
  docID("placeholderColorCategory").classList.remove(`d-none`);
  docID(`selectCategory`).style.paddingLeft = "0";
  docID(`showCategories`).classList.add(`d-none`);
  docID(`showCategories`).classList.add(`add-task-hide-contacts`);
  categoryId = i;
}


function logDivID(event) {
  let selectedTxtElement = event.target;
  if (selectedTxtElement.id !== "do-not-close" && contactsOpen === true) {
    showContactList(0);
  }
  selectedTxtElement = selectedTxtElement.parentNode;
}
