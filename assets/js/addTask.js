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
let toggleCategories = false;
let subtaskCounter = 0;
let firstName = [];
let lastName = [];
let contactcolors = [];
let contactIds = [];
let contactsOpen;
let categoriesOpen;
const contactStatusMap = new Map();
let numberOfContactsToAdd = [];
let numberOfColorsToAdd = [];
let numberOfIdsToAdd = [];
let savedCategory;


/**
 * Counts the number of done tasks based on the provided index.
 *
 * @param {Object} index - The index to count done tasks from.
 * @param {number} count - The initial count value.
 */
function countDoneTasks(index, count) {
  for (let key in index) {
    if (index.hasOwnProperty(key) && index[key] === 1) {
      count++
    }
  }
  doneSubtask = count;
}

/**
 * Checks and modifies the edit status for the given subtask ID.
 *
 * @param {number} id - The ID of the subtask to check.
 */
function editCheck(id) {
  if (edit === true) {
    if (jsonToEdit.subtaskStatus[id] === 1) {
      docID("inner-subtask" + id).classList.add("d-none");
    }
  }
}

/**
 * Checks if a subtask with the given ID is undefined and disables the corresponding checkbox.
 *
 * @param {number} id - The ID of the subtask to check.
 */
function undefinedCheck(id) {
  if (jsonToEdit && jsonToEdit.subtasks && jsonToEdit.subtasks[id] === undefined) {
    docID("subtaskCheckbox" + id).disabled = true;
    docID("subtaskCheckbox" + id).classList.remove("cursor-pointer");
  }
}

/**
 * Checks the existence of the `jsonToEdit` variable and disables the corresponding checkbox if it doesn't exist.
 *
 * @param {number} id - The ID of the subtask to check.
 */
function jsonToEditCheck(id) {
  if (jsonToEdit) {
  } else {
    docID("subtaskCheckbox" + id).disabled = true;
    docID("subtaskCheckbox" + id).classList.remove("cursor-pointer");
  }
}

/**
 * Changes the color for the "Medium" status and updates corresponding elements.
 *
 * @param {Object} medium - The "Medium" button element.
 * @param {Object} mediumLogo - The "Medium" logo element.
 * @param {string} status - The status to change the color.
 */
function changeColorIdMedium(medium, mediumLogo, status) {
  if (status == "medium") {
    medium.classList.add("change-color-medium");
    medium.classList.add("clicked");
    urgency = "./assets/img/mediumLogo.png";
    mediumLogo.src = `./assets/img/mediumLogoWhite.png`;
    lowLogo.src = `./assets/img/lowLogo.png`;
    urgentLogo.src = `./assets/img/urgentLogo.png`;
  } else {
    medium.classList.remove("change-color-medium");
    medium.classList.remove("clicked");
  }
  
}

/**
 * Creates a JSON object for a new task with provided details.
 *
 * @param {string} title - The title of the new task.
 * @param {string} description - The description of the new task.
 * @param {string} category - The category of the new task.
 * @param {Object} subtasks - The subtasks of the new task.
 * @param {number} subtasksLength - The length of subtasks.
 * @param {Object} urgency - The urgency of the new task.
 * @param {string} date - The due date of the new task.
 * @param {Array<string>} firstName - The first names associated with the new task.
 * @param {Array<string>} lastName - The last names associated with the new task.
 * @param {string} categoryColor - The color of the category associated with the new task.
 * @param {Array<number>} contactIds - The contact IDs associated with the new task.
 * @param {Array<string>} contactcolors - The contact colors associated with the new task.
 * @param {number} taskId - The ID of the new task.
 * @returns {Object} - The created JSON object for the new task.
 */
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

/**
 * Shows the "Task Added to Board" button.
 */
function showTaskAddedToBoardButton() {
  let taskAddedToBoard = docID(`taskAddedToBoard`);
  taskAddedToBoard.classList.remove(`d-none`, `task-added-to-board-hide`);
  taskAddedToBoard.classList.add(`task-added-to-board`);
}

/**
 * Clears arrays used for caching contact information.
 */
function cacheOfArrays() { 
  firstName = [];
  lastName = [];
  numberOfContactsToAdd = [];
  numberOfColorsToAdd = [];
  numberOfIdsToAdd = [];
  subtaskStatus = [];
  subtaskCounter = 0;
}

/**
 * Navigates to the board page after a delay.
 */
function jumpToBoard() {
  setTimeout(() => {
    window.location.href = "./board.html";
    closeAddTaskToBoard();
  }, 2000);
}

/**
 * Handles the creation of a new task or the editing of an existing task.
 */
