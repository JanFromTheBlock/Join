//kay check
function renderContacts() {
  resetContactPage(); //set contact-Colum to "" und Number and Index to 0
  for (let i in contacts) {
    if (contacts[i].length === 0) { //if no contact inside do not render, skip it
      continue;
    }
    renderContactSection(i); //start the function for render the Names in the contactlist
  }
}


function renderContactSection(index) {
  docID("contact-column").innerHTML += renderContactSectionHTML(index); //render the HTML for the letters
  docID("contact" + index).innerHTML = ""; //clear the contactitem section before render
  for (let id = 0; id < contacts[index].length; id++) { //for loop to upate the color and the function for the contacts
    colorIndex = updateColorIndex(colorIndex); //update for the number of the color
    renderContactItem(index, id); //start the function to create the contactitems
  }
}

//Kay check - HTML part for renderContactSection(index)
function renderContactSectionHTML(index) {
  return /*html*/ `
    <div id="letter-headline">${index}</div>
    <div id="line"></div>
    <div id="contact${index}"></div>
  `
}

//kay -check
function renderContactItem(index, id) {
  const { name, mail, color, contactId } = contacts[index][id]; //save the data in variables
  const initials = calculateInitials(name); // start function to return the Initials

  docID("contact" + index).innerHTML += renderContactItemHTML(contactId, index, color, initials, name, mail, id); //start function to render the HTML code
}

//function check
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

//function check - wie klappt das bei 2 Vornamen?
function calculateInitials(name) {
  let initials = name.replace(/[a-z]/g, "").replace(/\s/g, "");
  return initials[0] + initials.slice(-1);
}


//kay -check
function resetContactPage(){
  colorIndex = 0;
  docID("contact-column").innerHTML = "";
}


