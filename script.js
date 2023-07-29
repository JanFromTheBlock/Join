const JOIN_TOKEN = "70GV5W9B4NZ1VPZ59PLLC3EMQFF9KJPKXOADX7OT";
const JOIN_URL = "https://remote-storage.developerakademie.org/item";
let start = [{
    "name": "Anton Mayer",
    "email": "antom@gmail.com",
    "pass": "anton",
    "tel": "+49 1111 111 11 1"
}]
let users;
let user = "Sofia Müller"

async function setUser(key, value) {
    const payload = {key, value, token: JOIN_TOKEN};
    return await fetch(JOIN_URL, {method: 'POST', body: JSON.stringify(payload)});
}

async function getUser(key) {
    const url = `${JOIN_URL}?key=${key}&token=${JOIN_TOKEN}`;
    return await fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });;
}

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