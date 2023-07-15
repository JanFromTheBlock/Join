let JOIN_TOKEN = "70GV5W9B4NZ1VPZ59PLLC3EMQFF9KJPKXOADX7OT";

function docID (id){
    return document.getElementById(id);
}

function summaryInit() {
    headerRender();
    navRender();
    SummaryRender();
    sumOverviewRender();
    
}

function taskInit() {
    headerRender();
    navRender();
    
}

function addTaskInit(){
    headerRender();
    navRender();
    addTaskRender();
    newTask();
}

function addBoardInit(){
    headerRender();
    navRender();
    addBoardRender();
}