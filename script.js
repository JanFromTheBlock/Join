const JOIN_TOKEN = "70GV5W9B4NZ1VPZ59PLLC3EMQFF9KJPKXOADX7OT";
const JOIN_URL = "https://remote-storage.developerakademie.org/item";
let start = [{
    "name": "Anton Mayer",
    "email": "antom@gmail.com",
    "pass": "anton",
    "tel": "+49 1111 111 11 1"
}]
let users;
let user = "Guest";
let userInitial = "G";
let boardActive;
let colorIndex = 0;
const colors = [
    "#FF7A00",
    "#9327FF",
    "#6E52FF",
    "#FC71FF",
    "#FFBB2B",
    "#1FD7C1",
    "#462F8A",
    "#FF4646",
];

async function setElement(key, value) {
    const payload = { key, value, token: JOIN_TOKEN };
    return await fetch(JOIN_URL, { method: 'POST', body: JSON.stringify(payload) });
}

async function getElement(key) {
    const url = `${JOIN_URL}?key=${key}&token=${JOIN_TOKEN}`; //store the fetchparameter in url variable
    return await fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code - fetch die Daten.
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });;
}

function docID(id) {
    return document.getElementById(id);
}

async function withContacts() {
    try {
        const getdataContacts = await getElement('contacts');
        contacts = JSON.parse(getdataContacts);
    } catch (error) {
        console.error('Error initializing contacts:', error);
    }
}

function activeUser() {
    if (localStorage.getItem('activshort') === null) {
        if (sessionStorage.getItem('activshort') === null) {
            user = "Guest";
            userInitial = "G";
        }
        else {
            userInitial = sessionStorage.getItem('activshort');
            user = sessionStorage.getItem('activeuser');
        }
    } else {
        userInitial = localStorage.getItem('activshort');
        user = localStorage.getItem('activeuser');
    }
}

async function summaryInit() {
    activeUser();
    headerRender();
    navRender();
    activeSite("menu-summary");
    getdata = await getElement('tasks');
    tasks = JSON.parse(getdata);
    greetingNameRender();
    sumBigBtn();
    squareButtonRender();
    sumOverviewRender();

}

function taskInit() {
    headerRender();
    navRender();
}

async function addTaskInit() {
    addTaskInitClicked = true;
    activeUser();
    headerRender();
    navRender();
    activeSite("menu-add");
    getdata = await getElement('tasks');
    tasks = JSON.parse(getdata);
    try {
        const getdataContacts = await getElement('contacts');
        contacts = JSON.parse(getdataContacts);
    } catch (error) {
        console.error('Error initializing contacts:', error);
    }
    getdata = await getElement('subtasks');
    subtasks = JSON.parse(getdata);
    addTaskRender();
    subtasks = [];
    boardActive = false;
    docID('header').style.zIndex = '5';
}

async function addBoardInit() {
    addBoardInitClicked = true;
    activeUser();
    headerRender();
    navRender();
    activeSite("menu-board");

    getdata = await getElement('tasks');
    tasks = JSON.parse(getdata);
    try {
        const getdataContacts = await getElement('contacts');
        contacts = JSON.parse(getdataContacts);
    } catch (error) {
        console.error('Error initializing contacts:', error);
    }
    getdata = await getElement('subtasks');
    subtasks = JSON.parse(getdata);
    addBoardRender();
    boardActive = true;
    docID('header').style.zIndex = '3';
}

function legalNotesInit() {
    headerRender();
    navRender();
    hideElements();
}

async function contactsInit() {
    activeUser(); // check if there is an active user and which one
    headerRender(); // render the header
    navRender(); // render the nav bar
    activeSite("menu-contacts"); //mark the contactsicon on the board.
    try { // getting data from backend
        const getdataContacts = await getElement('contacts');
        contacts = JSON.parse(getdataContacts);
    } catch (error) {
        console.error('Error initializing contacts:', error);
    }
    renderContacts();
}

function helpInit() {
    activeUser();
    headerRender();
    navRender();
}

// save the active user in local storage
function localUsersave(name) {
    let initials = name.match(/[A-Z]/g).join('').slice(0, 2)
    localStorage.setItem('activeuser', name);
    localStorage.setItem('activshort', initials)
}

// load the active user in local storage
function localUserload() {
    user = localStorage.getItem('activeuser');
    userInitial = localStorage.getItem('activeshort');
}

function sessionUsersave(name) {
    let initials = name.match(/[A-Z]/g).join('').slice(0, 2)
    sessionStorage.setItem('activeuser', name);
    sessionStorage.setItem('activshort', initials)
}

function localUserload() {
    user = sessionStorage.getItem('activeuser');
    userInitial = sessionStorage.getItem('activeshort');
}

async function newContactsign(name, mail) {
    let contactData = gatherContactDataSign(name, mail); //neue
    if (!contactData) return;
    firstname(contactData, false);
}

function gatherContactDataSign(name, mail) {
    let phone = "Keine Angabe";
    let color = colors[colorIndex];
    colorIndex = updateColorIndex(colorIndex);
    let contactId = newContactId();
    return { name: name, mail: mail, phone: phone, color: color, contactId: contactId }
}

function firstname(contactData, what) {
    let firstLetter = contactData.name.charAt(0).toUpperCase();
    addToContacts(firstLetter, contactData);
    orderAndSaveContacts(what);
}


// function to push the contact in contacts
function addToContacts(firstLetter, contact) {
    if (!contacts[firstLetter]) {
        contacts[firstLetter] = [];
    }
    contacts[firstLetter].push(contact);
}

//
function orderAndSaveContacts(what) {
    orderContacts(); // order the contacts with alphabet
    setElement('contacts', contacts); //save the contacts in Backend
    if (what) {
        ContactInitNew();
    }
}


//function check
function orderContacts() {
    // Stelle sicher, dass die globale Variable 'contacts' definiert ist / noch notwendig?
    if (typeof contacts === "undefined") {
        console.error("Die Variable 'contacts' ist nicht definiert.");
        return;
    }
    sortContactsByKey();
}

//function check
function sortContactsByKey() {
    const sortedContacts = {};
    let sortedKeys = Object.keys(contacts).sort();
    sortedKeys.forEach((key) => {
        sortedContacts[key] = contacts[key].sort((a, b) => {
            return a.name.localeCompare(b.name); // Sortiere nach Namen
        });
    });
    // Aktualisiere die globale Variable 'contacts' mit den sortierten Kontakten
    Object.assign(contacts, sortedContacts);
}

//Kay check
function updateColorIndex(colorIndex) {
    return colorIndex === colors.length ? 0 : colorIndex + 1; //if-function to turn around
}

//funktion aufsplitten
function newContactId() {
    let sum = 0;
    for (let i in contacts) {
        if (!contacts[i][0]) {
            continue;
        }
        for (let J = 0; J < contacts[i].length; J++) {
            let element = contacts[i][J].contactId;
            if (element > sum) {
                sum = element;
            }
        }
    }
    return sum + 1;
}

function showDropdown(){
    docID('menu-dropdown').classList.remove('d-none');
    docID('header-user-con').onclick = null;

}

function closeDropdown(){
    docID('menu-dropdown').classList.add('d-none');
    headerRender();
}

function doNotClose(event) {
    //die divs, die diese Funktion auslösen, schließen nicht das window beim onclick
    event.stopPropagation();
  }


function logOut() {
    //window.href -> index.html
    //localstorage leeren
    //sessionstorage leeren
}