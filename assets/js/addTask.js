let tasks = [
  {
    "array-id": "1",
    title: "Website redesign",
    description: "Modify the contents of the main website ...",
    category: "Design",
    "category-color": "#FF7A00",
    progress: "1",
    subtasks: 2,
    "done-tasks": 0,
    urgency: "low",
    "contact-firstname": ["Anton", "Anja"],
    "contact-lastname": ["Mayer", "Schulz"],
    "contact-color": ["#FF7A00", "#9327FF"],
  },
  {
    "array-id": "2",
    title: "Call potential clients",
    description: "Make the product presentation to prospective buyers",
    category: "Sales",
    "category-color": "#FC71FF",
    progress: "1",
    subtasks: 0,
    "done-tasks": 0,
    urgency: "urgent",
    "contact-firstname": ["Benedikt", "David"],
    "contact-lastname": ["Ziegler", "Eisenberg"],
    "contact-color": ["#6E52FF", "#FC71FF"],
  },
  {
    "array-id": "3",
    title: "Video cut",
    description: "Edit the new company video",
    category: "Media",
    "category-color": "#FFC701",
    progress: "3",
    subtasks: 0,
    "done-tasks": 0,
    urgency: "medium",
    "contact-firstname": ["Eva", "Emmanuel"],
    "contact-lastname": ["Fischer", "Mauer"],
    "contact-color": ["#FFBB2B", "#6E52FF"],
  },
  {
    "array-id": "4",
    title: "Social media strategy",
    description: "Develop an ad campaign for brand positioning",
    category: "Marketing",
    "category-color": "#0038FF",
    progress: "4",
    subtasks: 3,
    "done-tasks": 3,
    urgency: "low",
    "contact-firstname": ["Marcel", "Tatjana"],
    "contact-lastname": ["Bauer", "Wolf"],
    "contact-color": ["#462F8A", "#FF4646"],
  },
];

let subtasks = [];
let contact;
let categories = [];

function addTaskRender() {
  docID("addTask").innerHTML = /*html*/ `
    <div class="add-task">
        <form>
          <input autocomplete="off" id="inputFieldTitle" required class="add-task-title cursor-pointer" placeholder="Enter a title" type="text">
          <div class="add-task-select-contact-edit">
             <input autocomplete="off" required onclick ="showContactList()" placeholder="Selected contacts to assign" class="add-task-select-contact cursor-pointer" id="selectContact" type="email"> 
             <img id="contactSelectArrow" src="./assets/img/selectfieldArrow.png">
             <div class="d-none" id="editContact">
               <img onclick="showAddedContact()" class="cursor-pointer" src="./assets/img/logoHaken.png">
               <img src="./assets/img/seperator.png">
               <img class="cursor-pointer" onclick="cancelContact()" src="./assets/img/logoCancel.png">
             </div>
          </div>
          <div id="showContacts" class="d-none add-task-choose-contacts">
              <span onclick="chooseContact(1)" class="add-task-single-contact">You <img id="chooseBoxContact1" src="./assets/img/logoChooseContact.png"></span>
              <span onclick="chooseContact(2)" class="add-task-single-contact">Test <img id="chooseBoxContact2" src="./assets/img/logoChooseContact.png"></span>
              <span onclick="addContact()" class="add-task-single-contact-invite">Invite new contact <img src="./assets/img/logoContactBlue.png"></span>
          </div>
          <div class="add-task-initials-area" id="initials"></div>
        
        </form>

        <form>
          <div class="add-task-due-date">
             <h2>Due Date</h2>
             <input id="inputDate" class="add-task-due-date-input cursor-pointer cursor-pointer" id="dueDate" type="date">
          </div>
        </form>

        <form>
            <div class="add-task-due-date">
               <h2>Category</h2>
               <div class="add-task-select-contact-edit">
                 <input autocomplete="off" onclick="showCategories()" required class="add-task-select-contact cursor-pointer" id="selectCategory" placeholder="Select Task category">
                 <img id="categorySelectArrow" src="./assets/img/selectfieldArrow.png">
                 <div class="d-none" id="editCategory">
                    <img onclick="showAddedCategory()" class="cursor-pointer" src="./assets/img/logoHaken.png">
                    <img src="./assets/img/seperator.png">
                    <img class="cursor-pointer" onclick="cancelCategory()" src="./assets/img/logoCancel.png">
                 </div>
               </div>
                 <div id="showCategories" class="add-task-choose-priority d-none">
              
                   <span onclick="newCategory()" class="add-task-single-priority">New category</span>
                 </div>
              
            </div>
        </form>
          <div class="add-task-priority">
            <button id="urgent" onclick="changeColor(id)" class="add-task-button-priority cursor-pointer">Urgent <img id="urgentLogo" src="./assets/img/urgentLogo.png"></button>
            <button id="medium" onclick="changeColor(id)" class="add-task-button-priority cursor-pointer">Medium <img id="mediumLogo" src="./assets/img/mediumLogo.png"></button>
            <button id="low" onclick="changeColor(id)" class="add-task-button-priority cursor-pointer">Low <img id="lowLogo" src="./assets/img/lowLogo.png"></button>
          </div>
       <form class="add-task-description-form">
        <div class="add-task-description">
          <h2>Description</h2>
          <textarea required id="description" placeholder="Enter a Description" class="add-task-textarea cursor-pointer"></textarea>
        </div>
        </form>
        
        <div class="subtask">
          <div>
              <h2>Subtasks</h2>
             <div>
                <input id="inputSubtask" required class="add-task-subtask cursor-pointer" placeholder="Add new subtask" type="text">
                <img onclick="showSubtasks()" class="add-task-plus-button cursor-pointer" src="./assets/img/subtaskPlus.png">
              </div>

                <div id="subTaskArea" class="d-none"></div>
             </div>

           <div class="add-task-button">
            <button onclick="clearTask()" class="add-task-button-clear cursor-pointer">Clear<img src="./assets/img/xClear.png"></button>  
            <button onclick="newTask(urgency)" class="add-task-button-create cursor-pointer">Add Task<img src="./assets/img/hakenCreateTask.png"></button>
          </div>

        </div>
    </div>
    <img id="taskAddedToBoard" class="task-added-to-board d-none" src="./assets/img/logoAddedToBoard.png">
    `;
}