async function newTask() {
  if (edit === true) {
    safeEditedTask();
  } else {
    newTaskElse();
  }
}

/**
 * Handles the creation of a new task when not in edit mode.
 */
async function newTaskElse() {
  if (urgency === undefined)
    changeColor('low');
  showTaskAddedToBoardButton();
  jumpToBoard();
  docID(`inputSubtask`).value = ``;
  safeContactsInTask();
  taskId = findHighestId(tasks) + 1;
  let task = newTaskJSONCreate();
  clearTaskMask();
  await getElement("tasks");
  cacheOfArrays();
  tasks.push(task);
  await setElement("tasks", tasks);
}

/**
 * Creates a new task JSON object.
 *
 * @returns {Object} - The created JSON object for the new task.
 */
function newTaskJSONCreate() {
  let title = docID(`inputFieldTitle`).value;
  let date = docID(`inputDate`).value;
  let category = docID(`selectCategory`).value;
  let description = docID(`description`).value;
  let subtasksLength = subtasks.length;
  let categoryColor = categories[categoryId]['color'];
  return createJsonTask(title, description, category, subtasks, subtasksLength, urgency, date, firstName, lastName, categoryColor, contactIds, contactcolors, taskId);
}

/**
 * Finds the highest task ID from an array of tasks.
 *
 * @param {Array<Object>} tasks - The array of tasks to find the highest ID from.
 * @returns {number} - The highest task ID.
 */
function findHighestId(tasks) {
  let highestTaskId = 3;
  for (const task of tasks) {
    if (task.taskId > highestTaskId) {
      highestTaskId = task.taskId;
    }
  }
  return highestTaskId;
}

/**
 * Clears input fields in the task creation form.
 */
function clearTaskMask() {
  let array = [`inputFieldTitle`, `description`, `selectContact`, `selectCategory`];
  for (let i = 0; i < array.length; i++) {
    docID(array[i]).value = ``;
  }
  docID(`placeholderColorCategory`).classList.add(`d-none`);
}

/**
 * Clears a task at the specified index.
 *
 * @param {number} i - The index of the task to clear.
 */
function clearTask(i) {
  tasks.splice(i, 1);
  subtasks.splice(i, 1);
  setElement("tasks", tasks);
  setElement("subtasks", subtasks);
}

/**
 * Toggles the visibility of an element based on its ID.
 *
 * @param {string} elementId - The ID of the element to toggle.
 */
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

/**
 * Handles the visibility of the "Contacts" and "Categories" sections when not hidden.
 *
 * @param {Object} element - The element to handle visibility for.
 */
function taskHiddenHide(element) {
  element.classList.remove("add-task-hide-contacts");
    if (toggleContacts) {
        contactsOpen = true;
    }
    if (toggleCategories) {
      categoriesOpen = true;   
    }
}

/**
 * Handles the visibility of the "Contacts" and "Categories" sections when hidden.
 *
 * @param {Object} element - The element to handle visibility for.
 */
function taskHiddenHideElse(element) {
  element.classList.add("add-task-hide-contacts");
    if (toggleContacts) {
      contactsOpen = false;
    }
    if (toggleCategories) {
      categoriesOpen = false;
    }
}

/**
 * Shows the contact list for the specified ID.
 *
 * @param {number} id - The ID of the contact list to show.
 */
function showContactList(id) {
  toggleContacts = true;
  toggleVisibility("showContacts" + id);
  toggleContacts = false;
}

/**
 * Shows the categories section.
 */
function showCategories() {
  toggleCategories = true
  toggleVisibility("showCategories");
  toggleCategories = false;
  docID(`selectCategory`).classList.add(`hide-cursor`);
  showAddedCategory();
}

/**
 * Gets the initials of a contact's name.
 *
 * @param {string} contact - The contact's name.
 */
function getInitials(contact) {
  let words = contact.split(" "); 
  let initialsOfName = ""; 
    for (let i = 0; i < words.length; i++) {
    initialsOfName += words[i].charAt(0).toUpperCase();
  }
  initials.innerHTML += `<div id="taskInitials" class="add-task-initials">${initialsOfName}</div>`;
}


/**
 * Logs the ID of a clicked div element.
 *
 * @param {Object} event - The click event.
 */
function logDivID(event) {
  let selectedTxtElement = event.target;
  if (selectedTxtElement.id !== "do-not-close" && contactsOpen === true) {
    showContactList(0);
  }
  if (selectedTxtElement.id !== "do-not-close2" && categoriesOpen === true) {
      showCategories();
  }
  selectedTxtElement = selectedTxtElement.parentNode;
}