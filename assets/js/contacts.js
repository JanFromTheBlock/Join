let contacts = {
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
  F: [],
  G: [],
  H: [],
  I: [],
  J: [],
  K: [],
  L: [],
  M: [],
  N: [],
  O: [],
  P: [],
  Q: [],
  R: [],
  S: [],
  T: [],
  U: [],
  V: [],
  W: [],
  X: [],
  Y: [],
  Z: [],
};

let openEditContactClicked = false;

let NumberofContacts;

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

let colorIndex = 0;


function renderContacts() {
  let contactColumn = docID("contact-column");
  resetContactPage();
  for (let index in contacts) {
    if (contacts[index].length === 0) {
      continue;
    }
    renderContactSection(index, contacts[index], contactColumn);
  }
}


function renderContactSection(index, elements, contactColumn) {
  contactColumn.innerHTML += /*html*/ `
    <div id="letter-headline">${index}</div>
    <div id="line"></div>
    <div id="contact${index}"></div>
  `;
  const contactContainer = docID("contact" + index);
  contactContainer.innerHTML = "";
  let colorIndex = 0;

  for (let id = 0; id < elements.length; id++) {
    colorIndex = updateColorIndex(colorIndex);
    renderContactItem(contactContainer, elements[id], colorIndex);
  }
}


function updateColorIndex(colorIndex) {
  return colorIndex === 7 ? 0 : colorIndex + 1;
}


function renderContactItem(container, contactData, colorIndex) {
  const { name, mail, color, contactId } = contactData;
  const initials = calculateInitials(name);
  if (contactId > NumberofContacts) {
    NumberofContacts = contactId;
  }

  const display = encodeURIComponent(JSON.stringify(contactData));
  container.innerHTML += /*html*/ `
    <div class="contact" id="contact${contactId}" onclick="onclickContact(${contactId}); renderContactDisplay('${display}')">
      <div class="contact-sign" id="contact-sign${contactId}" style="background-color: ${color}">${initials}</div>
      <div id="contact-data">
        <div id="name">${name}</div>
        <div id="mail">${mail}</div>
      </div>
    </div>
  `;
}


function calculateInitials(name) {
  const nameWords = name.split(/\s+/);
  let initials = "";
  for (const word of nameWords) {
    if (word.length > 0) {
      initials += word[0].toUpperCase();
    }
  }
  return initials;
}


function resetContactPage(){
  let contactColumn = docID("contact-column");
  NumberofContacts = 0;
  colorIndex = 0;
  contactColumn.innerHTML = "";
}


