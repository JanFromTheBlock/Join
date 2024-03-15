/**
 * Function to generate HTML for adding a new contact.
 * @returns {string} - HTML markup for the new contact form.
 */
function addNewContactHTML() {
    return /*html*/ `
    <div id="background-color-add-contact"></div>
    <div id="add-contact-mask" class="open-contact-hide d-none">
        <div id="add-contact-header">
            <div id="add-contact-ow"><img onclick="cancelNewContact()" class="cursor-pointer" src="./assets/img/close_contact.png"></div>
            <div id="add-contact-center">
                <img id="add-contact-logo" src="./assets/img/contact_logo.png">
                <div id="add-contact-title">Add contact</div>
                <div id="add-contact-subtitle">Tasks are better with a team!</div>
            </div>
        </div>
        <div id="add-contact-body">
            <img id="add-contact-icon" src="./assets/img/contact_icon.png">
            <form onsubmit="newContact(); return false">
                <div class="input-outside"><input id="contact-name" class="input" required type="text" placeholder="Name" onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"><img src="./assets/img/person.png" ></div>
                <div class="input-outside"><input id="contact-mail" class="input" required type="email" placeholder="Email" onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"><img src="./assets/img/mail.png" ></div>
                <div class="input-outside"><input id="contact-phone" class="input" required type="tel" placeholder="Phone" onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)" oninput="validatePhoneNumber(this)"><img src="./assets/img/call.png"></div>
                <div id="contact-buttons">
                    <button id="contact-cancel" onclick="cancelNewContact()"><span id="cancel">Cancel</span> <div id="x-button">x</div></button>
                    <button id="contact-create" type="submit"><span id="create">Create contact </span><img src="./assets/img/contact-check.png"></button>
                </div>
            </form>
        </div>
    </div>
    `
}

/**
 * Function to open the HTML for editing a contact.
 * @param {string} contactId - The unique identifier of the contact to be edited.
 * @param {string} initials - The initials of the contact.
 */
function openEditContactHTML(contactId, initials) {
    docID("background-add-contact").innerHTML = /*html*/ `
           <div id="background-color-add-contact"></div>
          <div id="edit-contact-mask" class="open-edit-contact-hide d-none">
              <div id="edit-contact-header">
                  <div id="add-contact-ow"><img onclick="cancelNewContact()" class="cursor-pointer" src="./assets/img/close_contact.png"></div>
                  <div id="add-contact-center">
                      <img id="add-contact-logo" src="./assets/img/contact_logo.png">
                      <div id="add-contact-title">Edit contact</div>
                      <div id="add-contact-subtitle">Tasks are bett with a team!</div>
                  </div>
              </div>
              <div id="add-contact-body">
                  <div id = 'edit-contact-icon'>${initials}</div>
                  <form onsubmit="editContact(${contactId}); return false">
                      <div class="input-outside"><input id="contact-name" class="input" required type="text" placeholder="Name" onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"><img src="./assets/img/person.png" ></div>
                      <div class="input-outside"><input id="contact-mail" class="input" required type="email" placeholder="Email" onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"><img src="./assets/img/mail.png" ></div>
                      <div class="input-outside"><input id="contact-phone" class="input" required type="tel" placeholder="Phone" onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)" oninput="validatePhoneNumber(this)"><img src="./assets/img/call.png" ></div>
                      <div id="contact-buttons">
                          <button id="contact-cancel" onclick="deleteContact(${contactId})"><span id="cancel">Delete</span> <div id="x-button">x</div></button>
                          <button id="contact-create" type="submit"><span id="create">Save </span><img src="./assets/img/contact-check.png"></button>
                      </div>
                  </form>
              </div>
          </div>
      `;
}

/**
 * Function to render HTML for displaying contact details.
 * @param {string} initials - The initials of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} contactId - The unique identifier of the contact.
 * @param {string} mail - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} color - The color associated with the contact.
 * @returns {string} - HTML markup for displaying contact details.
 */
