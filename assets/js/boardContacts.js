/**
 * Function to render the contact area for a task on the board.
 * @param {Object} task - The task object containing contact information.
 * @param {number} id - The ID of the task.
 */
function renderContactArea(task, id) {
    let contactArea = docID("contact-area" + id);
    contactArea.innerHTML = "";
    for (let contactIndex = 0; contactIndex < task["contact-firstname"].length && contactIndex < 4; contactIndex++) { //Kontaktsymbole werden nur bis zum 3. Kontakt normal gerendert. WEnn ein vierter Kontakt gerendert werden soll, wird der Textinhalt des 3. Kontakticons mit "+${Anzahl weiterer Kontakte}" gefüllt, damit nicht unendlich Kontakte gerendert werden können. Der Renderprozess endet anschließend
        if (contactIndex == 3) {
            let furtherContacts = task["contact-firstname"].length - 2;
            docID(id + 'span2').innerHTML = /*html*/` + ${furtherContacts}`
        } else {
            let firstName = task["contact-firstname"][contactIndex];
            let lastName = task["contact-lastname"][contactIndex];
            let initials = getInitialsTask(firstName, lastName);
            let color = task["contact-color"][contactIndex];
            renderContactSymbol(contactArea, initials, color, id, contactIndex);
        }
    }
}

/**
 * Function to render a contact symbol within the contact area.
 * @param {HTMLElement} contactArea - The element representing the contact area.
 * @param {string} initials - The initials of the contact.
 * @param {string} color - The color associated with the contact.
 * @param {number} id - The ID of the task.
 * @param {number} contactIndex - The index of the contact.
 */
function renderContactSymbol(contactArea, initials, color, id, contactIndex) {
    const contactSymbol = document.createElement("span");
    contactSymbol.className = "contacts";
    contactSymbol.style.backgroundColor = color;
    contactSymbol.textContent = initials;
    contactArea.appendChild(contactSymbol);
    contactSymbol.id = id + "span" + contactIndex;
}

/**
 * Function to render the contact filter area for a task.
 * @param {number} id - The ID of the task.
 */
function renderContactFilterArea(id) {
    const contactArea = docID("contact-area" + id);
    contactArea.innerHTML = "";
    for (let i = 0; i < tasks[id]["contact-firstname"].length && i < 4; i++) {
        if (i == 3) {
            let furtherContacts = tasks[id]["contact-firstname"].length - 2;
            docID(id + 'span3').innerHTML = /*html*/` + ${furtherContacts}`
        } else {
            contactArea.innerHTML += createContactHTML(i + 1, getContactInitials(id, i), id);
            setContactBackgroundColor(i + 1, tasks[id]["contact-color"][i], id);
        }
    }
}

/**
 * Function to get the initials of a contact.
 * @param {number} id - The ID of the task.
 * @param {number} i - The index of the contact.
 * @returns {string} The initials of the contact.
 */
function getContactInitials(id, i) {
    const firstName = tasks[id]["contact-firstname"][i];
    const lastName = tasks[id]["contact-lastname"][i];
    const initial1 = firstName.charAt(0);
    const initial2 = lastName.charAt(0);
    return (initial1 + initial2).toUpperCase();
}

/**
 * Function to create HTML for a contact within the filter area.
 * @param {number} k - The index of the contact.
 * @param {string} initials - The initials of the contact.
 * @returns {string} HTML code for the contact.
 */
function createContactHTML(k, initials, id) {
    return `<span class="contacts" id="${id}span${k}">${initials}</span>`;
}

/**
 * Function to set the background color of a contact in the filter area.
 * @param {number} k - The index of the contact.
 * @param {string} color - The color associated with the contact.
 */
function setContactBackgroundColor(k, color, id) {
    docID(id + "span" + k).style.backgroundColor = color;
}

/**
 * Function to render the initials and name of a contact within the task window.
 * @param {number} id - The ID of the task.
 * @param {number} contactID - The ID of the contact.
 * @returns {string} HTML code for rendering the initials and name of a contact.
 */
function renderContactInitials(id, contactID) {
    let firstName = tasks[id]["contact-firstname"][contactID];
    let lastName = tasks[id]["contact-lastname"][contactID];
    let initials = firstName.charAt(0) + lastName.charAt(0);
    let initialsUpper = initials.toLocaleUpperCase();
    return renderContactInitialsHTML(contactID, initialsUpper, firstName, lastName);
}

/**
 * Function to render HTML for the initials and name of a contact within the task window.
 * @param {number} contactID - The ID of the contact.
 * @param {string} initialsUpper - The uppercase initials of the contact.
 * @param {string} firstName - The first name of the contact.
 * @param {string} lastName - The last name of the contact.
 * @returns {string} HTML code for rendering the initials and name of a contact.
 */
function renderContactInitialsHTML(contactID, initialsUpper, firstName, lastName) {
    return /*html*/ `
      <div id="window-contact-area-inside">
          <div class="initials" id="initials${contactID}">${initialsUpper}</div>
          <div class="name-contact">
              <div>${firstName}</div>
              <div>${lastName}</div>
          </div>
      </div>`
}


/**
 * Function to render contacts within the task window.
 * @param {number} id - The ID of the task.
 */
function renderContactsToWindow(id) {
    docID("window-contact-area").innerHTML = "";

    for (let contactID = 0; contactID < tasks[id]["contact-firstname"].length; contactID++) {
        const contactHtml = renderContactInitials(id, contactID);
        docID("window-contact-area").insertAdjacentHTML("beforeend", contactHtml);
        docID("initials" + contactID).style.backgroundColor = tasks[id]["contact-color"][contactID];
    }
}

/**
 * Function to set the contacts for a task when loading task details.
 * @param {Array} contactIds - An array of contact IDs associated with the task.
 */
function setTaskContacts(contactIds) {
    docID("selectContact").click();
    for (let i = 0; i < contactIds.length; i++) {
        const elementId = `0and${contactIds[i]}`;
        const element = docID(elementId);
        if (element) {
            element.click();

        }
    }
    docID("selectContact").click();
}

/**
 * Function to safely store contacts associated with a task.
 */
function safeContactsInTask() {
    for (let i = 0; i < numberOfContactsToAdd.length; i++) {
        let contactDiv = numberOfContactsToAdd[i];
        const [firstNames, lastNames] = contactDiv.split(" ");
        const contactcolor = numberOfColorsToAdd[i];
        const contactid = numberOfIdsToAdd[i];
        firstName.push(firstNames);
        lastName.push(lastNames);
        contactcolors.push(contactcolor);
        contactIds.push(contactid);
    }
}