function renderContactDisplay(index, id) {
  //sollte das nicht übers CSS gelöst werden?
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

//functional check
function addNewContact() {
  docID("background-add-contact").classList.remove("d-none");
  docID("background-add-contact").innerHTML = addNewContactHTML();
  docID(`add-contact-mask`).classList.remove(`d-none`);
  setTimeout(() => {
    docID(`add-contact-mask`).classList.remove(`open-contact-hide`);
  }, 100);
}

//functional check
function addNewContactHTML() {
  return /*html*/ `
  <div id="background-color-add-contact"></div>
  <div id="add-contact-mask" class="open-contact-hide d-none">
      <div id="add-contact-header">
          <div id="add-contact-ow"><img onclick="cancelNewContact()" src="./assets/img/close_contact.png"></div>
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
              <div class="input-outside"><input id="contact-mail" class="input" required type="text" placeholder="Email" onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"><img src="./assets/img/mail.png" ></div>
              <div class="input-outside"><input id="contact-phone" class="input" required type="text" placeholder="Phone" onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"><img src="./assets/img/call.png"></div>
              <div id="contact-buttons">
                  <button id="contact-cancel" onclick="cancelNewContact()"><span id="cancel">Cancel</span> <div id="x-button">x</div></button>
                  <button id="contact-create" type="submit"><span id="create">Create contact </span><img src="./assets/img/contact-check.png"></button>
              </div>
          </form>
      </div>
  </div>
  `
}

//functional check
function cancelNewContact() {
  if (docID(`add-contact-mask`) === null) { // check if edit or add
    docID(`edit-contact-mask`).classList.add(`open-contact-hide`)
  }else {
    docID(`add-contact-mask`).classList.add(`open-contact-hide`);
  }
  animateCloseAddContact();  //function to close background with delay 
  emptyContactMask(); // function to clear the value of the contact add masked
}

//kay checked
function animateCloseAddContact(){
  setTimeout(() => {
    docID("background-add-contact").classList.add("d-none");
  }, 325);
}

//function checked
function emptyContactMask(){
  docID(`contact-name`).value = "";
  docID(`contact-mail`).value = "";
  docID(`contact-phone`).value = "";
}


// Kay check-
async function newContact() {
  let contactData = gatherContactData();
  if (!contactData) return;
  firstname(contactData, true); //+ variable true
}

// Kay check - 
function gatherContactData() {
  let name = docID('contact-name').value;
  let mail = docID('contact-mail').value;
  let phone = docID('contact-phone').value;
  let color = colors[colorIndex];
  colorIndex = updateColorIndex(colorIndex);
  let contactId = newContactId();
  return (name && mail && phone) ? { name: name, mail: mail, phone: phone, color: color, contactId: contactId } : null;
}

function ContactInitNew() {
  contactsInit(); // restart contact-page
  resetNewContactForm(); //close the contact-page and clear the values
  contactAddedSuccesfully(); //the pop up sign
}

//function check
function resetNewContactForm(){
  docID("background-add-contact").classList.add("d-none");
  docID(`contact-name`).value = "";
  docID(`contact-mail`).value = "";
  docID(`contact-phone`).value = "";
}

//funtion check
function contactAddedSuccesfully() {
  let succesfully = docID(`contact-added-succesfully-animation`); // variablennamen kürzen
  succesfully.classList.remove(`contact-added-succesfully-hide`);
  succesfully.classList.add(`contact-added-succesfully`);
  setTimeout(() => {
    succesfully.classList.add(`contact-added-succesfully-hide`);
  }, 2000);
}


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


async function removeContact(contactArray, index) {
  contactArray.splice(index, 1);
  await setElement("contacts", contacts);
  renderContacts();
  const contactDisplay = docID("contact-display");
  contactDisplay.classList.add("d-none");
  contactDisplay.innerHTML = "";
  docID("background-responsive").style.display = "none";
}


function changeBorderColor(input) {
  var inputOutside = input.parentNode;
  inputOutside.style.borderBottomColor = "#4086FF";
}


function resetBorderColor(input) {
  var inputOutside = input.parentNode;
  inputOutside.style.borderBottomColor = "#D1D1D1";
}


function onclickContact(clickedId) {
  resetColorOfAllContactContainer()
  setColorOfSelectedContact(clickedId)
}

//reset color for before clicked person
function resetColorOfAllContactContainer(){
  const contactContainers = document.querySelectorAll(".contact");
  contactContainers.forEach((container) => {
    container.style.backgroundColor = "";
    const nameElement = container.querySelector("#name");
    const mailElement = container.querySelector("#mail");
    nameElement.style.color = "";
    mailElement.style.color = "";
  });
}


function setColorOfSelectedContact(clickedId){
  const clickedContainer = docID("contact" + clickedId);
  clickedContainer.style.backgroundColor = "#4589FF";
  const clickedNameElement = clickedContainer.querySelector("#name");
  const clickedMailElement = clickedContainer.querySelector("#mail");
  clickedNameElement.style.color = "white";
  clickedMailElement.style.color = "white";
}


function openEditContact(contactId, name, mail, phone, color, initials) {
  docID("background-add-contact").classList.remove("d-none");
  docID("background-add-contact").innerHTML = /*html*/ `
         <div id="background-color-add-contact"></div>
        <div id="edit-contact-mask" class="open-contact-hide d-none">
            <div id="edit-contact-header">
                <div id="add-contact-ow"><img onclick="cancelNewContact()" src="./assets/img/close_contact.png"></div>
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
                    <div class="input-outside"><input id="contact-mail" class="input" required type="text" placeholder="Email" onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"><img src="./assets/img/mail.png" ></div>
                    <div class="input-outside"><input id="contact-phone" class="input" required type="text" placeholder="Phone" onfocus="changeBorderColor(this)" onblur="resetBorderColor(this)"><img src="./assets/img/call.png"></div>
                    <div id="contact-buttons">
                        <button id="contact-cancel" onclick="deleteContact(${contactId})"><span id="cancel">Delete</span> <div id="x-button">x</div></button>
                        <button id="contact-create" type="submit"><span id="create">Save </span><img src="./assets/img/contact-check.png"></button>
                    </div>
                </form>
            </div>
        </div>
    `;
  fillInputs(name, mail, phone, color);
  animateOpenContactMask();
}




function fillInputs(name, mail, phone, color){
  docID("contact-name").value = name;
  docID("contact-mail").value = mail;
  docID("contact-phone").value = phone;
  docID("edit-contact-icon").style.backgroundColor = color;
  docID("create").style.marginRight = "24px";
  docID("create").style.marginLeft = "24px";
}


function animateOpenContactMask(){
  docID(`edit-contact-mask`).classList.remove(`d-none`);
  setTimeout(() => {
    docID(`edit-contact-mask`).classList.remove(`open-contact-hide`);
  }, 100);
}


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


function updateContactValues(contact, name, mail, phone) {
  contact.name = name;
  contact.mail = mail;
  contact.phone = phone;
}


function moveContactToNewKey(oldKey, newKey, foundContact) {
  if (newKey !== oldKey) {
    contacts[newKey] = contacts[newKey] || [];
    contacts[newKey].push(contacts[oldKey].splice(contacts[oldKey].indexOf(foundContact), 1)[0]);

    if (contacts[oldKey].length === 0) {
      delete contacts[oldKey];
    }
  }
}


async function updateContactsData() {
  await setElement("contacts", contacts);
  contactsInit();
}


function resetContactForm(nameInput, mailInput, phoneInput) {
  nameInput.value = "";
  mailInput.value = "";
  phoneInput.value = "";
}


function hideAddContactBackground() {
  docID("background-add-contact").classList.add("d-none");
}


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
// window.addEventListener("resize", addClassIfBodyWidthLessThan900px);


// function addClassIfBodyWidthLessThan900px() {
//   if (document.body.clientWidth < 900) {
//     var contactDisplay = docID("contact-display");
//     if (!contactDisplay.classList.contains("d-none")) {
//       contactDisplay.classList.add("d-none");
//       docID("background-responsive").style.display = "none";
//       onclickContact(); // fehlt die Id - Was ist das Ziel?
//     }
//   }
// }