let menuId = ["menu-summary", "menu-board", "menu-add", "menu-contacts"];
addTaskInitClicked = false;
addBoardInitClicked = false;

/**
 * Renders the header with the project title, logo, help button, and user information.
 * Also includes the dropdown menu for legal notes and logout.
 */
function headerRender() {
  docID("header").innerHTML = /*html*/ `
        <img class="header-img" src="./assets/img/logo624.png">
        <div class="header-data">
            <span id = "header-title">Kanban Project Management Tool</span>
            <a id ="help-button" href="./help.html"><img class="header-help" id="header-help" src="./assets/img/help.png"></a>
            <div onclick = "showDropdown(), doNotClose(event)" id="header-user-con">
                <div id="header-user-ellipse">
                    <div id="header-user-name"> ${userInitial}
                    </div>
                </div>
            </div>
        </div>
        <div onclick="doNotClose(event)" id='menu-dropdown' class='d-none'>
          <a href="./legalNotes.html" class="dropdown-menu">Legal Notice</a>
          <a href="./privatePolicy.html" class="dropdown-menu">Privacy Policy</a>
          <a class="dropdown-menu" onclick="logOut()">Logout</a>
        </div>
        <div id="menu-responsive"></div>
    `;
  oneLetter();
}

/**
 * Adds a CSS class to the user name element if it contains only one letter.
 */
function oneLetter() {
  if (userInitial.length == 1) {
    docID('header-user-name').classList.add('one-letter');
  }
}

/**
 * Renders the navigation bar with menu options and legal information links.
 */
function navRender() {
  docID("nav").innerHTML = /*html*/ `
        <div id="menu" class="menu"></div>
        <div class="legal">
            <a href = "./legalNotes.html" class="topic" id = "legal-notice" onclick = "openLegalNotice()">
                <img src="./assets/img/legal.png">
                <span>Legal notice</span>
            </a>
            <a href = "./privatePolicy.html" class="topic" id = "private-policy" onclick = "openPrivatePolicy()">
                <img src="./assets/img/legal.png">
                <span>Private policy</span>
            </a>
        </div>
    `;
  menuRender();
  menuResponsiveRender();
}

/**
 * Renders menu options dynamically based on menu IDs, URLs, names, and images.
 */
function menuRender() {
  docID("menu").innerHTML = "";
  let urls = [
    "./summary.html",
    "./board.html",
    "./addTask.html",
    "./contacts.html",
  ];
  let names = ["Summary", "Board", "Add Task", "Contacts"];
  let img = ["Summary", "Board", "add_task", "contact"];

  for (let i = 0; i < menuId.length; i++) {
    docID("menu").innerHTML += /*html*/ `
            <a id="${menuId[i]}" href="${urls[i]}" class="topic">
                <img src="./assets/img/${img[i]}.png">
                <span>${names[i]}</span>
            </a>
        `;
  }
}

/**
 * Renders responsive menu options dynamically based on URLs, images, and names.
 */
function menuResponsiveRender() {
  docID('menu-responsive').innerHTML = "";
  let urls = ["./summary.html", "./board.html", "./addTask.html", "./contacts.html"];
  let imgs = ["summary_button", "board_button", "addTask_button", "contacts_button"];
  let names = ["summary", "board", "add-task", "contacts"];
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    docID('menu-responsive').innerHTML += /*html*/`
      <a class = "button-responsive" href="${urls[i]}"><img id = "${names[i]}-responsive" src="./assets/img/${img}.png"></a>
    `
  }
}

/**
 * Highlights the active menu option based on the provided ID.
 *
 * @param {string} id - The ID of the active menu option.
 */
function activeSite(id) {
  for (let i = 0; i < menuId.length; i++) {
    if (menuId[i] == id) {
      docID(menuId[i]).classList.add("topic-active");
    } else {
      docID(menuId[i]).classList.remove("topic-active");
    }
  }
}

