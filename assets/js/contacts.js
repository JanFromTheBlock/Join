//Array für Kontakte erstellen in die später die einzelnen Kontakte reingeschoben werden können
let contacts = {
    "A": [],
    "B": [],
    "C": [],
    "D": [],
    "E": [],
    "F": [],
    "G": [],
    "H": [],
    "I": [],
    "J": [],
    "K": [],
    "L": [],
    "M": [],
    "N": [],
    "O": [],
    "P": [],
    "Q": [],
    "R": [],
    "S": [],
    "T": [],
    "U": [],
    "V": [],
    "W": [],
    "X": [],
    "Y": [],
    "Z": [],
};

let NumberofContacts;
const colors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646'];
let colorIndex = 0;

function renderContacts() {
    let contactColumn = docID('contact-column');
    NumberofContacts = 0;
    contactColumn.innerHTML = '';


    // Durchlaufe alle Buchstaben in contacts
    for (let index in contacts) {
        const element = contacts[index];

        // Prüfe, ob das Array für den aktuellen Buchstaben leer ist
        if (element.length === 0) {
            continue; // Überspringe leere Buchstaben
        }

        contactColumn.innerHTML += /*html*/`
            <div id="letter-headline">${index}</div>
            <div id="line"></div>
            <div id="contact${index}"></div>
        `;

        let contact = docID('contact' + index);
        contact.innerHTML = '';
        // Durchlaufe alle Kontakte für den aktuellen Buchstaben
        for (let id = 0; id < element.length; id++) {
            NumberofContacts++;
            const name = element[id].name;
            const nameWords = name.split(/\s+/);

            // Initialen berechnen
            let initials = "";
            for (const word of nameWords) {
                if (word.length > 0) {
                    initials += word[0].toUpperCase();
                }
            }
            let mail = element[id].mail;
            let color = element[id].color;
            let contactId = element[id].contactId;
            let display = element[id];
            contact.innerHTML += /*html*/`
                <div class="contact" id="contact${contactId}" onclick="onclickContact(${contactId}); renderContactDisplay('${encodeURIComponent(JSON.stringify(display))}')">
                    <div class="contact-sign" id="contact-sign${NumberofContacts}">${initials}</div>
                    <div id="contact-data">
                        <div id="name">${name}</div>
                        <div id="mail">${mail}</div>
                    </div>
                </div>
            `;
            docID('contact-sign' + NumberofContacts).style.backgroundColor = color;
        }
    }
}

