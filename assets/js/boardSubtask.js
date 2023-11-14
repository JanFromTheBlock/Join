function pushDoneSubtask(id) {
    let subtaskCheckbox = docID(`subtaskCheckbox${id}`);
    let isChecked = subtaskCheckbox.checked;
    defineDoneSubtask();
    adjustValuesOfTheSubtasks(id, isChecked)
    taskId = tasks[openedTask]["taskId"];
    doneSubtaskClicked = true;
}


function defineDoneSubtask() {
    if (doneSubtask === 0) {
        if (zero === false) {
        }
        else {
            doneSubtask = tasks[openedTask]["done-tasks"];
        }
    }
}


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

function renderSubtasks(id) {
    let a = tasks[id]["subtasks"].length;
    let b = tasks[id]["done-tasks"];
    let percent = (b / a) * 100;
    docID("progress-bar" + id).classList.remove("d-none");
    docID("windowSubtask" + id).innerHTML = renderSubtasksHTML(a, b);
    docID("progress-bar-inside" + id).style.width = `${percent}%`;
    subtasks.splice(id, subtasks.length);
}


function renderSubtasksHTML(a, b) {
    return /*html*/ `${b}/${a} Subtasks`;
}

function prepareSubtasks(subtask, editLabelsSubtasks, taskId) {
    let subtasks = tasks[taskId]["subtasks"];

    if (subtask !== null) {
        subtask = editLabelsSubtasks;
        subtasks.push(subtask);
        subtasks = subtasks.filter((item) => item !== undefined);
    }
    return subtasks;
}


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


function checkSubtasks(){
    for (let i = 0; i < subtasks.length; i++) {
      if (subtaskStatus[i] === 1) {
        let subtaskCheckbox = docID('subtaskCheckbox' + i);
        subtaskCheckbox.checked = true; 
        subtasksWereChecked = true
      }
  
    }
  }