function renderContactDisplayHTML(initials, name, contactId, mail, phone, color) {
    return /*html*/ `
      <div id="contact-header">
          <div id="contact-icon">${initials}</div>
          <div id="contact-actions">
              <div id="contact-display-name">${name}</div>
              <div id="contact-imgs">
                  <div onclick="openEditContact(${contactId}, '${name}', '${mail}', '${phone}', '${color}', '${initials}')" class="contact-img"><img src="./assets/img/edit_contact.png">Edit</div>
                  <div onclick="deleteContact(${contactId})" class="contact-img"><img src="./assets/img/delete_contact.png">Delete</div>
              </div>
          </div>
          <img src="./assets/img/back_arrow.png" id= "back-arrow" onclick = "closeContactDisplay()">
      </div>
      <div id="contact-body">
          <div id="contact-information">Contact Information</div>
          <div id="contact-mail-phone">
              <div id="contact-mail">
                  <span id="contact-mail-title">E-Mail</span>
                  <span id="contact-mail-adress">${mail}</span>
              </div>
              <div id="contact-phone">
                  <span id="contact-phone-title">Phone</span>
                  <span id="contact-phone-number">${phone}</span>
              </div>
          </div>
      </div>
      `;
}

/**
* Function to render a specific contact section.
* @param {string} index - The index of the contact section.
*/
function renderContactSection(index) {
    docID("contact-column").innerHTML += renderContactSectionHTML(index);
    docID("contact" + index).innerHTML = "";
    for (let id = 0; id < contacts[index].length; id++) {
        colorIndex = updateColorIndex(colorIndex);
        renderContactItem(index, id);
    }
}


/**
* Function to render the contact page.
*/
function renderContacts() {
    resetContactPage();
    for (let i in contacts) {
        if (contacts[i].length === 0) {
            continue;
        }
        renderContactSection(i);
    }
}

/**
 * Function to render the HTML code for a contact section.
 * @param {string} index - The index of the contact section.
 * @returns {string} HTML code for the contact section.
 */
function renderContactSectionHTML(index) {
    return /*html*/ `
      <div id="letter-headline">${index}</div>
      <div id="line"></div>
      <div id="contact${index}"></div>
    `
}


/**
 * Function to render the HTML code for a contact item.
 * @param {string} index - The index of the contact section.
 * @param {number} id - The ID of the contact item.
 */
function renderContactItem(index, id) {
    const { name, mail, color, contactId } = contacts[index][id];
    const initials = calculateInitials(name);
    docID("contact" + index).innerHTML += renderContactItemHTML(contactId, index, color, initials, name, mail, id); //start function to render the HTML code
}


/**
* Function to render the HTML code for a contact item.
* @param {number} contactId - The ID of the contact.
* @param {string} index - The index of the contact section.
* @param {string} color - The color associated with the contact.
* @param {string} initials - The initials of the contact.
* @param {string} name - The name of the contact.
* @param {string} mail - The email of the contact.
* @param {number} id - The ID of the contact item.
* @returns {string} HTML code for the contact item.
*/
function renderContactItemHTML(contactId, index, color, initials, name, mail, id) {
    return /*html*/ ` 
      <div class="contact" id="contact${contactId}" onclick="onclickContact(${contactId}); renderContactDisplay('${index}', ${id})">
        <div class="contact-sign" id="contact-sign${contactId}" style="background-color: ${color}">${initials}</div>
        <div id="contact-data">
          <div id="name">${name}</div>
          <div id="mail">${mail}</div>
        </div>
      </div>
    `
}

/**
 * Function to render the contact display.
 * @param {string} index - The index of the contact section.
 * @param {number} id - The ID of the contact item.
 */
function renderContactDisplay(index, id) {
    if (document.body.clientWidth < 900) {
      docID("background-responsive").style.display = "block";
    }
    let element = contacts[index][id];
    let name = element.name;
    let initials = calculateInitials(name);
    docID("contact-display").classList.remove("d-none");
    docID("contact-display").innerHTML = "";
    docID("contact-display").innerHTML += renderContactDisplayHTML(initials, name, element.contactId, element.mail, element.phone, element.color)
    docID("contact-icon").style.backgroundColor = element.color;
  }
  