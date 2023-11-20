/**
 * Function to calculate initials from a name.
 * @param {string} name - The name of the contact.
 * @returns {string} The calculated initials.
 */
function calculateInitials(name) {
  let initials = name.replace(/[a-z]/g, "").replace(/\s/g, "");
  return initials[0] + initials.slice(-1);
}

/**
 * Function to reset the contact page.
 */
function resetContactPage() {
  colorIndex = 0;
  docID("contact-column").innerHTML = "";
}

/**
 * Function to add a new contact.
 */
function addNewContact() {
  docID("background-add-contact").classList.remove("d-none");
  docID("background-add-contact").innerHTML = addNewContactHTML();
  docID(`add-contact-mask`).classList.remove(`d-none`);
  setTimeout(() => {
    docID(`add-contact-mask`).classList.remove(`open-contact-hide`);
  }, 100);
}

/**
 * Function to cancel adding a new contact.
 */
function cancelNewContact() {
  if (docID(`add-contact-mask`) === null) {
    docID(`edit-contact-mask`).classList.add(`open-contact-hide`)
  } else {
    docID(`add-contact-mask`).classList.add(`open-contact-hide`);
  }
  animateCloseAddContact();
  emptyContactMask();
}


/**
 * Function to animate the closing of the add contact background.
 */
function animateCloseAddContact() {
  setTimeout(() => {
    docID("background-add-contact").classList.add("d-none");
  }, 325);
}

/**
 * Function to empty the contact form.
 */
function emptyContactMask() {
  docID(`contact-name`).value = "";
  docID(`contact-mail`).value = "";
  docID(`contact-phone`).value = "";
}

/**
 * Function to handle the creation of a new contact.
 */
async function newContact() {
  let contactData = gatherContactData();
  if (!contactData) return;
  firstname(contactData, true);
  ContactInitNew();
}

/**
 * Function to gather contact data from the contact form.
 * @returns {Object | null} Object with contact data or null if data is incomplete.
 */
function gatherContactData() {
  let name = docID('contact-name').value;
  let mail = docID('contact-mail').value;
  let phone = docID('contact-phone').value;
  let color = colors[colorIndex];
  colorIndex = updateColorIndex(colorIndex);
  let contactId = newContactId();
  return (name && mail && phone) ? { name: name, mail: mail, phone: phone, color: color, contactId: contactId } : null;
}

/**
 * Function to initialize a new contact.
 */
function ContactInitNew() {
  contactsInit();
  resetNewContactForm();
  contactAddedSuccesfully();
}

/**
 * Function to reset the new contact form.
 */
function resetNewContactForm() {
  docID("background-add-contact").classList.add("d-none");
  docID(`contact-name`).value = "";
  docID(`contact-mail`).value = "";
  docID(`contact-phone`).value = "";
}

/**
 * Function to display a success message when a contact is added.
 */
function contactAddedSuccesfully() {
  let succesfully = docID(`contact-added-succesfully-animation`); // variablennamen kürzen
  succesfully.classList.remove(`contact-added-succesfully-hide`);
  succesfully.classList.add(`contact-added-succesfully`);
  setTimeout(() => {
    succesfully.classList.add(`contact-added-succesfully-hide`);
  }, 2000);
}

/**
 * Function to delete a contact.
 * @param {string} contactId - The unique identifier of the contact to be deleted.
 */
function deleteContact(contactId) {
  for (let letter in contacts) {
    if (contacts.hasOwnProperty(letter)) {
      let contactArray = contacts[letter];
      for (let i = 0; i < contactArray.length; i++) {
        if (contactArray[i].contactId === contactId) {
          removeContact(contactArray, i);
          return;
        }
      }
    }
  }
  console.log("Contact not found with contactId:", contactId);
}

/**
 * Function to remove a contact from the contacts array.
 * @param {Array} contactArray - The array of contacts.
 * @param {number} index - The index of the contact to be removed.
 */
async function removeContact(contactArray, index) {
  contactArray.splice(index, 1);
  await setElement("contacts", contacts);
  renderContacts();
  const contactDisplay = docID("contact-display");
  contactDisplay.classList.add("d-none");
  contactDisplay.innerHTML = "";
  docID("background-responsive").style.display = "none";
}

/**
 * Function to change the border color of an input element.
 * @param {HTMLElement} input - The input element.
 */
function changeBorderColor(input) {
  var inputOutside = input.parentNode;
  inputOutside.style.borderBottomColor = "#4086FF";
}

/**
 * Function to reset the border color of an input element.
 * @param {HTMLElement} input - The input element.
 */
function resetBorderColor(input) {
  var inputOutside = input.parentNode;
  inputOutside.style.borderBottomColor = "#D1D1D1";
}

/**
 * Function to handle the click event on a contact.
 * @param {string} clickedId - The ID of the clicked contact.
 */
function onclickContact(clickedId) {
  resetColorOfAllContactContainer()
  setColorOfSelectedContact(clickedId)
}

/**
 * Function to reset the color of all contact containers.
 */
function resetColorOfAllContactContainer() {
  const contactContainers = document.querySelectorAll(".contact");
  contactContainers.forEach((container) => {
    container.style.backgroundColor = "";
    const nameElement = container.querySelector("#name");
    const mailElement = container.querySelector("#mail");
    nameElement.style.color = "";
    mailElement.style.color = "";
  });
}

/**
 * Function to set the color of the selected contact.
 * @param {string} clickedId - The ID of the clicked contact.
 */
function setColorOfSelectedContact(clickedId) {
  if (typeof clickedId !== 'undefined') {
    const clickedContainer = docID("contact" + clickedId);
    clickedContainer.style.backgroundColor = "#4589FF";
    const clickedNameElement = clickedContainer.querySelector("#name");
    const clickedMailElement = clickedContainer.querySelector("#mail");
    clickedNameElement.style.color = "white";
    clickedMailElement.style.color = "white";
  }
}

