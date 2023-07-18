function headerRender() {
    docID('header').innerHTML =/*html*/`
        <img class="header-img" src="./assets/img/logo624.png">
        <div class="header-data">
            <span>Kanban Project Management Tool</span>
            <img class="header-help" src="./assets/img/help.png">
            <img class="header-user" src="./assets/img/example-user.png">
        </div>
    `
}

function navRender() {
    docID('nav').innerHTML = /*html*/`
        <div class="menu">
            <a href="./summary.html" class="topic">
                <img src="./assets/img/Summary.png">
                <span>Summary</span>
            </a>
            <a href="./board.html" class="topic">
                <img src="./assets/img/Board.png">
                <span>Board</span>
            </a>
            <a href="./addTask.html" class="topic">
                <img src="./assets/img/add_task.png">
                <span>Add Task</span>
           </a>
            <a href="./contacts.html"class="topic">
                <img src="./assets/img/contact.png">
                <span>Contacts</span>
            </a>
        </div>
        <div class="legal">
            <div class="topic">
                <img src="./assets/img/legal.png">
                <span>Legal notice</span>
            </div>
            <div class="topic">
                <img src="">
                <span>Private policy</span>
            </div>
        </div>
    `
}

