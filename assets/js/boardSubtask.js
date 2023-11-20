/**
 * Function to handle the process of pushing a done subtask.
 * @param {number} id - The ID of the subtask.
 */
function pushDoneSubtask(id) {
    let subtaskCheckbox = docID(`subtaskCheckbox${id}`);
    let isChecked = subtaskCheckbox.checked;
    defineDoneSubtask();
    adjustValuesOfTheSubtasks(id, isChecked)
    taskId = tasks[openedTask]["taskId"];
    doneSubtaskClicked = true;
}

/**
 * Function to define the done subtask and adjust its value.
 */
function defineDoneSubtask() {
    if (doneSubtask === 0) {
        if (zero === false) {
        }
        else {
            doneSubtask = tasks[openedTask]["done-tasks"];
        }
    }
}

/**
 * Function to adjust the values of subtasks based on the checked state.
 * @param {number} id - The ID of the subtask.
 * @param {boolean} isChecked - The checked state of the subtask checkbox.
 */
function adjustValuesOfTheSubtasks(id, isChecked) {
    if (isChecked) {
        doneSubtask++;
        subtaskStatus[id] = 1;
    } else {
        subtaskStatus[id] = 0;
        doneSubtask--;
        zero = false
    }
}

/**
 * Function to render subtasks, update progress bar, and display subtask information.
 * @param {number} id - The ID of the task.
 */
function renderSubtasks(id) {
    let a = tasks[id]["subtasks"].length;
    let b = tasks[id]["done-tasks"];
    let percent = (b / a) * 100;
    docID("progress-bar" + id).classList.remove("d-none");
    docID("windowSubtask" + id).innerHTML = renderSubtasksHTML(a, b);
    docID("progress-bar-inside" + id).style.width = `${percent}%`;
    subtasks.splice(id, subtasks.length);
}

/**
 * Function to generate HTML code for displaying subtasks.
 * @param {Array} subtasks - An array of subtasks associated with the task.
 * @returns {string} HTML code for displaying subtasks.
 */
function renderSubtasksHTML(a, b) {
    return /*html*/ `${b}/${a} Subtasks`;
}

/**
 * Function to prepare subtasks for rendering.
 * @param {string} subtask - The subtask to be added.
 * @param {string} editLabelsSubtasks - HTML code for editing subtask labels.
 * @param {number} taskId - The ID of the task.
 * @returns {Array} An array of subtasks prepared for rendering.
 */
function prepareSubtasks(subtask, editLabelsSubtasks, taskId) {
    let subtasks = tasks[taskId]["subtasks"];

    if (subtask !== null) {
        subtask = editLabelsSubtasks;
        subtasks.push(subtask);
        subtasks = subtasks.filter((item) => item !== undefined);
    }
    return subtasks;
}

/**
 * Function to set subtasks for editing.
 */
function generateSubtaskHTML(subtasks) {
    let subtaskHTML = "";
    for (let subtaskIndex = 0; subtaskIndex < subtasks.length; subtaskIndex++) {
        let subtask = subtasks[subtaskIndex];
        subtaskHTML += /*html*/ `
        <div id="editSubtask${subtaskIndex}">${subtask}</div> 
      `;
    }
    return subtaskHTML;
}

/**
 * Function to set subtasks for editing.
 */
function setSubtasks() {
    doneSubtask = tasks[openedTask]["done-tasks"];
    for (
      let subtaskToLoad = 0;subtaskToLoad < jsonToEdit.subtasks.length; subtaskToLoad++    ) {
      const element = jsonToEdit.subtasks[subtaskToLoad];
      docID(`inputSubtask`).value = element;
      showSubtasks(subtaskToLoad);
    }
  checkSubtasks();
}

/**
 * Function to check and update the state of subtasks.
 */
function checkSubtasks(){
    for (let i = 0; i < subtasks.length; i++) {
      if (subtaskStatus[i] === 1) {
        let subtaskCheckbox = docID('subtaskCheckbox' + i);
        subtaskCheckbox.checked = true; 
        subtasksWereChecked = true
      }
  
    }
  }