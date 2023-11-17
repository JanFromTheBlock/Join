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


function renderContactSymbol(contactArea, initials, color, id, contactIndex) {
    const contactSymbol = document.createElement("span");
    contactSymbol.className = "contacts";
    contactSymbol.style.backgroundColor = color;
    contactSymbol.textContent = initials;
    contactArea.appendChild(contactSymbol);
    contactSymbol.id = id + "span" + contactIndex;
}


function renderContactFilterArea(id) {
    const contactArea = docID("contact-area" + id);
    contactArea.innerHTML = "";
    for (let i = 0; i < tasks[id]["contact-firstname"].length; i++) {
        contactArea.innerHTML += createContactHTML(i + 1, getContactInitials(id, i));
        setContactBackgroundColor(i + 1, tasks[id]["contact-color"][i]);
    }
}

function getContactInitials(id, i) {
    const firstName = tasks[id]["contact-firstname"][i];
    const lastName = tasks[id]["contact-lastname"][i];
    const initial1 = firstName.charAt(0);
    const initial2 = lastName.charAt(0);
    return (initial1 + initial2).toUpperCase();
}

function createContactHTML(k, initials) {
    return `<span class="contacts" id="contacts${k}">${initials}</span>`;
}


function setContactBackgroundColor(k, color) {
    docID("contacts" + k).style.backgroundColor = color;
}


function renderContactInitials(id, contactID) {
    let firstName = tasks[id]["contact-firstname"][contactID];
    let lastName = tasks[id]["contact-lastname"][contactID];
    let initials = firstName.charAt(0) + lastName.charAt(0);
    let initialsUpper = initials.toLocaleUpperCase();
    return renderContactInitialsHTML(contactID, initialsUpper, firstName, lastName);
}


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


function renderContactsToWindow(id) {
    docID("window-contact-area").innerHTML = "";

    for (let contactID = 0; contactID < tasks[id]["contact-firstname"].length; contactID++) {
        const contactHtml = renderContactInitials(id, contactID);
        docID("window-contact-area").insertAdjacentHTML("beforeend", contactHtml);
        docID("initials" + contactID).style.backgroundColor = tasks[id]["contact-color"][contactID];
    }
}


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