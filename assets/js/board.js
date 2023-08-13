let taskTitles = ["1", "2", "3", "4"]  //Array, um Drag und Drop Zielarea festzulegen
let taskNames = ["To do", "In progress", "Await feedback", "Done"]  //Array, um beim Rendern der Rask-areas die Titel zu vergeben
let currentDraggedElement;                           // In dieser Variable wird die id der gedraggten Task gespeichert

function addBoardRender() {
    let board = docID('board');  //Suchbereich und Add Task Button werden gerendert
    board.innerHTML = '';
    board.innerHTML += /*html*/`
        <div id="board-input">
            <div id="find-task">
                <input id="input" type="text" placeholder="Find Task" onkeyup="filterTasks(); handleKeyPress(event)">
                <div id="img-search-margin">
                    <img id="img-search" onclick="handleImgClick()" src="./assets/img/search.png">
                </div>
                
            </div>
            <button onclick="openAddTask()" id="board-button">Add Task <span id="board-button-plus">+</span></button>
        </div>
        <div id="task-area"></div>
    `
    for (let index = 0; index < taskTitles.length; index++) {  //die 4 Task-areas werden gerendert (To dos, in Progress, ...)
        const taskTitle = taskTitles[index];  //Diese Variable bestimmt, wo das gedarggte Objekt hinverschoben werden soll
        const taskName = taskNames[index];    //Diese variable weißt den task-areas den dazugehörigen Titel zu
        let indexFinal = index + 1             // index muss um einen erhöht werden, da in diesem Fall bei den tasks bei 1 angefangen wurde zu zählen und nicht wie üblich bei 0
        docID('task-area').innerHTML += /*html*/` 
            <div ondrop="moveTo('${taskTitle}')" ondragover="allowDrop(event)" class="task-body" id="task-body${index}">
                <div class="task-body-flex">
                    <span>${taskName}</span>
                    <img  onclick="openAddTask()" id="task-img${index}" src="./assets/img/board_plus.png">
                </div>
                <div id="tasks${indexFinal}"></div>
            </div>
        `

    }
    docID('task-img3').classList.add('d-none');     //bei task-img3 soll das + Symbol nicht angezeigt werden, daher wird die Klasse d-none hinzugefügt

    loadTasks();
}

function loadTasks(id) {
    emptyTaskDivs();
    let k = 0;         //fortlaufende Variable definiert für die contact-divs
    for (let id = 0; id < tasks.length; id++) {   //For-Schleife zum Beladen der 4 Task-Container
        renderTaskBody(id);
        renderSubtasks(id);
        renderUrgencySymbol(id);
        renderCategoryColor(id);

        let contactArea = docID('contact-area' + id);             //Kontaktbereich in der Task wird gerendert 
        contactArea.innerHTML = ``
        for (let i = 0; i < tasks[id]['contact-firstname'].length; i++) {   //for SChleife durch contact-firstname
            let firstName = tasks[id]['contact-firstname'][i];   //Variable erhält Vornamen an der Position i
            let lastName = tasks[id]['contact-lastname'][i];     //Variable erhält Nachnamen an der Position i
            let Initial1 = firstName.charAt(0);                  //Anfangsbuchstabe Vorname
            let Initial2 = lastName.charAt(0);                   //Anfangsbuchstabe Nachname
            let initials = Initial1 + Initial2;                  //beide Initialien werden zusammengeführt        
            let initialsUpper = initials.toLocaleUpperCase();    //Initialien werden als Großbuchstaben geschrieben
            let color = tasks[id]['contact-color'][i];           //die dazugehörige(i) Farbe wird aus dem Array gezogen
            k++;                                                 //Variable k erhöht sich um eins und wird an id contacts angehängt
            contactArea.innerHTML += /*html*/`                  
        <span class="contacts" id = "contacts${k}"> ${initialsUpper}</span>
    `
            docID('contacts' + k).style.backgroundColor = color;     //Farbe wird für Kontaksymbol geändert
        }
    }


}

function emptyTaskDivs() {
    docID('tasks1').innerHTML = '';
    docID('tasks2').innerHTML = '';
    docID('tasks3').innerHTML = '';
    docID('tasks4').innerHTML = '';
}

