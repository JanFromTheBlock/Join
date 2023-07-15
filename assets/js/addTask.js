function addTaskRender(){
    docID('addTask').innerHTML = /*html*/ `
    <div class="add-task">
        <form>
          <input required class="add-task-title cursor-pointer" placeholder="Enter a title" type="text">
          <select required class="add-task-select-contact cursor-pointer" id="selectContact">img
              <option disabled selected hidden value="">Selected contacts to assign</option>
              <option value="0">Test 2</option>
              <option value="1">Test 3</option>
          </select>
        </form>

        <form>
          <div class="add-task-due-date">
             <h2>Due Date</h2>
             <input class="add-task-due-date-input cursor-pointer cursor-pointer" id="dueDate" type="date">
          </div>
        </form>

        <form>
            <div class="add-task-due-date">
               <h2>Category</h2>
               <select required class="add-task-select-contact cursor-pointer" id="selectCategory">
                 <option disabled selected hidden value="">Select Task category</option>
                 <option value="0">Test 2</option>
                 <option value="1">Test 3</option>
               </select>
            </div>
        </form>
        <div class="add-task-importance">
          <button id="urgent" onclick="changeColor('urgent')" class="add-task-button-importance cursor-pointer">Urgent <img id="urgentLogo" src="./assets/img/urgentLogo.png"></button>
          <button id="medium" onclick="changeColor('medium')" class="add-task-button-importance cursor-pointer">Medium <img src="./assets/img/mediumLogo.png"></button>
          <button id="low" onclick="changeColor('low')" class="add-task-button-importance cursor-pointer">Low <img src="./assets/img/lowLogo.png"></button>
        </div>
       
        <div class="add-task-description">
          <h2>Description</h2>
          <textarea placeholder="Enter a Description" class="add-task-textarea cursor-pointer"></textarea>
        </div>
        
        <div>
          <h2>Subtasks</h2>
          <div>
            <input id="inputSubtask" required class="add-task-subtask cursor-pointer" placeholder="Add new subtask" type="text">
            <img onclick="showSubtasks()" class="add-task-plus-button cursor-pointer" src="./assets/img/subtaskPlus.png">
          </div>

          <div id="subTaskArea" class="d-none">
           
         </div>
        </div>

    </div>
    `;
}

function showSubtasks(){
  let subtaskArea = document.getElementById(`subTaskArea`);
  let inputSubtask = document.getElementById(`inputSubtask`).value;
  
  document.getElementById(`inputSubtask`).value = ``;

  subtaskArea.classList.remove(`d-none`);
  
  subtaskArea.innerHTML += `
  <div class="subTaskArea">
  <input class="cursor-pointer" type="checkbox">
  <label for="subtask1">${inputSubtask}</label>
  </div>
  `;
  
}

function changeColor(i) {
  let urgent = document.getElementById('urgent');
  let medium = document.getElementById('medium');
  let low = document.getElementById('low');

  if (i === 'urgent') {
    urgent.classList.add('change-color-urgent');
    urgent.classList.add('clicked');
    medium.classList.remove('change-color-medium');
    medium.classList.remove('clicked');
    low.classList.remove('clicked');
    low.classList.remove('change-color-low');
  } else if (i === 'medium') {
    urgent.classList.remove('change-color-urgent');
    medium.classList.add('clicked');
    low.classList.remove('clicked');
    urgent.classList.remove('clicked');
    medium.classList.add('change-color-medium');
    low.classList.remove('change-color-low');
  } else if (i === 'low') {
    urgent.classList.remove('change-color-urgent');
    medium.classList.remove('change-color-medium');
    low.classList.add('change-color-low');
    medium.classList.remove('clicked');
    urgent.classList.remove('clicked');
    low.classList.add('clicked');
  }
}


