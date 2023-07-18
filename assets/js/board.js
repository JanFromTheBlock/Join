function addBoardRender() {
    let board = docID('board');
    board.innerHTML = '';
    board.innerHTML += /*html*/`
        <div id="board-input">
            <div id="find-task">
                <input id="input" type="text" placeholder="Find Task">
                <img id="img-search" src="./assets/img/search.png">
            </div>
            <button id="board-button">Add Task <span id="board-button-plus">+</span></button>
        </div>
        <div id="task-area">
            <div class="task-body">
                <div class="task-body-flex">
                    <span>To do</span>
                    <img src="./assets/img/board_plus.png">
                </div>
                <div id="task1"></div>
            </div>
            <div class="task-body">
                <div class="task-body-flex">
                    <span>In progress</span>
                    <img src="./assets/img/board_plus.png">
                </div>
                <div id="task2"></div>
            </div>
            <div class="task-body">
                <div class="task-body-flex">
                    <span>Await feedback</span>
                    <img src="./assets/img/board_plus.png">
                </div>
                <div id="task3"></div>
             </div>
            <div class="task-body">
                <div class="task-body-flex">
                    <span>Done</span>
                </div>
                <div id="task4"></div>
            </div>
        </div>
    `

    loadTasks();
}

function loadTasks() {
    emptyTaskDivs();
    let k = 0;         //fortlaufende Variable definiert für die contact-divs
    for (let id = 0; id < tasks.length; id++) {   //For-Schleife zum Laden der 4 Task-Container
        renderTaskBody(id);
        renderSubtasks(id);
        renderUrgencySymbol(id);
        renderCategoryColor(id);

        let contactArea = docID('contact-area' + id);
        contactArea.innerHTML = ``
        for (let i = 0; i < tasks[id]['contact-firstname'].length; i++) {
            let firstName = tasks[id]['contact-firstname'][i];
            let lastName = tasks[id]['contact-lastname'][i];
            let Initial1 = firstName.charAt(0);
            let Initial2 = lastName.charAt(0);
            let initials = Initial1 + Initial2;
            let initialsUpper = initials.toLocaleUpperCase();
            let color = tasks[id]['contact-color'][i];
            k++;
            contactArea.innerHTML += /*html*/`
        <span class="contacts" id = "contacts${k}"> ${initialsUpper}</span>
    `
            docID('contacts' + k).style.backgroundColor = color;
        }
    }


}

function emptyTaskDivs() {
    docID('task1').innerHTML = '';
    docID('task2').innerHTML = '';
    docID('task3').innerHTML = '';
    docID('task4').innerHTML = '';
}

function renderTaskBody(id) {
    let j = tasks[id]["progress"];            // Variable um festzulegen, in welchem Task-Container die Aufgabe landet
    let taskBody = docID('task' + j);         //// Anschließend wird Div-Struktur mit passenden ID's für die Task-Container gerendert
    taskBody.innerHTML += /*html*/`
                    
    <div id="task" class="task-decoration">
        <div id="task-category${id}" class="task-category">${tasks[id]['category']}</div>
        <div id="task-title">${tasks[id]['title']}</div>
        <div id="task-description">${tasks[id]['description']}</div>
        <div class = "progress-bar d-none" id="progress-bar${id}"><div id="progress-bar-outside"><div class="progress-bar-inside" id="progress-bar-inside${id}"></div></div><span id = "subtask${id}"></span></div>
        <div id="task-footer">
            <div id="contact-area${id}"></div>
            <img id="contact-area-img${id}" class = "contact-area-img" src="./assets/img/lowLogo.png">
        </div>
        
    </div>
`
}

function renderSubtasks(id) {
    if (tasks[id]["subtasks"] > 0) {
        let a = parseInt(tasks[id]["subtasks"])
        let b = parseInt(tasks[id]["done-tasks"])
        let percent = b / a * 100
        docID('progress-bar' + id).classList.remove('d-none')
        docID('subtask' + id).innerHTML = /*html*/`
            ${b}/${a} subtasks
        `;
        docID('progress-bar-inside' + id).style.width = `${percent}%`;
    }
}

function renderUrgencySymbol(id) {
    let urgency = tasks[id]["urgency"];
    docID('contact-area-img' + id).src = "./assets/img/" + urgency + "Logo.png";
}

function renderCategoryColor(id) {
    let color = tasks[id]["category-color"];
    docID('task-category' + id).style.backgroundColor = color;
}


