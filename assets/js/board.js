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
    docID('task1').innerHTML = '';
    docID('task2').innerHTML = '';
    docID('task3').innerHTML = '';
    docID('task4').innerHTML = '';
    for (let id = 0; id < tasks.length; id++) {
        const task = tasks[id];
        let j = tasks[id]["progress"];
        let taskBody = docID('task' + j);
        taskBody.innerHTML += /*html*/`
                    
                    <div id="task" class="task-decoration">
                        <div id="task-category${id}" class="task-category">${tasks[id]['category']}</div>
                        <div id="task-title">${tasks[id]['title']}</div>
                        <div id="task-description">${tasks[id]['description']}</div>
                        <div class = "progress-bar d-none" id="progress-bar${id}"><div id="progress-bar-outside"><div class="progress-bar-inside" id="progress-bar-inside${id}"></div></div><span id = "subtask${id}"></span></div>
                        <div id="task-footer">
                            <div id="contact-area">
                                <span class="contacts">SM</span>
                                <span class="contacts">MV</span>
                                <span class="contacts">EF</span>
                            </div>
                            <img id="contact-area-img${id}" class = "contact-area-img" src="./assets/img/lowLogo.png">
                        </div>
                        
                    </div>
        `
        if (tasks[id]["subtasks"] > 0) {
            let a = parseInt(tasks[id]["subtasks"])
            let b = parseInt(tasks[id]["done-tasks"])
            let percent = b/a*100
            docID('progress-bar' + id).classList.remove('d-none')
            docID('subtask' + id).innerHTML = /*html*/`
                ${b}/${a} subtasks
            `;
            docID('progress-bar-inside' + id).style.width = `${percent}%`;
        }

        let urgency = tasks[id]["urgency"];
        docID('contact-area-img' + id).src = "./assets/img/" + urgency + "Logo.png";

        let color = tasks[id]["category-color"];
        docID('task-category' + id).style.backgroundColor = color;
    }


}