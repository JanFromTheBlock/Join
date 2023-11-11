//functional check
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

//functional check 
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