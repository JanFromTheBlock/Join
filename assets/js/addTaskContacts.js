function chooseContact(i, contactName, initials, color, id, contactId) {
    let chooseBoxContact = docID(`${id}chooseBoxContact${i}`);
    const isClicked = contactStatusMap.get(i) || false; // Überprüfe den aktuellen Status des Kontakts
    if (!isClicked) {
        chooseContactIsntClicked(i, contactName, initials, color, id, contactId, chooseBoxContact);
    } else {
        deselectContact(i, contactName, color, id, contactId);
    }
}


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
  
  // add new Contact
  function addContact() {
    docID('selectContact').placeholder = "Contact email";
    docID('selectContact').classList.remove(`hide-cursor`);
    docID('selectContact').focus();
    docID(`editContact`).classList.remove(`d-none`);
    contactSelectArrow.classList.add(`d-none`);
  }
  
  
  function showAddedContact(i, initials, color, id) {
    let initialsIcon = docID(`${id}initials${id}`);
    initialsIcon.classList.remove(`d-none`);
    initialsIcon.innerHTML += `<div id="${id}taskInitials${i}" class="add-task-initials">${initials}</div>`;
    docID(id + "taskInitials" + i).style.backgroundColor = color;
  }

  function cancelContact(i, id) {
    const taskInitials = docID(`${id}taskInitials${i}`);
    if (taskInitials) {
      taskInitials.remove();
    }
  }