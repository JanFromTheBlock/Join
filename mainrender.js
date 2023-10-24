let menuId = ["menu-summary", "menu-board", "menu-add", "menu-contacts"];

function headerRender() {
  docID("header").innerHTML = /*html*/ `
        <img class="header-img" src="./assets/img/logo624.png">
        <div class="header-data">
            <span id = "header-title">Kanban Project Management Tool</span>
            <a id ="help-button" href="./help.html"><img class="header-help" id="header-help" src="./assets/img/help.png"></a>
            <div id="header-user-con">
                <div id="header-user-ellipse">
                    <div id="header-user-name"> ${userInitial}
                    </div>
                </div>
            </div>
        </div>
        <div id="menu-responsive"></div>
    `;
  oneLetter();
}

function oneLetter() {
  if (userInitial.length == 1) {
    docID('header-user-name').classList.add('one-letter');
  }
}


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

function menuResponsiveRender(){
  docID('menu-responsive').innerHTML = "";
  let urls = [
    "./summary.html",
    "./board.html",
    "./addTask.html",
    "./contacts.html",
  ];
  let imgs = [
    "summary_button",
    "board_button",
    "addTask_button",
    "contacts_button"
  ];
  let names = ["summary", "board", "add-task", "contacts"]
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    docID('menu-responsive').innerHTML += /*html*/`
      <a class = "button-responsive" href="${urls[i]}"><img id = "${names[i]}-responsive" src="./assets/img/${img}.png"></a>
    `
  }
}

function activeSite(id) {
  for (let i = 0; i < menuId.length; i++) {
    if (menuId[i] == id) {
      docID(menuId[i]).classList.add("topic-active");
    } else {
      docID(menuId[i]).classList.remove("topic-active");
    }
  }
}

addTaskInitClicked = false;
addBoardInitClicked = false;

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
            <div onclick="doNotCloseWindow(event)" class="add-task-select-contact-edit">
                 <input onclick="showContactList(0)" autocomplete="off" placeholder="Selected contacts to assign" class="add-task-select-contact cursor-pointer" id="selectContact" type="email"> 
                 <img id="contactSelectArrow" src="./assets/img/selectfieldArrow.png">
            </div>
            <div onclick="doNotCloseWindow(event)" id="showContacts0" class="add-task-hide-contacts add-task-choose-contacts">
            </div>
            <div class="add-task-initials-area" id="0initials0"></div>
            <div class="add-task-due-date">
            <h2>Due Date</h2>
               <input id="inputDate" required class="add-task-due-date-input cursor-pointer cursor-pointer" id="dueDate" type="date">
            </div>
              <div class="add-task-due-date">
                 <h2>Category</h2>
                 <div class="add-task-select-contact-edit">
                   <input autocomplete="off" onclick="showCategories()" oninput="markColor()" required class="add-task-select-contact cursor-pointer" id="selectCategory" placeholder="Select Task category">
                   <img id="categorySelectArrow" src="./assets/img/selectfieldArrow.png">
                   <div class="add-task-placeholder-color-category">
                   <div id="taskCategoryColor" class="task-categorycolor d-none"></div>
                     <img class="d-none" id="placeholderColorCategory" src="${categories[`color`]}">
                   </div>
                   <div class="add-task-edit-category d-none" id="editCategory">
                      <img onclick="finishPushCategoryToArray()" class="cursor-pointer" src="./assets/img/logoHaken.png">
                      <img src="./assets/img/seperator.png">
                      <img class="cursor-pointer" onclick="cancelCategory()" src="./assets/img/logoCancel.png">
                   </div>
                 </div>
                   <div id="showCategories" class="add-task-hide-contacts add-task-choose-contacts">
                     <span onclick="newCategory()" class="add-task-single-priority">New category</span>
                  </div>
                   <div id="categoryColors" class="add-task-category-colors d-none">
                       <img class="cursor-pointer" onclick="addColorToCategory(src)" id="lightBlue" src="./assets/img/ellipseLightblue.png">
                       <img class="cursor-pointer" onclick="addColorToCategory(src)" id="red" src="./assets/img/ellipseRed.png">
                       <img class="cursor-pointer" onclick="addColorToCategory(src)" id="green" src="./assets/img/ellipseGreen.png">
                       <img class="cursor-pointer" onclick="addColorToCategory(src)" id="orange" src="./assets/img/ellipseOrange.png">
                       <img class="cursor-pointer" onclick="addColorToCategory(src)" id="rosa" src="./assets/img/ellipseRosa.png">
                       <img class="cursor-pointer" onclick="addColorToCategory(src)" id="blue" src="./assets/img/ellipseBlue.png">
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
                <button onclick="clearTask()" class="add-task-button-clear cursor-pointer">Clear x</button>  
                <button class="add-task-button-create cursor-pointer">Add Task<img src="./assets/img/hakenCreateTask.png"></button>
             </div>
           </div>
           <button type ="submit" id="addTaskButtonToBoard" class="add-task-button-create-board cursor-pointer">Add Task<img class="add-task-button-img" src="./assets/img/hakenCreateTask.png"></button>
         </div>
         <img id="taskAddedToBoard" class="task-added-to-board-hide task-added-to-board" src="./assets/img/logoAddedToBoard.png">
  </form> 
      `;

       // Unterschied zwischen addTask.html und board.html
       
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
    taskAddedToBoard
}

  addContactsToTasks(0);
  setupInputField();
}



function addContactsToTasks(id) {
  showContacts = docID('showContacts' + id);
  showContacts.innerHTML = '';
  const nameList = [];
  const colorList = [];
  const idList =[];

  for (const letter in contacts) {
    if (contacts.hasOwnProperty(letter)) {
      const contactsList = contacts[letter];
      for (const contact of contactsList) {
        const name = contact.name;
        nameList.push(name);
        const color = contact.color;
        const contactId = contact.contactId;
        colorList.push(color);
        idList.push(contactId);
      }
    }
  }

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
    docID(id +'show-contacts-icon' + i).style.backgroundColor = color;

  }



}