function renderContactDisplay(elementJSON) {
    const element = JSON.parse(decodeURIComponent(elementJSON));

    let contactDisplay = docID('contact-display');
    let name = element.name;
    let initials = name.replace(/[a-z]/g, '');
    initials = initials.replace(/\s/g, '');
    let mail = element.mail;
    let color = element.color;
    let phone = element.phone;
    let contactId = element.contactId;
    contactDisplay.classList.remove('d-none');
    contactDisplay.innerHTML = '';
    contactDisplay.innerHTML += /*html*/`
        <div id="contact-header">
            <div id="contact-icon">${initials}</div>
            <div id="contact-actions">
                <div id="contact-display-name">${name}</div>
                <div id="contact-imgs">
                    <div class="contact-img"><img src="./assets/img/edit_contact.png">Edit</div>
                    <div onclick="deleteContact(${contactId})" class="contact-img"><img src="./assets/img/delete_contact.png">Delete</div>
                </div>
            </div>
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
    docID('contact-icon').style.backgroundColor = color;
}

function addNewContact() {
    docID('background-add-contact').classList.remove('d-none')

    let addTaskUnder = document.getElementById(`add-contact-mask`);
    addTaskUnder.classList.remove(`d-none`);
    setTimeout(() => {
        addTaskUnder.classList.remove(`open-add-contact-hide`);
    }, 100);

}

function cancelNewContact() {
    docID('background-add-contact').classList.add('d-none')

    let addTask = document.getElementById(`add-contact-mask`);
    addTask.classList.add(`open-add-contact-hide`);
    setTimeout(() => {
        addTask.classList.add(`d-none`);
    }, 325);
    document.getElementById(`contact-name`).value = '';
    document.getElementById(`contact-mail`).value = '';
    document.getElementById(`contact-phone`).value = '';

}




//JSON-Vorlage wird erstellt. Dort wwird der erstellte Contact eingefügt und anschließend in das array gepushed und remote gespeichert
function createJsonContact(name, mail, phone) {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length; // Um den Index im Bereich der Farben zu halten
    contactId = NumberofContacts + 1;
    return {
        name: name,
        mail: mail,
        phone: phone,
        color: color,
        contactId: contactId
    };

}

//Neuen Kontakt erstellen. Die Infos werden aus dem Formular gezogen und anschließend in das JSON-Gerüst gepackt. 

async function newContact() {
    let name = document.getElementById(`contact-name`).value;
    let mail = document.getElementById(`contact-mail`).value;
    let phone = document.getElementById(`contact-phone`).value;

    if (name && mail && phone) {
        let firstLetter = name.charAt(0).toUpperCase(); // Ersten Buchstaben in Großbuchstaben umwandeln
        let contact = createJsonContact(name, mail, phone);

        // Überprüfen, ob das Array für den Anfangsbuchstaben bereits existiert
        if (!contacts[firstLetter]) {
            contacts[firstLetter] = []; // Erstellen eines leeren Arrays, falls es nicht existiert
        }

        contacts[firstLetter].push(contact); // Hier wird der Kontakt dem entsprechenden Array im contacts-Objekt hinzugefügt

        // Flache Liste nur mit neuem Kontakt erstellen
        let flatContacts = [];

        for (let letter in contacts) {
            flatContacts = flatContacts.concat(contacts[letter]);
        }

        console.log('contacts:', contacts); // Überprüfen, ob das contacts-Objekt richtig aktualisiert wird
        console.log('flatContacts:', flatContacts); // Überprüfen, ob der flache Kontakt-Array richtig erstellt wird

        orderContacts();
        await setElement('contacts', contacts);
        contactsInit();
        docID('background-add-contact').classList.add('d-none');
        document.getElementById(`contact-name`).value = '';
        document.getElementById(`contact-mail`).value = '';
        document.getElementById(`contact-phone`).value = '';

        let addedContactSuccesfully = document.getElementById(`contact-added-succesfully-animation`);
        addedContactSuccesfully.classList.remove(`contact-added-succesfully-hide`);
        addedContactSuccesfully.classList.add(`contact-added-succesfully`);

        setTimeout(() => {
            addedContactSuccesfully.classList.add(`contact-added-succesfully-hide`);
        }, 2000);
    } else {
        console.log('Name, E-Mail und Telefonnummer sind erforderlich.');
    }
}
function orderContacts() {
    // Stelle sicher, dass die globale Variable 'contacts' definiert ist
    if (typeof contacts === 'undefined') {
        console.error("Die Variable 'contacts' ist nicht definiert.");
        return;
    }

    // Sortiere die Kontakte nach ihren Schlüsseln (Buchstaben)
    const sortedContacts = {};
    const sortedKeys = Object.keys(contacts).sort();

    sortedKeys.forEach(key => {
        sortedContacts[key] = contacts[key].sort((a, b) => {
            return a.name.localeCompare(b.name); // Sortiere nach Namen
        });
    });

    // Aktualisiere die globale Variable 'contacts' mit den sortierten Kontakten
    Object.assign(contacts, sortedContacts);
    contacts = sortedContacts;
}


async function deleteContact(contactId) {
    // Durchlaufe alle Buchstaben im Kontaktdaten-Objekt
    for (const letter in contacts) {
        if (contacts.hasOwnProperty(letter)) {
            const contactArray = contacts[letter];

            // Durchlaufe die Kontakte im aktuellen Buchstaben-Array
            for (let i = 0; i < contactArray.length; i++) {
                if (contactArray[i].contactId === contactId) {
                    // Entferne den Kontakt aus dem Array
                    contactArray.splice(i, 1);
                    await setElement('contacts', contacts);
                    renderContacts(); // Aktualisiere die Anzeige
                    console.log('Contact deleted with contactId:', contactId);
                    let contactDisplay = docID('contact-display');
                    contactDisplay.classList.remove('d-none');
                    contactDisplay.innerHTML = '';
                    return; // Beende die Funktion, da der Kontakt gefunden und gelöscht wurde
                }
            }
        }
    }
    console.log('Contact not found with contactId:', contactId);
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
    // Setze die Hintergrundfarbe und Schriftfarbe zurück für alle Kontakt-Container
    const contactContainers = document.querySelectorAll('.contact');
    contactContainers.forEach(container => {
        container.style.backgroundColor = '';
        const nameElement = container.querySelector('#name');
        const mailElement = container.querySelector('#mail');
        nameElement.style.color = '';
        mailElement.style.color = '';
    });

    // Setze die Hintergrundfarbe und Schriftfarbe für das angeklickte Element
    const clickedContainer = document.getElementById('contact' + clickedId);
    clickedContainer.style.backgroundColor = '#4589FF';
    const clickedNameElement = clickedContainer.querySelector('#name');
    const clickedMailElement = clickedContainer.querySelector('#mail');
    clickedNameElement.style.color = 'white';
    clickedMailElement.style.color = 'white';
}