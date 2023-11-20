/**
 * Handles the selection or deselection of a contact.
 *
 * @param {number} i - The index of the contact.
 * @param {string} contactName - The name of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} color - The color associated with the contact.
 * @param {string} id - The ID associated with the contact.
 * @param {number} contactId - The unique ID of the contact.
 */
function chooseContact(i, contactName, initials, color, id, contactId) {
  let chooseBoxContact = docID(`${id}chooseBoxContact${i}`);
  const isClicked = contactStatusMap.get(i) || false; // Überprüfe den aktuellen Status des Kontakts
  if (!isClicked) {
    chooseContactIsntClicked(i, contactName, initials, color, id, contactId, chooseBoxContact);
  } else {
    deselectContact(i, contactName, color, id, contactId);
  }
}

/**
 * Handles the selection of a contact when it is not clicked.
 *
 * @param {number} i - The index of the contact.
 * @param {string} contactName - The name of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} color - The color associated with the contact.
 * @param {string} id - The ID associated with the contact.
 * @param {Object} chooseBoxContact - The DOM element representing the contact's selection box.
 */
function chooseContactIsntClicked(i, contactName, initials, color, id, contactId, chooseBoxContact) {
  let parentDiv = chooseBoxContact.parentElement;
  chooseBoxContact.src = "./assets/img/checkButtonContact.png";
  contactStatusMap.set(i, true);
  showAddedContact(i, initials, color, id);
  parentDiv.classList.add("add-task-select-contact-activate");
  numberOfContactsToAdd.push(contactName); // Füge den Kontakt zum Array numberOfContactsToAdd hinzu
  numberOfColorsToAdd.push(color);
  numberOfIdsToAdd.push(contactId);
}

/**
 * Handles the deselection of a contact.
 *
 * @param {number} i - The index of the contact.
 * @param {string} contactName - The name of the contact.
 * @param {string} color - The color associated with the contact.
 * @param {string} id - The ID associated with the contact.
 * @param {number} contactId - The unique ID of the contact.
 */
function deselectContact(i, contactName, color, id, contactId) {
  let chooseBoxContact = docID(`${id}chooseBoxContact${i}`);
  let parentDiv = chooseBoxContact.parentElement;
  chooseBoxContact.src = "./assets/img/logoChooseContact.png";
  contactStatusMap.set(i, false);
  cancelContact(i, id);
  parentDiv.classList.remove("add-task-select-contact-activate");
  let index = numberOfContactsToAdd.indexOf(contactName); // Entferne den Kontakt aus den Arrays
  let indexcol = numberOfColorsToAdd.indexOf(color);
  let indexid = numberOfIdsToAdd.indexOf(contactId);
  deselectIndexCheck(index, indexcol, indexid);
}

/**
 * Checks and removes the specified index from arrays if found.
 *
 * @param {number} index - The index to remove from arrays.
 * @param {number} indexcol - The index of the color to remove from arrays.
 * @param {number} indexid - The index of the ID to remove from arrays.
 */
function deselectIndexCheck(index, indexcol, indexid) {
  if (index !== -1) {
    numberOfContactsToAdd.splice(index, 1);
  }
  if (indexcol !== -1) {
    numberOfColorsToAdd.splice(indexcol, 1);
  }
  if (indexid !== -1) {
    numberOfIdsToAdd.splice(indexid, 1);
  }
}

/**
 * Adds a new contact by updating the placeholder and focus of the contact input.
 */
function addContact() {
  docID('selectContact').placeholder = "Contact email";
  docID('selectContact').classList.remove(`hide-cursor`);
  docID('selectContact').focus();
  docID(`editContact`).classList.remove(`d-none`);
  contactSelectArrow.classList.add(`d-none`);
}

/**
* Displays the added contact in the contact section.
*
* @param {number} i - The index of the contact.
* @param {string} initials - The initials of the contact.
* @param {string} color - The color associated with the contact.
* @param {string} id - The ID associated with the contact.
*/
function showAddedContact(i, initials, color, id) {
  let initialsIcon = docID(`${id}initials${id}`);
  initialsIcon.classList.remove(`d-none`);
  initialsIcon.innerHTML += `<div id="${id}taskInitials${i}" class="add-task-initials">${initials}</div>`;
  docID(id + "taskInitials" + i).style.backgroundColor = color;
}

/**
* Cancels the display of a contact.
*
* @param {number} i - The index of the contact.
* @param {string} id - The ID associated with the contact.
*/
function cancelContact(i, id) {
  const taskInitials = docID(`${id}taskInitials${i}`);
  if (taskInitials) {
    taskInitials.remove();
  }
}