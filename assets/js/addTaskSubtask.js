
/**
 * Displays the subtasks for a given task.
 *
 * @param {number} id - The ID of the task. If undefined, a new subtask is assumed.
 */
function showSubtasks(id) {
    if (id === undefined) {
        id = subtaskCounter;
        newsubtask = true
    }
    checkStatusSubtask(id);
    renderSubtaskArea(id);
    checkSubtaskCheckbox(id);
}

/**
 * Checks the state of the subtask checkbox and performs related actions.
 *
 * @param {number} id - The ID of the subtask.
 */
function checkSubtaskCheckbox(id) {
    docID(`inputSubtask`).value = "";
    setElement("subtasks", subtasks);
    subtasksWereCheckedCheck();
    editCheck(id);
    undefinedCheck(id);
    jsonToEditCheck(id);
}

/**
 * Checks if subtasks were checked and updates accordingly.
 */
function subtasksWereCheckedCheck() {
    if (subtasksWereChecked === true) {
        checkSubtasks();
        countDoneTasks(subtaskStatus, 0);
    }
}

/**
 * Checks the status of a subtask.
 *
 * @param {number} id - The ID of the subtask.
 */
function checkStatusSubtask(id) {
    if (edit === false || newsubtask === true) {
        statusSubtask = 0;
    } else {
        statusSubtask = jsonToEdit.subtaskStatus[id];
    }
    newsubtask = false;
}

/**
 * Renders the subtask area by adding HTML to the DOM.
 *
 * @param {number} id - The ID of the subtask.
 */
function renderSubtaskArea(id) {
    let subtaskArea = docID(`subTaskArea`);
    let inputSubtask = docID(`inputSubtask`).value;
    subtaskArea.classList.remove(`d-none`);
    subtasks.push(inputSubtask);
    subtaskStatus.push(statusSubtask);
    subtaskArea.innerHTML += renderSubtaskAreaHTML(id, inputSubtask);
    subtaskCounter++
}

/**
 * Generates HTML for the subtask area.
 *
 * @param {number} id - The ID of the subtask.
 * @param {string} inputSubtask - The content of the subtask.
 * @returns {string} - The HTML representation of the subtask area.
 */
function renderSubtaskAreaHTML(id, inputSubtask) {
    return /*html*/ `
    <div id="subtask${id}" class="subTaskArea subtask${id}">
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
}

/**
 * Deletes a subtask.
 *
 * @param {number} id - The ID of the subtask to be deleted.
 */
function deleteSubtask(id) {
    subtasks.splice(id, 1);
    subtaskStatus.splice(id, 1);
    docID("subtask" + id).classList.add("d-none");
  }
  
  /**
 * Renames a subtask.
 *
 * @param {number} id - The ID of the subtask to be renamed.
 */
  function renameSubtask(id) {
    docID("inputSubtask").value = docID("labelForSubtask" + id).innerHTML;
    deleteSubtask(id);
  }