function showSubtasks() {
  let subtaskArea = document.getElementById(`subTaskArea`);
  let inputSubtask = document.getElementById(`inputSubtask`).value;

  document.getElementById(`inputSubtask`).value = ``;

  subtaskArea.classList.remove(`d-none`);

  subtasks.push(inputSubtask);

  subtaskArea.innerHTML += `
  <div class="subTaskArea">
  <input class="cursor-pointer" type="checkbox">
  <label for="subtask1">${inputSubtask}</label>
  </div>
  `;
}

let urgency;

function changeColorUrgent(i) {
  let urgency = i;
  console.log(urgency);

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

function changeColorMedium(i) {
  let urgency = i;
  console.log(urgency);
  tasks.push({'urgency': urgency});

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

function changeColorLow(i) {
  let urgency = i;
  console.log(urgency);
  tasks.push({'urgency': urgency});

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
    urgency = "Urgent"
  } else if (i === "medium") {
    changeColorMedium(i);
    urgency = "Medium"
  } else if (i === "low") {
    urgency = "Low"
    changeColorLow(i);
  }
}

function newTask(urgency) {
  let title = document.getElementById(`inputFieldTitle`).value;
  let date = document.getElementById(`inputDate`).value;
  let category = document.getElementById(`selectCategory`).value;
  let description = document.getElementById(`description`).value;
  let taskAddedToBoard = document.getElementById(`taskAddedToBoard`);
 
  taskAddedToBoard.classList.remove(`d-none`);
  setTimeout(() => {
    const taskAddedToBoard = document.getElementById("taskAddedToBoard");
    taskAddedToBoard.classList.add("d-none");
  }, 1000);
  contact = document.getElementById(`selectContact`).value;

  clearTaskMask();

  console.log(tasks);

  let task = {
    title: title,
    description: description,
    category: category,
    "category-color": "#0038FF",
    progress: "1",
    subtasks: subtasks.length,
    "done-tasks": 0,
    urgency: urgency,
    date: date,
  };


  tasks.push(task);
}

function clearTaskMask() {
  document.getElementById(`inputFieldTitle`).value = ``;
  document.getElementById(`description`).value = ``;
  document.getElementById(`selectContact`).value = ``;
  document.getElementById(`selectCategory`).value = ``;
}

function clearTask(i) {
  tasks.splice(i, 1);
}

function toggleVisibility(elementId) {
  let element = document.getElementById(elementId);

  if (element.classList.contains("d-none")) {
    element.classList.remove("d-none");
  } else {
    element.classList.add("d-none");
  }
}

function showContactList() {
  toggleVisibility("showContacts");
  selectContact.classList.add(`hide-cursor`);
}

function showCategories() {
  let selectCategory = document.getElementById(`selectCategory`);
  toggleVisibility("showCategories");
  selectCategory.classList.add(`hide-cursor`);
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

  categorySelectArrow.classList.add(`d-none`);
  editCategory.classList.remove(`d-none`);
  showCategories.classList.add(`d-none`);
  selectCategory.placeholder = "New category name";
  selectCategory.classList.remove(`hide-cursor`);
  selectCategory.focus();
}

function showAddedCategory() {
  let selectCategory = document.getElementById(`selectCategory`).value;
  let showCategories = document.getElementById(`showCategories`);

  if (!categories.includes(selectCategory)) {
    categories.push(selectCategory);
    showCategories.innerHTML += ` <span class="add-task-single-priority">${selectCategory}</span>`;
  } else {
    alert(`Ist bereits vorhanden`);
  }
}

function cancelCategory() {
  cancelInputs(`selectCategory`);
}

function cancelContact() {
  cancelInputs(`selectContact`);
}

function cancelInputs(elementId) {
  let element = document.getElementById(elementId);
  element.value = ``;
  initials.classList.add(`d-none`);
}
