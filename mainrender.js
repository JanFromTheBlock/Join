let menuId = ["menu-summary", "menu-board", "menu-add", "menu-contacts"];

function headerRender() {
    docID('header').innerHTML =/*html*/`
        <img class="header-img" src="./assets/img/logo624.png">
        <div class="header-data">
            <span>Kanban Project Management Tool</span>
            <img class="header-help" src="./assets/img/help.png">
            <!-- <img class="header-user" src="./assets/img/example-user.png"> -->
            <div id="header-user-con">
                <div id="header-user-ellipse">
                    <div id="header-user-name"> SM
                    </div>
                </div>
            </div>
        </div>
    `
}

function navRender() {
    docID('nav').innerHTML = /*html*/`
        <div id="menu" class="menu"></div>
        <div class="legal">
            <div class="topic">
                <img src="./assets/img/legal.png">
                <span>Legal notice</span>
            </div>
            <div class="topic">
                <img src="./assets/img/legal.png">
                <span>Private policy</span>
            </div>
        </div>
    `
    menuRender();
}

function menuRender() {
    docID("menu").innerHTML = "";
    let urls = ["./summary.html", "./board.html", "./addTask.html", "./contacts.html"];
    let names =  ["Summary", "Board", "Add Task", "Contacts"];
    let img = ["Summary", "Board", "add_task", "contact" ]

    for (let i = 0; i < menuId.length; i++) {
        docID("menu").innerHTML += /*html*/`
            <a id="${menuId[i]}" href="${urls[i]}" class="topic">
                <img src="./assets/img/${img[i]}.png">
                <span>${names[i]}</span>
            </a>
        ` 
    }
}


function activeSite(id) {
    for (let i = 0; i < menuId.length; i++) {
        if (menuId[i] == id) {
            docID(menuId[i]).classList.add("topic-active");
        }else {
            docID(menuId[i]).classList.remove("topic-active");
        }
    }
}