/**
 * Function to open the edit contact form.
 * @param {string} contactId - The unique identifier of the contact to be edited.
 * @param {string} name - The name of the contact.
 * @param {string} mail - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} color - The color associated with the contact.
 * @param {string} initials - The initials of the contact.
 */
function openEditContact(contactId, name, mail, phone, color, initials) {
  docID("background-add-contact").classList.remove("d-none");
  openEditContactHTML(contactId, initials);
  fillInputs(name, mail, phone, color);
  animateOpenContactMask();
  closeContactDisplay();
}

/**
 * Function to fill input fields with contact data for editing.
 * @param {string} name - The name of the contact.
 * @param {string} mail - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} color - The color associated with the contact.
 */
function fillInputs(name, mail, phone, color) {
  docID("contact-name").value = name;
  docID("contact-mail").value = mail;
  docID("contact-phone").value = phone;
  docID("edit-contact-icon").style.backgroundColor = color;
  docID("create").style.marginRight = "24px";
  docID("create").style.marginLeft = "24px";
}

/**
 * Function to animate the opening of the contact edit mask.
 */
function animateOpenContactMask() {
  docID(`edit-contact-mask`).classList.remove(`d-none`);
  setTimeout(() => {
    docID(`edit-contact-mask`).classList.remove(`open-edit-contact-hide`);
  }, 100);
}

/**
 * Function to edit a contact.
 * @param {string} contactId - The unique identifier of the contact to be edited.
 */
async function editContact(contactId) {
  const nameInput = docID("contact-name");
  const mailInput = docID("contact-mail");
  const phoneInput = docID("contact-phone");
  const name = nameInput.value;
  const mail = mailInput.value;
  const phone = phoneInput.value;
  const { foundContact, oldKey } = findContactByKey(contactId);
  if (!foundContact) {
    console.log("Contact not found with contactId:", contactId);
    return;
  }
  updateContactValues(foundContact, name, mail, phone);
  moveContactToNewKey(oldKey, name.charAt(0).toUpperCase(), foundContact);
  orderContacts();
  await updateContactsData();
  resetContactForm(nameInput, mailInput, phoneInput);
  hideAddContactBackground();
}

/**
 * Function to find a contact by its unique identifier.
 * @param {string} contactId - The unique identifier of the contact to be found.
 * @returns {Object} - Object containing the found contact and the old key.
 */
function findContactByKey(contactId) {
  let oldKey = null;
  let foundContact = null;

  for (const key in contacts) {
    const contactArray = contacts[key];
    foundContact = contactArray.find(contact => contact.contactId === contactId);

    if (foundContact) {
      oldKey = key;
      break;
    }
  }

  return { foundContact, oldKey };
}

/**
 * Function to update contact values with new information.
 * @param {Object} contact - The contact object to be updated.
 * @param {string} name - The updated name of the contact.
 * @param {string} mail - The updated email address of the contact.
 * @param {string} phone - The updated phone number of the contact.
 */
function updateContactValues(contact, name, mail, phone) {
  contact.name = name;
  contact.mail = mail;
  contact.phone = phone;
}

/**
 * Function to move a contact to a new key in the contacts array.
 * @param {string} oldKey - The old key of the contact.
 * @param {string} newKey - The new key for the contact.
 * @param {Object} foundContact - The contact object to be moved.
 */
function moveContactToNewKey(oldKey, newKey, foundContact) {
  if (newKey !== oldKey) {
    contacts[newKey] = contacts[newKey] || [];
    contacts[newKey].push(contacts[oldKey].splice(contacts[oldKey].indexOf(foundContact), 1)[0]);

    if (contacts[oldKey].length === 0) {
      delete contacts[oldKey];
    }
  }
}

/**
 * Function to update contacts data after editing.
 */
async function updateContactsData() {
  await setElement("contacts", contacts);
  contactsInit();
}

/**
 * Function to reset the contact form after editing.
 * @param {HTMLElement} nameInput - The input field for the contact name.
 * @param {HTMLElement} mailInput - The input field for the contact email.
 * @param {HTMLElement} phoneInput - The input field for the contact phone number.
 */
function resetContactForm(nameInput, mailInput, phoneInput) {
  nameInput.value = "";
  mailInput.value = "";
  phoneInput.value = "";
}

/**
 * Function to hide the add contact background.
 */
function hideAddContactBackground() {
  docID("background-add-contact").classList.add("d-none");
}

/**
 * Function to close the contact display.
 */
function closeContactDisplay() {
  docID("contact-display").innerHTML = "";
  docID("background-responsive").style.display = "none";
  const contactContainers = document.querySelectorAll(".contact");
  contactContainers.forEach((container) => {
    container.style.backgroundColor = "";
    const nameElement = container.querySelector("#name");
    const mailElement = container.querySelector("#mail");
    nameElement.style.color = "";
    mailElement.style.color = "";
  });
}

window.addEventListener("resize", addClassIfBodyWidthLessThan900px);

/**
 * Function to add a class if the body width is less than 900px.
 */
function addClassIfBodyWidthLessThan900px() {
  if (document.body.clientWidth < 900) {
    var contactDisplay = docID("contact-display");
    if (!contactDisplay.classList.contains("d-none")) {
      contactDisplay.classList.add("d-none");
      docID("background-responsive").style.display = "none";
      onclickContact();
    }
  }
}

/**
 * Function to validate a phone number input.
 * @param {HTMLElement} phoneInput - The input field for the phone number.
 */
function validatePhoneNumber(phoneInput) {
  phoneInput.value = phoneInput.value.replace(/[^0-9+/ ]/g, '');
}