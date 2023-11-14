function showSubtasks(id) {
    if (id === undefined) {
        id = subtaskCounter;
        newsubtask = true
    }
    checkStatusSubtask(id);
    renderSubtaskArea(id);
    checkSubtaskCheckbox(id);
}


function checkSubtaskCheckbox(id) {
    docID(`inputSubtask`).value = "";
    setElement("subtasks", subtasks);
    subtasksWereCheckedCheck();
    editCheck();
    undefinedCheck();
    jsonToEditCheck();
}


function subtasksWereCheckedCheck() {
    if (subtasksWereChecked === true) {
        checkSubtasks();
        countDoneTasks(subtaskStatus, 0);
    }
}


function checkStatusSubtask(id) {
    if (edit === false || newsubtask === true) {
        statusSubtask = 0;
    } else {
        statusSubtask = jsonToEdit.subtaskStatus[id];
    }
    newsubtask = false;
}

function renderSubtaskArea(id) {
    let subtaskArea = docID(`subTaskArea`);
    let inputSubtask = docID(`inputSubtask`).value;
    subtaskArea.classList.remove(`d-none`);
    subtasks.push(inputSubtask);
    subtaskStatus.push(statusSubtask);
    subtaskArea.innerHTML += renderSubtaskAreaHTML();
    subtaskCounter++
}


function renderSubtaskAreaHTML() {
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


function deleteSubtask(id, taskId) {
    subtasks.splice(id, 1);
    subtaskStatus.splice(id, 1);
    docID("subtask" + id).classList.add("d-none");
  }
  
  
  function renameSubtask(id) {
    docID("inputSubtask").value = docID("labelForSubtask" + id).innerHTML;
    deleteSubtask(id);
  }