let menuId = ["menu-summary", "menu-board", "menu-add", "menu-contacts"];

function headerRender() {
    let userIni = "SM"
    docID('header').innerHTML =/*html*/`
        <img class="header-img" src="./assets/img/logo624.png">
        <div class="header-data">
            <span>Kanban Project Management Tool</span>
            <img class="header-help" id="header-help" src="./assets/img/help.png">
            <!-- <img class="header-user" src="./assets/img/example-user.png"> -->
            <div id="header-user-con">
                <div id="header-user-ellipse">
                    <div id="header-user-name"> ${userIni}
                    </div>
                </div>
            </div>
        </div>
    `
}

function navRender() {
    docID('nav').innerHTML = /*html*/`
        <div id="menu" class="menu"></div>
        <div class="legal">
            <div class="topic">
                <img src="./assets/img/legal.png">
                <span>Legal notice</span>
            </div>
            <div class="topic">
                <img src="./assets/img/legal.png">
                <span>Private policy</span>
            </div>
        </div>
    `
    menuRender();
}

function menuRender() {
    docID("menu").innerHTML = "";
    let urls = ["./summary.html", "./board.html", "./addTask.html", "./contacts.html"];
    let names =  ["Summary", "Board", "Add Task", "Contacts"];
    let img = ["Summary", "Board", "add_task", "contact" ]

    for (let i = 0; i < menuId.length; i++) {
        docID("menu").innerHTML += /*html*/`
            <a id="${menuId[i]}" href="${urls[i]}" class="topic">
                <img src="./assets/img/${img[i]}.png">
                <span>${names[i]}</span>
            </a>
        ` 
    }
}


function activeSite(id) {
    for (let i = 0; i < menuId.length; i++) {
        if (menuId[i] == id) {
            docID(menuId[i]).classList.add("topic-active");
        }else {
            docID(menuId[i]).classList.remove("topic-active");
        }
    }
}

function addTaskRender(id) {
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
            <div id="showContacts" class="add-task-hide-contacts add-task-choose-contacts">
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
                   <input autocomplete="off" onclick="showCategories()" oninput="markColor()" required class="add-task-select-contact cursor-pointer" id="selectCategory" placeholder="Select Task category">
                   <img id="categorySelectArrow" src="./assets/img/selectfieldArrow.png">
                   <div class="add-task-placeholder-color-category">
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
  
          <div id="test"></div>
            <div>
                <h2>Subtasks</h2>
               <div>
                  <input id="inputSubtask" required class="add-task-subtask cursor-pointer" placeholder="Add new subtask" type="text">
                  <img onclick="showSubtasks()" class="add-task-plus-button cursor-pointer" src="./assets/img/subtaskPlus.png">
                </div>
  
                  <div id="subTaskArea" class="d-none"></div>
               </div>
  
             <div class="add-task-button">
              <button onclick="clearTask()" class="add-task-button-clear cursor-pointer">Clear x</button>  
              <button onclick="newTask(urgency)" class="add-task-button-create cursor-pointer">Add Task<img src="./assets/img/hakenCreateTask.png"></button>
            </div>
  
          </div>
      </div>
      <img id="taskAddedToBoard" class="task-added-to-board-hide" src="./assets/img/logoAddedToBoard.png">
      `;
  }