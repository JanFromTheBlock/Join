const JOIN_TOKEN = "70GV5W9B4NZ1VPZ59PLLC3EMQFF9KJPKXOADX7OT";
const JOIN_URL = "https://remote-storage.developerakademie.org/item";

let users;
let user;
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

/**
 * Returns a DOM element based on the ID.
 *
 * @param {string} id - The ID of the DOM element.
 * @returns {HTMLElement} - The found DOM element.
 */
function docID(id) {
    return document.getElementById(id);
}

/**
 * Prevents the window from closing on an event.
 *
 * @param {Event} event - The triggered event.
 */
function doNotCloseWindow(event) {
    event.stopPropagation();
}

/**
 * Sends a POST request to set an element in the remote storage.
 *
 * @param {string} key - The key of the element.
 * @param {any} value - The value of the element.
 * @returns {Promise<Response>} - A promise for the HTTP response.
 */
async function setElement(key, value) {
    const payload = { key, value, token: JOIN_TOKEN };
    return await fetch(JOIN_URL, { method: 'POST', body: JSON.stringify(payload) });
}

/**
 * Retrieves an element from the remote storage based on the key.
 *
 * @param {string} key - The key of the element.
 * @returns {Promise<any>} - A promise for the retrieved value.
 */
async function getElement(key) {
    const url = `${JOIN_URL}?key=${key}&token=${JOIN_TOKEN}`; //store the fetchparameter in url variable
    return await fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code - fetch die Daten.
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });;
}

/**
 * Initializes the contact list by fetching data from the remote storage.
 */
async function withContacts() {
    try {
        const getdataContacts = await getElement('contacts');
        contacts = JSON.parse(getdataContacts);
    } catch (error) {
        console.error('Error initializing contacts:', error);
    }
}

/**
 * Checks and sets the active user based on local storage.
 * If there's no active user, redirects to the index page.
 */
function activeUser() {
    if (localStorage.getItem('activshort') === null) {
        if (sessionStorage.getItem('activshort') === null) {
            window.location.href = './index.html'
        }
        else {
            userInitial = sessionStorage.getItem('activshort');
            user = sessionStorage.getItem('activeuser');
            return true
        }
    } else {
        userInitial = localStorage.getItem('activshort');
        user = localStorage.getItem('activeuser');
    }
}

/**
 * Initializes the summary page by rendering the header, navigation, and tasks.
 * Also retrieves and parses task data from the remote storage.
 */
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

/**
 * Initializes the add task page, rendering the header, navigation, and tasks.
 * Also retrieves and parses task, contact, and subtask data from the remote storage.
 */
async function addTaskInit() {
    addTaskInitClicked = true;
    activeUser();
    headerRender();
    navRender();
    activeSite("menu-add");
    getdata = await getElement('tasks');
    tasks = JSON.parse(getdata);
    let getdataContacts = await getElement('contacts');
    contacts = JSON.parse(getdataContacts);
    getdata = await getElement('subtasks');
    subtasks = JSON.parse(getdata);
    addTaskRender();
    addTaskRenderOption();
    subtasks = [];
    boardActive = false;
    docID('header').style.zIndex = '5';
}

/**
 * Initializes the board page, rendering the header, navigation, and tasks.
 * Also retrieves and parses task, contact, and subtask data from the remote storage.
 */
async function addBoardInit() {
    addBoardInitClicked = true;
    activeUser();
    headerRender();
    navRender();
    activeSite("menu-board");
    getdata = await getElement('tasks');
    tasks = JSON.parse(getdata);
    let getdataContacts = await getElement('contacts');
    contacts = JSON.parse(getdataContacts);
    getdata = await getElement('subtasks');
    subtasks = JSON.parse(getdata);
    addBoardRender();
    boardActive = true;
    docID('header').style.zIndex = '3';
}

/**
 * Initializes the legal notes page by rendering the header and navigation.
 */
function legalNotesInit() {
    headerRender();
    navRender();
    hideElements();
}

/**
 * Initializes the contacts page by rendering the header, navigation, and contacts.
 * Also retrieves and parses contact data from the remote storage.
 */
async function contactsInit() {
    activeUser(); // check if there is an active user and which one
    headerRender(); // render the header
    navRender(); // render the nav bar
    activeSite("menu-contacts"); //mark the contactsicon on the board.
    let getdataContacts = await getElement('contacts'); // getting data from backend
    contacts = JSON.parse(getdataContacts); // parse the backend data into JSON
    renderContacts();
}

/**
 * Initializes the help page by rendering the header and navigation.
 */
function helpInit() {
    activeUser();
    headerRender();
    navRender();
}

/**
 * Saves the active user in local storage with their initials.
 *
 * @param {string} name - The name of the active user.
 */
