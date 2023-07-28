let JOIN_TOKEN = "70GV5W9B4NZ1VPZ59PLLC3EMQFF9KJPKXOADX7OT";
let user = "Sofia Müller"


function docID (id){
    return document.getElementById(id);
}

function summaryInit() {
    headerRender();
    navRender();
    activeSite("menu-summary");
    SummaryRender();
    greetingNameRender();
    sumBigBtn();
    squareButtonRender();
    sumOverviewRender();
    
}

function taskInit() {
    headerRender();
    navRender();
    
}

function addTaskInit(){
    headerRender();
    navRender();
    activeSite("menu-add");
    addTaskRender();
}

function addBoardInit(){
    headerRender();
    navRender();
    activeSite("menu-board");
    addBoardRender();
    renderAddTaskToBoard();
}

function legalNotesInit(){
    headerRender();
    navRender();
    hideElements();
}