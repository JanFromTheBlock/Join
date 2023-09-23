let editTaskClick = false;
let saveChangedTask = false;

function editTaskClicked(id) {
  editTaskClick = true;
  renderEditAddTaskToBoard(id);
  openEditAddTask(id);
}

function saveChangedTaskClicked(id) {
  saveChangedTask = true;
  if (saveChangedTask == true) {
    changeTasks(id);
  }
}

function openEditAddTask(id) {
    let addTaskButtonToBoard = document.getElementById(
      `editaddTaskButtonToBoard`
    );
    let addTaskUnder = document.getElementById(`editaddTaskToBoardUnderDiv${id}`);
    let backgroundBoard = document.getElementById(`board`);
    let backgroundNav = document.getElementById(`nav`);
    let backgroundHeader = document.getElementById(`header`);
    let boardBody = document.getElementById(`boardBody`);
    let board = document.getElementById(`board`);
    addTaskUnder.classList.remove(`d-none`);
    addTaskButtonToBoard.classList.remove(`d-none`);
    addTaskUnder.classList.remove(`add-task-to-board-hide`);
    addTaskButtonToBoard.classList.add(`d-none-important`);
    boardBody.classList.remove(`overflow-hidden`);
    board.classList.add(`overflowY`);
    backgroundBoard.classList.add(`decrease-opacity`);
    backgroundHeader.classList.add(`decrease-opacity`);
    backgroundNav.classList.add(`decrease-opacity`);
    backgroundBoard.classList.remove(`full-opacity`);
    backgroundHeader.classList.remove(`full-opacity`);
    backgroundNav.classList.remove(`full-opacity`);
    if (editTaskClick == true) {
      let addTaskToBoardUnderDiv = document.getElementById(`editaddTaskToBoardUnderDiv${id}`);
      addTaskToBoardUnderDiv.classList.remove(`add-task-to-board`);
      addTaskToBoardUnderDiv.classList.add(`edit-add-task-to-board`);
      editTask(id);
    }
  }
  
  function closeEditAddTaskToBoard(id) {
    let addTask = document.getElementById(`editaddTaskToBoardUnderDiv${id}`);
    let backgroundBoard = document.getElementById(`board`);
    let backgroundNav = document.getElementById(`nav`);
    let backgroundHeader = document.getElementById(`header`);
    let addTaskButtonToBoard = document.getElementById(`addTaskButtonToBoard`);
    addTaskButtonToBoard.classList.add(`d-none`);
    board.classList.remove(`overflowY`);
    addTask.classList.add(`add-task-to-board-hide`);
    addTask.classList.add(`d-none`);
    backgroundBoard.classList.add(`full-opacity`);
    backgroundHeader.classList.add(`full-opacity`);
    backgroundNav.classList.add(`full-opacity`);
    backgroundBoard.classList.remove(`decrease-opacity`);
    backgroundHeader.classList.remove(`decrease-opacity`);
    backgroundNav.classList.remove(`decrease-opacity`);
  }
  
  // Editieren der Tasks
  let editChangeColorClicked = false;
  let editSelectCategoryClicked = false;
  
  function editTask(id) {
    //Edit Titel
    let taskWindow = document.getElementById(`task-window`);
    taskWindow.classList.add(`d-none`);
    let taskTitle = document.getElementById(`window-title${id}`).innerHTML;
    let inputFieldTitle = document.getElementById(`inputFieldTitle`);
    inputFieldTitle.value = taskTitle;
  
    //Edit Beschreibung
  
    let taskDescription = document.getElementById(
      `window-description${id}`
    ).innerHTML;
    let description = document.getElementById(`description${id}`);
    description.value = taskDescription;
  
    //Edit Category
  
    let taskCategory = document.getElementById(`window-category${id}`).innerHTML;
    let selectCategory = document.getElementById(`editSelectCategory${id}`);
    selectCategory.value = taskCategory;
  
    // Edit Datum
  
    let taskDate = document.getElementById(`date-inside${id}`).innerHTML;
    let dueDate = document.getElementById(`dueDate${id}`);
    dueDate.value = taskDate;
  
    let taskContact = document.getElementById(`contacts${id + 1}`).innerHTML;
    let initials = document.getElementById(`initials${id}`);
    initials.classList.remove(`d-none`);
    initials.innerHTML = taskContact;
  
    // Edit Category
  
    let taskCategoryColor = document.getElementById(`task-category${id}`).style.backgroundColor;
    let editTaskCategoryColor = document.getElementById(`editTaskCategoryColor${id}`);
    editTaskCategoryColor.classList.remove(`d-none`);
    editTaskCategoryColor.style.backgroundColor = taskCategoryColor;
  
    // Edit Priority
  
    let priorityLogo = tasks[id]["urgency"];
    let urgent = document.getElementById(`editUrgent`);
    let low = document.getElementById(`editLow`);
    let medium = document.getElementById(`editMedium`);
    let editUrgentLogo = document.getElementById(`editUrgentLogo`);
    let editMediumLogo = document.getElementById(`editMediumLogo`);
    let editLowLogo = document.getElementById(`editLowLogo`);
  
    if (priorityLogo == "./assets/img/urgentLogo.png") {
      urgent.classList.add(`change-color-urgent`);
      editUrgentLogo.src = "./assets/img/urgentLogoWhite.png";
    }
    if (priorityLogo == "./assets/img/lowLogo.png") {
      low.classList.add(`change-color-low`);
      editLowLogo.src = "./assets/img/lowLogoWhite.png";
    }
    if (priorityLogo == "./assets/img/mediumLogo.png") {
      medium.classList.add(`change-color-medium`);
      editMediumLogo.src = "./assets/img/mediumLogoWhite.png";
    }
    editSubtask(id);
    addContactsToTasks(2);
  }
  
  function editSubtask(id){
    let subtasks = tasks[id]["subtasks"];
    let subtaskArea = document.getElementById(`editSubTaskArea${id}`);
    subtaskArea.classList.remove(`d-none`);
    for (let id = 0; id < subtasks.length; id++) {
      const subtask = subtasks[id];
    subtaskArea.innerHTML +=  /*html*/`<div class="subTaskArea">
        <input class="cursor-pointer" type="checkbox">
        <label id="editLabelForSubtask${id}">${subtask}</label><img onclick="deleteEditSubtask()" class="delete-img-subtask" src="./assets/img/delete_contact.png">
        </div>`
        ;
    }
  }
  
  function changeTasks(id) {
    let addTaskUnder = document.getElementById(`editaddTaskToBoardUnderDiv${id}`);
    let backgroundBoard = document.getElementById(`board`);
    let backgroundNav = document.getElementById(`nav`);
    let backgroundHeader = document.getElementById(`header`);
  
    //Edit Title
  
    let inputValue = document.getElementById(`inputFieldTitle`).value;
    let taskTitle = document.getElementById(`task-title${id}`).innerHTML;
    taskTitle = inputValue;
    tasks[id]["title"] = taskTitle;
  
    // Edit Description
  
    let descriptionValue = document.getElementById(`description${id}`).value;
    let taskDescription = document.getElementById(
      `task-description${id}`
    ).innerHTML;
    taskDescription = descriptionValue;
    tasks[id]["description"] = taskDescription;
  
    // Edit Category
  
    if (editSelectCategoryClicked == true) {
      let selectCategory = document.getElementById(`editSelectCategory${id}`);
      tasks[id]["category"] = selectCategory.value;
    } else {
      selectCategory = tasks[id]["category"];
    }
  
    // Farbe mitgeben
    let category = tasks[id]["category"].trim();
  
    if(category === "Design"){
      tasks[id]["category-color"] = "#FF7A00";
    }else if(category === "Sales"){
      tasks[id]["category-color"] = "#E200BE";
    }else if(category === "Backoffice"){
      tasks[id]["category-color"] = "#1FD7C1";
    }else if(category === "Media"){
      tasks[id]["category-color"] = "#0038FF";
    }else if(category === "Marketing"){
      tasks[id]["category-color"] = "#2AD300";
    }
    
    // Edit Date
    let date = document.getElementById(`date-inside${id}`).innerHTML;
    let taskDate = document.getElementById(`dueDate${id}`).value;
    date = taskDate;
    tasks[id]["date"] = date;
  
    // Edit Priority Logo
  
    if (editChangeColorClicked == true) {
      let priorityLogo = document.getElementById(`contact-area-img${id}`);
      priorityLogo.src = urgency;
      tasks[id]["urgency"] = urgency;
    } else {
      urgency = tasks[id]["urgency"];
    }

     // Edit Contacts

     for (let i = 0; i < numberOfContactsToAdd.length; i++) {
      let contactDiv = numberOfContactsToAdd[i];
      const [firstNames, lastNames] = contactDiv.split(' ');
      const contactcolor = numberOfColorsToAdd[i];
      const contactid = numberOfIdsToAdd[i];
      firstName.push(firstNames);
      lastName.push(lastNames);
      contactcolors.push(contactcolor);
      contactIds.push(contactid);
    }
    tasks[id]['contactid'] = contactIds;
    tasks[id]['contact-color'] = contactcolors;
    tasks[id]['contact-firstname'] = firstName;
    tasks[id]['contact-lastname'] = lastName;
  
   // Edit Subtask
  
   for (let subtaskIndex = 0; subtaskIndex < subtasks.length; subtaskIndex++) {
    const subtask = subtasks[subtaskIndex];

   


  
   
     renderStructureOfTheWindow(id, subtask);
    
  }
  addBoardRender();
  setElement('tasks', tasks);
  setElement("subtasks", subtasks);
  
    addTaskUnder.classList.add(`d-none-important`);
    backgroundBoard.classList.add(`full-opacity`);
    backgroundHeader.classList.add(`full-opacity`);
    backgroundNav.classList.add(`full-opacity`);
    backgroundBoard.classList.remove(`decrease-opacity`);
    backgroundHeader.classList.remove(`decrease-opacity`);
    backgroundNav.classList.remove(`decrease-opacity`);
    backgroundBoard.classList.remove(`overflowY`);
  }
  
  // Priority Color editieren
  
  let mediumLogo;
  
  function editChangeColor(i) {
    editChangeColorClicked = true;
    if (i === "editUrgent") {
      editChangeColorUrgent(i);
      urgency = "./assets/img/urgentLogo.png";
      let urgentLogo = urgency;
    } else if (i === "editMedium") {
      editChangeColorMedium(i);
      urgency = "./assets/img/mediumLogo.png";
      let mediumLogo = urgency;
    } else if (i === "editLow") {
      urgency = "./assets/img/lowLogo.png";
      let lowLogo = urgency;
      editChangeColorLow(i);
    }
    console.log(i, urgency);
  }
  
  function editChangeColorMedium() {
    let urgent = document.getElementById(`editUrgent`);
    let low = document.getElementById(`editLow`);
    let medium = document.getElementById(`editMedium`);
    urgent.classList.remove("change-color-urgent");
    medium.classList.add("clicked");
    editLow.classList.remove("clicked");
    editUrgent.classList.remove("clicked");
    editMedium.classList.add("change-color-medium");
    low.classList.remove("change-color-low");
    editLowLogo.src = `./assets/img/lowLogo.png`;
    editUrgentLogo.src = `./assets/img/urgentLogo.png`;
    editMediumLogo.src = `./assets/img/mediumLogoWhite.png`;
  }
  
  function editChangeColorUrgent() {
    let urgent = document.getElementById(`editUrgent`);
    let low = document.getElementById(`editLow`);
    let medium = document.getElementById(`editMedium`);
    urgent.classList.add("change-color-urgent");
    urgent.classList.add("clicked");
    medium.classList.remove("change-color-medium");
    medium.classList.remove("clicked");
    low.classList.remove("clicked");
    low.classList.remove("change-color-low");
    editUrgentLogo.src = `./assets/img/urgentLogoWhite.png`;
    editLowLogo.src = `./assets/img/lowLogo.png`;
    editMediumLogo.src = `./assets/img/mediumLogo.png`;
  }
  
  function editChangeColorLow() {
    let urgent = document.getElementById(`editUrgent`);
    let low = document.getElementById(`editLow`);
    let medium = document.getElementById(`editMedium`);
    urgent.classList.remove("change-color-urgent");
    medium.classList.remove("change-color-medium");
    low.classList.add("change-color-low");
    medium.classList.remove("clicked");
    urgent.classList.remove("clicked");
    low.classList.add("clicked");
    editLowLogo.src = `./assets/img/lowLogoWhite.png`;
    editUrgentLogo.src = `./assets/img/urgentLogo.png`;
    editMediumLogo.src = `./assets/img/mediumLogo.png`;
  }
  
  function editShowCategories(id) {
    editSelectCategoryClicked = true;
    let selectCategory = document.getElementById(`editSelectCategory${id}`);
    toggleVisibility(`editShowCategories${id}`);
    selectCategory.classList.add(`hide-cursor`);
    if (!isShowAddedCategoryCalled) {
      // zeigt die gespeicherten Categories nur einmal an auch bei mehrmaligem klicken
      editShowAddedCategory(id); // zeigt die gespeicherten Catagories an
      isShowAddedCategoryCalled = true;
    }
  }
  
  function editShowAddedCategory(id) {
    let showCategories = document.getElementById(`editShowCategories${id}`);
  
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
  
      showCategories.innerHTML += /*html*/ `<span id="editSavedCategory${i}" onclick="editChooseCategory(${id}, ${i})" class="add-task-single-priority">
      ${category[`name`]}<img src=${category["img"]}></span>`;
    }
  }
  
  function editChooseCategory(id, i) {
    let taskCategoryColor = document.getElementById(`editTaskCategoryColor${id}`);
    let savedCategory = document.getElementById(`editSavedCategory${i}`);
    let showCategories = document.getElementById(`editShowCategories${id}`);
    let selectCategory = document.getElementById(`editSelectCategory${id}`);
    let categoryImg = categories[i][`img`];
  
    // Zugriff auf das <img>-Element innerhalb des savedCategory-Containers
    let savedCategoryImg = savedCategory.querySelector("img");
    // Ersetze das src-Attribut des placeholderColorCategory-Bildes mit dem des savedCategory-Bildes
    let placeholderColorCategory = document.getElementById(
      `editPlaceholderColorCategory`
    );
    placeholderColorCategory.src = savedCategoryImg.src;
    // Setze den Wert des selectCategory-Eingabefeldes auf den Text der ausgewählten Kategorie
    selectCategory.value = savedCategory.textContent;
    placeholderColorCategory.classList.remove(`d-none`);
    selectCategory.style.paddingLeft = "0";
    showCategories.classList.add(`d-none`);
    addColorToCategory(categoryImg);
    taskCategoryColor.classList.add(`d-none`);
  }
  
  function editShowSubtasks(id) {
    editShowSubtasksClicked = true;
    let subtaskArea = document.getElementById(`editSubTaskArea${id}`);
    let inputSubtask = document.getElementById(`editInputSubtask${id}`).value;
    subtaskArea.classList.remove(`d-none`);
    subtasks.push(inputSubtask);
    subtaskArea.innerHTML += /*html*/ `
    <div class="subTaskArea">
    <input class="cursor-pointer" type="checkbox">
    <label id="editLabelForSubtask${id}">${inputSubtask}</label><img onclick="deleteEditSubtask(id)" class="delete-img-subtask" src="./assets/img/delete_contact.png">
    </div>`;
     renderSubtasks(id);
     inputSubtask.value = '';
  }
  
// noch in Arbeit!

  function deleteEditSubtask(id){
    let editSubtask = document.getElementById(`editSubtask${id}`);
    subtasks.splice(1, id);
    }
    