function localUsersave(name) {
    let initials = name.match(/[A-Z]/g).join('').slice(0, 2)
    localStorage.setItem('activeuser', name);
    localStorage.setItem('activshort', initials)
}

/**
 * Saves the active user in session storage with their initials.
 *
 * @param {string} name - The name of the active user.
 */
function localUserload() {
    user = localStorage.getItem('activeuser');
    userInitial = localStorage.getItem('activeshort');
}

/**
 * Saves the active user in session storage with their initials.
 *
 * @param {string} name - The name of the active user.
 */
function sessionUsersave(name) {
    let initials = name.match(/[A-Z]/g).join('').slice(0, 2)
    sessionStorage.setItem('activeuser', name);
    sessionStorage.setItem('activshort', initials)
}

/**
 * Loads the active user from session storage.
 */
function sessionUserload() {
    user = localStorage.getItem('activeuser');
    userInitial = localStorage.getItem('activeshort');
}

/**
 * Signs a new contact by gathering contact data, initializing the contact with the first name, and saving it.
 *
 * @param {string} name - The name of the new contact.
 * @param {string} mail - The email of the new contact.
 */
async function newContactsign(name, mail) {
    let contactData = gatherContactDataSign(name, mail); //neue
    if (!contactData) return;
    firstname(contactData, false);
}

/**
 * Gathers contact data for signing a new contact.
 *
 * @param {string} name - The name of the new contact.
 * @param {string} mail - The email of the new contact.
 * @returns {Object} - Contact data.
 */
function gatherContactDataSign(name, mail) {
    let phone = "Keine Angabe";
    let color = colors[colorIndex];
    colorIndex = updateColorIndex(colorIndex);
    let contactId = newContactId();
    return { name: name, mail: mail, phone: phone, color: color, contactId: contactId }
}

/**
 * Initializes the contact with the first name and orders/saves the contacts.
 *
 * @param {Object} contactData - Contact data.
 * @param {boolean} what - Indicator for additional action.
 */
function firstname(contactData, what) {
    let firstLetter = contactData.name.charAt(0).toUpperCase();
    addToContacts(firstLetter, contactData);
    orderAndSaveContacts(what);
}

/**
 * Adds a contact to the contacts array, creating a new array if the initial letter is not present.
 *
 * @param {string} firstLetter - The initial letter of the contact's name.
 * @param {Object} contact - The contact to be added.
 */
function addToContacts(firstLetter, contact) {
    if (!contacts[firstLetter]) {
        contacts[firstLetter] = [];
    }
    contacts[firstLetter].push(contact);
}

/**
 * Orders the contacts alphabetically and saves them in the backend.
 * Optionally initializes a new contact after saving.
 *
 * @param {boolean} what - Indicator for additional action.
 */
function orderAndSaveContacts(what) {
    orderContacts(); // order the contacts with alphabet
    setElement('contacts', contacts); //save the contacts in Backend
    if (what) {
        ContactInitNew();
    }
}

/**
 * Orders the contacts alphabetically.
 */
function orderContacts() {
    // Stelle sicher, dass die globale Variable 'contacts' definiert ist / noch notwendig?
    if (typeof contacts === "undefined") {
        console.error("Die Variable 'contacts' ist nicht definiert.");
        return;
    }
    sortContactsByKey();
}

/**
 * Sorts the contacts by key and name.
 */
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

/**
 * Updates the color index, wrapping around if it reaches the end of the color array.
 *
 * @param {number} colorIndex - The current color index.
 * @returns {number} - The updated color index.
 */
function updateColorIndex(colorIndex) {
    return colorIndex === colors.length - 1 ? 0 : colorIndex + 1; //if-function to turn around
}

/**
 * Generates a new contact ID based on existing contacts.
 *
 * @returns {number} - The new contact ID.
 */
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

/**
 * Displays the dropdown menu in the header.
 */
function showDropdown() {
    docID('menu-dropdown').classList.remove('d-none');
    docID('header-user-con').onclick = null;
}

/**
 * Closes the dropdown menu in the header, re-renders the header, and renders the responsive menu.
 */
function closeDropdown() {
    docID('menu-dropdown').classList.add('d-none');
    headerRender();
    menuResponsiveRender();
}

/**
 * Prevents the default behavior of an event (e.g., closing a window).
 *
 * @param {Event} event - The triggered event.
 */
function doNotClose(event) {
    //die divs, die diese Funktion auslösen, schließen nicht das window beim onclick
    event.stopPropagation();
}

/**
 * Logs out the user by removing stored user data and redirecting to the index page.
 */
function logOut() {
    localStorage.removeItem('activeuser');
    localStorage.removeItem('activshort');
    sessionStorage.removeItem('activeuser');
    sessionStorage.removeItem('activshort');
    user = undefined;
    window.location.href = './index.html';
}