/**
 * Renders the "Add Task" form, including input fields for task details, contacts, due date, category, priority, and description.
 */
function addTaskRender() {
  progress = 1;
  let addTask = document.getElementById(`addTask`);
  addTask.innerHTML = /*html*/ `
   <form onsubmit="newTask(); return false;">
      <div id="addTaskUnderDiv" class="add-task">
        <div id="taskTitle" class="add-task-to-board-title">
           <img onclick="closeAddTaskToBoard()" class="add-task-to-board-close-button" src="./assets/img/close.png">
           <h2 id="add-edit-task" class="add-task-h2-big">Add Task</h2>
        </div>
             <input required autocomplete="off" id="inputFieldTitle" class="add-task-title cursor-pointer" placeholder="Enter a title" type="text">
            <div  class="add-task-select-contact-edit do-not-close">
                 <input onclick="showContactList(0), doNotCloseWindow(event)" autocomplete="off" placeholder="Selected contacts to assign" class="do-not-close add-task-select-contact cursor-pointer" id="selectContact" type="email"> 
                 <img id="contactSelectArrow" class="cursor-pointer" onclick="showContactList(0), doNotCloseWindow(event)" src="./assets/img/selectfieldArrow.png">
            </div>
            <div onclick="doNotCloseWindow(event)"  id="showContacts0" class="add-task-hide-contacts add-task-choose-contacts do-not-close">
            </div>
            <div class="add-task-initials-area" id="0initials0"></div>
            <div class="add-task-due-date">
            <h2>Due Date</h2>
               <input id="inputDate" required class="add-task-due-date-input cursor-pointer cursor-pointer" id="dueDate" type="date">
            </div>
              <div class="add-task-due-date">
                 <h2>Category</h2>
                 <div class="add-task-select-contact-edit do-not-close2">
                   <input autocomplete="off" onclick="showCategories(), doNotCloseWindow(event)" required class="add-task-select-contact cursor-pointer do-not-close2" id="selectCategory" placeholder="Select Task category">
                   <img id="categorySelectArrow" class="do-not-close2" onclick="showCategories(), doNotCloseWindow(event)" src="./assets/img/selectfieldArrow.png">
                   <div class="add-task-placeholder-color-category">
                   <div id="taskCategoryColor" class="task-categorycolor d-none"></div>
                     <img class="d-none" id="placeholderColorCategory">
                   </div>
                 </div>
                   <div id="showCategories" class="add-task-hide-contacts add-task-choose-contacts">
                     <span onclick="newCategory()" class="add-task-single-priority">New category</span>
                  </div>
                </div>
         
            <div class="add-task-priority">
              <button type = "button" id="urgent" onclick="changeColor(id)" class="add-task-button-priority cursor-pointer">Urgent <img id="urgentLogo" src="./assets/img/urgentLogo.png"></button>
              <button type = "button" id="medium" onclick="changeColor(id)" class="add-task-button-priority cursor-pointer">Medium <img id="mediumLogo" src="./assets/img/mediumLogo.png"></button>
              <button type = "button" id="low" onclick="changeColor(id)" class="add-task-button-priority cursor-pointer">Low <img id="lowLogo" src="./assets/img/lowLogo.png"></button>
            </div>
           
              <div class="add-task-due-date">
                <h2>Description</h2>
                <textarea required id="description" placeholder="Enter a Description" class="add-task-textarea cursor-pointer"></textarea>
              </div>     
           <div class="subtask">
            <div id="test"></div>
            <div class="add-task-due-date">
                <h2>Subtasks</h2>
               <div>
                  <input id="inputSubtask" class="add-task-subtask cursor-pointer" placeholder="Add new subtask" type="text">
                  <img onclick="showSubtasks()" class="add-task-plus-button cursor-pointer" src="./assets/img/subtaskPlus.png">
                </div>
                  <div id="subTaskArea" class="d-none"></div>
               </div>
              <div id="addTaskButton" class="add-task-button">
                <button onclick="addTaskInit()" class="add-task-button-clear cursor-pointer">Clear x</button>  
                <button class="add-task-button-create cursor-pointer">Add Task<img src="./assets/img/hakenCreateTask.png"></button>
             </div>
           </div>
           <button type ="submit" id="addTaskButtonToBoard" class="add-task-button-create-board cursor-pointer">Add Task<img class="add-task-button-img" src="./assets/img/hakenCreateTask.png"></button>
         </div>
         <img id="taskAddedToBoard" class="task-added-to-board-hide task-added-to-board" src="./assets/img/logoAddedToBoard.png">
  </form> 
      `;
  docID('inputDate').min = new Date().toISOString().split("T")[0];
}