function renderTaskBody(id) {
    let j = tasks[id]["progress"];            // Variable um festzulegen, in welchem Task-Container die Aufgabe landet
    let taskBody = docID('tasks' + j);
    let l = tasks[id]['array-id'];        //// Anschließend wird Div-Struktur mit passenden ID's für die Task-Container gerendert
    let prioritySmall = tasks[id]['urgency']
    taskBody.innerHTML += /*html*/`
                    
    <div draggable="true" ondragstart="startDragging(${l})" onclick="openWindow(event, ${id})" id="task${l}" class="task-decoration">
        <div id="task-category${id}" class="task-category">${tasks[id]['category']}</div>
        <div id="task-title">${tasks[id]['title']}</div>
        <div id="task-description">${tasks[id]['description']}</div>
        <div class = "progress-bar d-none" id="progress-bar${id}"><div id="progress-bar-outside"><div class="progress-bar-inside" id="progress-bar-inside${id}"></div></div><span id = "subtask${id}"></span></div>
        <div id="task-footer">
            <div class="contact-area" id="contact-area${id}"></div>
            <img id="contact-area-img${id}" class= "contact-area-img" src="${prioritySmall}">
        </div>
        
    </div>
`                                    //Taskbody wurde gerendert und dabei wurde den Task-divs Drag-Funktionen zugeteilt, damit man in diesen Bereich draggen kann und Drag-Funktion gestartet werden kann
}

function startDragging(element) {                          //Funktion um die id der gedraggten Task in der Variable zu speichern; muss auch um 1 gesenkt werden, da bei den ids bei 1 statt bei 0 angefangen wurde
    currentDraggedElement = element - 1;

}
function allowDrop(ev) {                                //Funktion die dafür sorgt, dass Tasks gedroppt werden können in dem Bereich
    ev.preventDefault();
}

function moveTo(progress) {                           //Funktion bekommt als Parameter den Ort, wo die gedraggte Task gedropt werden soll
    tasks[currentDraggedElement]['progress'] = progress;   // anschließend wird dies im array verändert an der entsprechenden Position
    addBoardRender();                                      // anschließend muss alles neu gerendert werden, damit die Änderungen geladen werden
}

function renderSubtasks(id) {                    //subtasks werden gerendert
    if (tasks[id]["subtasks"] > 0) {             // wenn die Anzahl an Subtasks größer 0 ist dann wird Funktion ausgeführt
        let a = parseInt(tasks[id]["subtasks"])   // Variable a sind die Anzahl an subtasks
        let b = parseInt(tasks[id]["done-tasks"]) // Variable b sind die Anzahl erledigter subtasks
        let percent = b / a * 100                 // Prozentanteil erledigter aufgaben wird berechnet
        docID('progress-bar' + id).classList.remove('d-none')      //der progress-bar wird das d-none entfernt und sie wird sichtbar
        docID('subtask' + id).innerHTML = /*html*/`
            ${b}/${a} subtasks
        `;                                                          // die Anzahl an subtass wird neben die progress-bar gerendert
        docID('progress-bar-inside' + id).style.width = `${percent}%`;   //der Prozentanteil erledigter Aufgaben wird als Füllmenge für die progress-bar verwnedet
    }
}

function renderUrgencySymbol(id) {
    let urgency = tasks[id]["urgency"];
    docID('contact-area-img' + id).src = urgency;  //je nachdem welche urgency besteht, wird ein anderes Bild gerendert
}

function renderCategoryColor(id) {                  //die Hintergrundfarbe für die Task-Kategorie wird geladen und dem div gegeben
    let color = tasks[id]["category-color"];
    docID('task-category' + id).style.backgroundColor = color;
}

function filterTasks() {                    //Die Tasks werden nach Namen gefiltert
    let search = docID('input').value;     // Wert aus dem Inputfeld wird genommen
    search = search.toLowerCase();         //Variable wird in kleine Buchstaben umgewandelt

    emptyTaskDivs();                       //die Divs werden wieder geleert, um neu befüllt zu werden
    k = 0;                                 // k muss auf 0 gesetzt werden, damit wieder bei 0 angefangen wird zu zhlen 
    for (let id = 0; id < tasks.length; id++) {         //anschließend wird wieder neu gerendert mit der Bedingung das der Input-text in dem Namen der Taks vorkommt
        let name = tasks[id]["title"];
        if (name.toLowerCase().includes(search)) {
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
                docID('contacts' + k).style.backgroundColor = color;     //Farbe wird für Kontaksymbol geändert
            }
        }

    }
}

