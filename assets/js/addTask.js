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

let subtasks = [];
let contact;
let urgency;
let categoryColor;

function showSubtasks() {
  let subtaskArea = document.getElementById(`subTaskArea`);
  let inputSubtask = document.getElementById(`inputSubtask`).value;
  
  subtaskArea.classList.remove(`d-none`);
  subtasks.push(inputSubtask);
  subtaskArea.innerHTML += `
  <div class="subTaskArea">
  <input class="cursor-pointer" type="checkbox">
  <label for="subtask1">${inputSubtask}</label>
  </div>
  `;
}

function changeColorUrgent() {
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

function createJsonTask(title, description, category, subtasks, urgency, date, firstName, lastName, categoryColor){
  return {
    title: title,
    description: description,
    category: category,
    "category-color": categoryColor,
    progress: "1",
    subtasks: subtasks.length,
    "done-tasks": 0,
    urgency: urgency,
    date: date,
    "contact-firstname": firstName,
    "contact-lastname": lastName,
    "contact-color": ["#462F8A", "#FF4646"],
  };
}

function newTask() {
  let title = document.getElementById(`inputFieldTitle`).value;
  let date = document.getElementById(`inputDate`).value;
  let category = document.getElementById(`selectCategory`).value;
  let description = document.getElementById(`description`).value;
  let taskAddedToBoard = document.getElementById(`taskAddedToBoard`);
  taskAddedToBoard.classList.remove(`d-none`);
  taskAddedToBoard.classList.remove(`task-added-to-board-hide`);
  taskAddedToBoard.classList.add(`task-added-to-board`);
  
  setTimeout(() => {
    taskAddedToBoard.classList.add(`task-added-to-board-hide`);
   
    closeAddTaskToBoard();
  }, 2000);
  
  document.getElementById(`inputSubtask`).value = ``;
  let contact = document.getElementById(`selectContact`).value;
  let partOfContact = contact.split(" "); // separiert Vor und Nachnamen
  let firstName = partOfContact[0]; // speicert Vorname
  let lastName = partOfContact[1]; // speichert Nachname
  clearTaskMask();
  let task = createJsonTask(title, description, category, subtasks, urgency, date, firstName, lastName, categoryColor);
  getElement('tasks');
  tasks.push(task);
  console.log(tasks);
  setElement('tasks', tasks);
  addBoardInit();
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
}

function toggleVisibility(elementId) {
  let element = document.getElementById(elementId);

  if (element.classList.contains("add-task-hide-contacts")) {
    element.classList.remove("add-task-hide-contacts");
  } else {
    element.classList.add("add-task-hide-contacts");
  }
}

function showContactList() {
  toggleVisibility("showContacts");
  selectContact.classList.add(`hide-cursor`);
}

let isShowAddedCategoryCalled = false;

function showCategories() {
  let selectCategory = document.getElementById(`selectCategory`);
  toggleVisibility("showCategories");
  selectCategory.classList.add(`hide-cursor`);
  if (!isShowAddedCategoryCalled) {  // zeigt die gespeicherten Categories nur einmal an auch bei mehrmaligem klicken
    showAddedCategory(); // zeigt die gespeicherten Catagories an
    isShowAddedCategoryCalled = true;
  }
}

let clicked = true;

function chooseContact(i) {
  let chooseBoxContact = document.getElementById(`chooseBoxContact${i}`);

  if (clicked) {
    chooseBoxContact.src = "./assets/img/checkButtonContact.png";
    clicked = false;
  } else {
    chooseBoxContact.src = "./assets/img/logoChooseContact.png";
    clicked = true;
  }
}

// add new Contact

function addContact() {
  let editContact = document.getElementById(`editContact`);

  showContacts.classList.add(`d-none`);
  selectContact.placeholder = "Contact email";
  selectContact.classList.remove(`hide-cursor`);
  selectContact.focus();

  editContact.classList.remove(`d-none`);
  contactSelectArrow.classList.add(`d-none`);
}

function showAddedContact() {
  contact = document.getElementById(`selectContact`).value;
  let initials = document.getElementById(`initials`);
  initials.classList.remove(`d-none`);
  getInitials(contact);
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
  initials.innerHTML += `<div class="add-task-initials">${initialsOfName}</div>`;
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
  let category = {
    name: selectCategory,
    color: categoryColor
  };

  if (!categories.includes(selectCategory)) {
    categories.push(category);
  } else {
    alert(`Ist bereits vorhanden`);
  }
}

function finishPushCategoryToArray(){
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

function cancelContact() {
  cancelInputs(`selectContact`);
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

  if(id === "http://127.0.0.1:5500/assets/img/ellipseGreen.png" || id === "./assets/img/ellipseGreen.png"){
    categoryColor = "#2AD300";
  }else if(id === "http://127.0.0.1:5500/assets/img/ellipseOrange.png" || id === "./assets/img/ellipseOrange.png"){
    categoryColor = "#FF7A00";
  }else if(id === "http://127.0.0.1:5500/assets/img/ellipseLightblue.png" || id === "./assets/img/ellipseLightblue.png"){
    categoryColor = "#1FD7C1";
  }else if(id === "http://127.0.0.1:5500/assets/img/ellipseRed.png" || id === "./assets/img/ellipseRed.png"){
    categoryColor = "#FF0000";
  }else if(id === "http://127.0.0.1:5500/assets/img/ellipseBlue.png" || id === "./assets/img/ellipseBlue.png"){
    categoryColor = "#0038FF";
  }else if(id === "http://127.0.0.1:5500/assets/img/ellipseRosa.png" || id === "./assets/img/ellipseRosa.png"){
    categoryColor = "#E200BE";
  }
  pushCategoryToArray(categoryColor);
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
  addColorToCategory(categoryImg);
}

function markColor(){
  let selectCategory = document.getElementById("selectCategory").value;
  
  if(selectCategory.includes("Sales")){
    document.getElementById("rosa").style.boxShadow = "0 4px 4px 0 rgba(0, 0, 0, 0.25)";
    categories.push("#2AD300");
  }else if(selectCategory.includes("Backoffice")){
    document.getElementById("lightBlue3,").style.boxShadow = "0 4px 4px 0 rgba(0, 0, 0, 0.25)";
  }else if(selectCategory.includes("Design")){
    document.getElementById("orange").style.boxShadow = "0 4px 4px 0 rgba(0, 0, 0, 0.25)";
  }else if(selectCategory.includes("Marketing")){
  document.getElementById("green").style.boxShadow = "0 4px 4px 0 rgba(0, 0, 0, 0.25)";
}else if(selectCategory.includes("Media")){
  document.getElementById("blue").style.boxShadow = "0 4px 4px 0 rgba(0, 0, 0, 0.25)";
}
}