/**
 * Modifies the rendering options for the "Add Task" form based on initialization flags.
 */
function addTaskRenderOption() {
  let addTaskUnderDiv = document.getElementById(`addTaskUnderDiv`);
  let taskTitle = document.getElementById(`taskTitle`);
  addTaskButtonToBoard = document.getElementById(`addTaskButtonToBoard`);
  if (addTaskInitClicked == true) {
    taskTitle.classList.add(`d-none`);
    addTaskButtonToBoard.classList.add(`d-none`);
  }

  let addTaskButton = document.getElementById(`addTaskButton`);
  if (addBoardInitClicked == true) {
    addTaskButton.classList.add(`d-none`);
    addTaskUnderDiv.style.marginLeft = "-290px";
  }
  addContactsToTasks(0);
  setupInputField();
}

/**
 * Populates the contacts section in the "Add Task" form with available contacts.
 *
 * @param {number} id - The ID of the contacts section.
 */
function addContactsToTasks(id) {
  showContacts = docID('showContacts' + id);
  showContacts.innerHTML = '';
  let nameList = [];
  let colorList = [];
  let idList = [];

  addContactsToTasksProperty(nameList, colorList, idList);
  addContactsToTasksName(nameList, colorList, idList, id);
}

/**
 * Retrieves contact information and populates the contacts section in the "Add Task" form.
 *
 * @param {Array<string>} nameList - List of contact names.
 * @param {Array<string>} colorList - List of contact colors.
 * @param {Array<number>} idList - List of contact IDs.
 */
function addContactsToTasksProperty(nameList, colorList, idList) {
  for (const letter in contacts) {
    if (contacts.hasOwnProperty(letter)) {
      for (const contact of contacts[letter]) {
        nameList.push(contact.name);
        colorList.push(contact.color);
        idList.push(contact.contactId);
      }
    }
  }
}

/**
 * Renders contacts in the "Add Task" form based on name, initials, color, and contact ID.
 *
 * @param {Array<string>} nameList - List of contact names.
 * @param {Array<string>} colorList - List of contact colors.
 * @param {Array<number>} idList - List of contact IDs.
 * @param {number} id - The ID of the contacts section.
 */
function addContactsToTasksName(nameList, colorList, idList, id) {
  for (let i = 0; i < nameList.length; i++) {
    const contactName = nameList[i];
    const nameWords = contactName.split(/\s+/);
    const color = colorList[i];
    const contactId = idList[i]

    // Initialen berechnen
    let initials = "";
    for (const word of nameWords) {
      if (word.length > 0) {
        initials += word[0].toUpperCase();
      }
    }

    showContacts.innerHTML += /*html*/`
        <span onclick="chooseContact(${i}, '${contactName}', '${initials}', '${color}', '${id}', '${contactId}')" id='${id}and${contactId}' class="add-task-single-contact">
          <div id = 'center-contacts-row'>
          <div class = 'show-contacts-icon' id = '${id}show-contacts-icon${i}'>${initials}</div><span id = 'selected-contact${i}'>${contactName}</span> 
          </div>  
          <img id="${id}chooseBoxContact${i}" src="./assets/img/logoChooseContact.png">
        </span>
    `
    docID(id + 'show-contacts-icon' + i).style.backgroundColor = color;
  }
}