function clearInput() {
    docID('input').value = ''; // Setze den Wert des Input-Feldes auf leer
}

// Event-Handler für das Tastaturereignis (Enter-Taste)
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        clearInput();
        // Hier kannst du die Funktion aufrufen, die deine divs nach dem Text filtert
    }
}
// Event-Handler für das Klickeignis auf das Bild
function handleImgClick() {
    clearInput();
    // Hier kannst du die Funktion aufrufen, die deine divs nach dem Text filtert
}

function openWindow(event, id) {
    docID('task-window').classList.remove('d-none');  //dem Div wird die d-none-Klasse genommen. und das Window wird sichtbar
    event.stopPropagation();                          // Funktion sorgt dafür, dass das Window nicht geschlossen wird, wenn man auf den onclick-Button drückt
    window.scrollTo(0, 0)                              // wenn Fenster geöffnet wird, wird nach oben gescrollt
    renderWindow(id);                                 // das Window wird mit seinen Inhalten gerendert
}

function closeWindow() {
    docID('task-window').classList.add('d-none')    //das window wird geschlossen, indem dem div die d-none-Klasse wieder hinzugefügt wird
}

function doNotClose(event) {                        //die divs, die diese Funktion auslösen, schließen nicht das window beim onclick
    event.stopPropagation();
}

function renderWindow(id) {                     //das Window wird gerendert
    renderStructureOfTheWindow(id);
    addColorOfTheCategory(id);
    renderPriorityToTheWindow(id);
    renderContactsToWindow(id);
}



function renderStructureOfTheWindow(id) {
    let taskWindow = docID('task-window');      //div in die der HTML-Code gerendert wird, wird als Variable definiert
    let prioritySmall = tasks[id]['urgency']    //die Priorität aus dem array wird als Variable definiert
    let priority = prioritySmall.charAt(0).toUpperCase() + prioritySmall.slice(1);  //die Priorität soll einen großen Anfangsbuchstaben haben
    let dueDate = tasks[id]['date']             // Das Datum aus dem Array wir als Variable definiert
    taskWindow.innerHTML = '';                  //Die div wird geleert und anschließend das Gerüst des HTML-Codes für das Window gerendert
    taskWindow.innerHTML = /*html*/`

        <div>
            <img id="close-img" onclick="closeWindow()" src="./assets/img/close.png">
            <div id="task-window-inside">
                <div id="window-category" class="task-category">${tasks[id]['category']}</div>
                <div id="window-title">${tasks[id]['title']}</div>
                <div id="window-description">${tasks[id]['description']}</div>
                <div id="date">Due date: 
                    <div id="date-inside">${dueDate}</div>
                </div>
                <div id="window-priority">Priority: 
                    <div id="window-priority-inside"> <img id="window-contact-img" src="${priority}"></div>
                </div>
                <div id="window-contact-area">
                    <div>Assigned to:</div>
                </div>
            </div>
            <div id="contact-buttons"><img onmouseover="changeDeleteImage(true)" onmouseout="changeDeleteImage(false)" id="delete-button" onclick="deleteTask(${id})" src="./assets/img/delete.png"> <img id="edit-button" src="./assets/img/edit.png"></div>
           

        </div>
    `
}
function addColorOfTheCategory(id) {   //Hintergrundfarbe der Kategorie wird angepasst
    let color = tasks[id]["category-color"];
    docID('window-category').style.backgroundColor = color;
}
function renderPriorityToTheWindow(id) {
    addUrgencyImage(id);
    addUrgencyColor(id);
}
function addUrgencyImage(id) {  //die Urgency de Tasks wird aus dem Array gelesen und in die src für das dazugehörige Img eingefügt, damit das entsprechende Bild angezeigt wird
    let urgency = tasks[id]["urgency"];
    docID('window-contact-img').src = urgency;
}
function addUrgencyColor(id) {   //Mit if-Abfragen wird abgefragt, welches der drei möglichen Prioritäten in dem array an Stelle id stehen. Je nachdem wird dann die dazugehörige Hintergrundfarbe dargstellt
    if (tasks[id]["urgency"] === "low") {
        docID('window-priority-inside').style.backgroundColor = '#CBFFC2';
    }
    if (tasks[id]["urgency"] === "medium") {
        docID('window-priority-inside').style.backgroundColor = '#FFEBB9';
    }
    if (tasks[id]["urgency"] === "urgent") {
        docID('window-priority-inside').style.backgroundColor = '#FFD2D2';
    }
}
function renderContactsToWindow(id) {
    let windowContactArea = docID('window-contact-area');
    for (let contactID = 0; contactID < tasks[id]['contact-firstname'].length; contactID++) {

        let firstName = tasks[id]['contact-firstname'][contactID];
        let lastName = tasks[id]['contact-lastname'][contactID];
        let Initial1 = firstName.charAt(0);
        let Initial2 = lastName.charAt(0);
        let initials = Initial1 + Initial2;
        let initialsUpper = initials.toLocaleUpperCase();
        let color = tasks[id]['contact-color'][contactID];

        windowContactArea.innerHTML += /*html*/`
            <div id="window-contact-area-inside">
                <div class="initials" id="initials${contactID}">${initialsUpper}</div>
                <div class = "name-contact">
                    <div>${firstName}</div>
                    <div>${lastName}</div>
                </div>
            </div>
            
        `
        docID('initials' + contactID).style.backgroundColor = color;
    }
}