function renderContactDisplay(elementJSON) {
  if (document.body.clientWidth < 900) {
    document.getElementById("background-responsive").style.display = "block";
  }

  const element = JSON.parse(decodeURIComponent(elementJSON));

  let contactDisplay = docID("contact-display");
  let name = element.name;
  let initials = name.replace(/[a-z]/g, "");
  initials = initials.replace(/\s/g, "");
  let mail = element.mail;
  let color = element.color;
  let phone = element.phone;
  let contactId = element.contactId;
  contactDisplay.classList.remove("d-none");
  contactDisplay.innerHTML = "";
  contactDisplay.innerHTML += /*html*/ `
        <div id="contact-header">
            <div id="contact-icon">${initials}</div>
            <div id="contact-actions">
                <div id="contact-display-name">${name}</div>
                <div id="contact-imgs">
                    <div onclick="openEditContact(${contactId}, '${name}', '${mail}', '${phone}', '${color}', '${initials}')" class="contact-img"><img src="./assets/img/edit_contact.png">Edit</div>
                    <div onclick="deleteContact(${contactId})" class="contact-img"><img src="./assets/img/delete_contact.png">Delete</div>
                </div>
            </div>
            <img src="./assets/img/back_arrow.png" id = "back-arrow" onclick = "closeContactDisplay()">
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
  docID("contact-icon").style.backgroundColor = color;
}


function addNewContact() {
  docID("background-add-contact").classList.remove("d-none");
  docID("background-add-contact").innerHTML = /*html*/ `
    <div id="background-color-add-contact"></div>
    <div id="add-contact-mask" class="open-add-contact-hide d-none">
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
    `;

  let addTaskUnder = document.getElementById(`add-contact-mask`);
  addTaskUnder.classList.remove(`d-none`);
  setTimeout(() => {
    addTaskUnder.classList.remove(`open-add-contact-hide`);
  }, 100);
}


function cancelNewContact() {
  if (openEditContactClicked) {
    addTask = document.getElementById(`edit-contact-mask`);
    addTask.classList.add(`open-edit-contact-hide`);
    openEditContactClicked = false;
  }else{
     addTask = document.getElementById(`add-contact-mask`);
     addTask.classList.add(`open-add-contact-hide`);
  }
  
  animateCloseAddContact();
  emptyContactMask();
}


function animateCloseAddContact(){
  setTimeout(() => {
    addTask.classList.add(`d-none`);
    docID("background-add-contact").classList.add("d-none");
  }, 325);
}


function emptyContactMask(){
  document.getElementById(`contact-name`).value = "";
  document.getElementById(`contact-mail`).value = "";
  document.getElementById(`contact-phone`).value = "";
}


function createJsonContact(name, mail, phone) {
  const color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length; // Um den Index im Bereich der Farben zu halten
  contactId = NumberofContacts + 1;
  return {
    name: name,
    mail: mail,
    phone: phone,
    color: color,
    contactId: contactId,
  };
}


async function newContact() {
  const contactData = gatherContactData();
  if (!contactData) return;

  const { name, mail, phone } = contactData;
  const firstLetter = name.charAt(0).toUpperCase();
  const contact = createJsonContact(name, mail, phone);
  addToContacts(firstLetter, contact);
  orderAndSaveContacts();
}


function gatherContactData() {
  const name = document.getElementById('contact-name').value;
  const mail = document.getElementById('contact-mail').value;
  const phone = document.getElementById('contact-phone').value;
  return (name && mail && phone) ? { name, mail, phone } : null;
}


function addToContacts(firstLetter, contact) {
  if (!contacts[firstLetter]) {
    contacts[firstLetter] = [];
  }
  contacts[firstLetter].push(contact);
}


function orderAndSaveContacts() {
  const flatContacts = Object.values(contacts).flat();
  orderContacts();
  setElement('contacts', contacts);
  contactsInit();
  resetNewContactForm();
  contactAddedSuccesfully();
  renderContacts();
}


function resetNewContactForm(){
  docID("background-add-contact").classList.add("d-none");
    document.getElementById(`contact-name`).value = "";
    document.getElementById(`contact-mail`).value = "";
    document.getElementById(`contact-phone`).value = "";
}


function contactAddedSuccesfully(){
  let addedContactSuccesfully = document.getElementById(
    `contact-added-succesfully-animation`
  );
  addedContactSuccesfully.classList.remove(`contact-added-succesfully-hide`);
  addedContactSuccesfully.classList.add(`contact-added-succesfully`);
  setTimeout(() => {
    addedContactSuccesfully.classList.add(`contact-added-succesfully-hide`);
  }, 2000);
}


function orderContacts() {
  // Stelle sicher, dass die globale Variable 'contacts' definiert ist
  if (typeof contacts === "undefined") {
    console.error("Die Variable 'contacts' ist nicht definiert.");
    return;
  }
  sortContactsByKey();
 
}


function sortContactsByKey(){
  const sortedContacts = {};
  const sortedKeys = Object.keys(contacts).sort();
  sortedKeys.forEach((key) => {
    sortedContacts[key] = contacts[key].sort((a, b) => {
      return a.name.localeCompare(b.name); // Sortiere nach Namen
    });
  });
   // Aktualisiere die globale Variable 'contacts' mit den sortierten Kontakten
   Object.assign(contacts, sortedContacts);
   contacts = sortedContacts;
}


function deleteContact(contactId) {
  for (const letter in contacts) {
    if (contacts.hasOwnProperty(letter)) {
      const contactArray = contacts[letter];
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
  contactDisplay.classList.remove("d-none");
  contactDisplay.innerHTML = "";
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
   const clickedContainer = document.getElementById("contact" + clickedId);
   clickedContainer.style.backgroundColor = "#4589FF";
   const clickedNameElement = clickedContainer.querySelector("#name");
   const clickedMailElement = clickedContainer.querySelector("#mail");
   clickedNameElement.style.color = "white";
   clickedMailElement.style.color = "white";
}


function openEditContact(contactId, name, mail, phone, color, initials) {
  openEditContactClicked = true;
  docID("background-add-contact").classList.remove("d-none");
  docID("background-add-contact").innerHTML = /*html*/ `
         <div id="background-color-add-contact"></div>
        <div id="edit-contact-mask" class="open-edit-contact-hide d-none">
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
  let addTaskUnder = document.getElementById(`edit-contact-mask`);
  addTaskUnder.classList.remove(`d-none`);
  setTimeout(() => {
    addTaskUnder.classList.remove(`open-edit-contact-hide`);
  }, 100);
}


async function editContact(contactId) {
  const nameInput = document.getElementById("contact-name");
  const mailInput = document.getElementById("contact-mail");
  const phoneInput = document.getElementById("contact-phone");
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
  document.getElementById("background-responsive").style.display = "none";
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


function addClassIfBodyWidthLessThan900px() {
  if (document.body.clientWidth < 900) {
    var contactDisplay = document.getElementById("contact-display");
    if (!contactDisplay.classList.contains("d-none")) {
      contactDisplay.classList.add("d-none");
      docID("background-responsive").style.display = "none";
      onclickContact();
    }
  }
}