function deleteTask(id) {  //Löschen der ausgewählten Aufgabe
    tasks.splice(id, 1);  //aus dem array wird die Aufgabe an der Stelle id gelöscht
    addBoardRender();     //anschließend wird das Board neu gerendert ohne das gelöschte Element
    closeWindow();        //dann wird das Fenster wieder geschlossen

}
function changeDeleteImage(isHovering) {
    const deleteButton = document.getElementById('delete-button');
    if (isHovering) {
      deleteButton.src = './assets/img/delete_hover.png';
    } else {
      deleteButton.src = './assets/img/delete.png';
    }
  }

// öffnet AddTask

 function openAddTask(){
    let addTaskUnder = document.getElementById(`addTaskToBoardUnderDiv`);
    let backgroundBoard = document.getElementById(`board`);
    let backgroundNav = document.getElementById(`nav`);
    let backgroundHeader = document.getElementById(`header`);
    let boardBody = document.getElementById(`boardBody`);
    let board = document.getElementById(`board`);
    let addTaskButtonToBoard = document.getElementById(`addTaskButtonToBoard`);
    addTaskUnder.classList.remove(`d-none`);
     setTimeout(() => {
        addTaskButtonToBoard.classList.remove(`d-none`);
        addTaskUnder.classList.remove(`add-task-to-board-hide`);
      }, 100);
    boardBody.classList.remove(`overflow-hidden`);
    board.classList.add(`overflowY`);
    backgroundBoard.classList.add(`decrease-opacity`);
    backgroundHeader.classList.add(`decrease-opacity`);
    backgroundNav.classList.add(`decrease-opacity`);
    backgroundBoard.classList.remove(`full-opacity`);
    backgroundHeader.classList.remove(`full-opacity`);
    backgroundNav.classList.remove(`full-opacity`);
 }

// schließt AddTask

 function closeAddTaskToBoard(){
    let addTask = document.getElementById(`addTaskToBoardUnderDiv`);
    let backgroundBoard = document.getElementById(`board`);
    let backgroundNav = document.getElementById(`nav`);
    let backgroundHeader = document.getElementById(`header`);
    let addTaskButtonToBoard = document.getElementById(`addTaskButtonToBoard`);
    addTaskButtonToBoard.classList.add(`d-none`);
    board.classList.remove(`overflowY`);
    addTask.classList.add(`add-task-to-board-hide`);
    setTimeout(() => {
        addTask.classList.add(`d-none`);
      }, 325);
    backgroundBoard.classList.add(`full-opacity`);
    backgroundHeader.classList.add(`full-opacity`);
    backgroundNav.classList.add(`full-opacity`);
    backgroundBoard.classList.remove(`decrease-opacity`);
    backgroundHeader.classList.remove(`decrease-opacity`);
    backgroundNav.classList.remove(`decrease-opacity`);
 }