//Array für Kontakte erstellen in die später die einzelnen Kontakte reingeschoben werden können
let contacts = {
    "A":[],
    "B":[],
    "C":[],
    "D":[],
    "E":[],
    "F":[],
    "G":[],
    "H":[],
    "I":[],
    "J":[],
    "K":[],
    "L":[],
    "M":[],
    "N":[],
    "O":[],
    "P":[],
    "Q":[],
    "R":[],
    "S":[],
    "T":[],
    "U":[],
    "V":[],
    "W":[],
    "X":[],
    "Y":[],
    "Z":[],
};

let NumberofContacts;

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
            let initials = name.replace(/[a-z]/g, '');
            initials = initials.replace(/\s/g, '');
            let mail = element[id].mail;
            let color = element[id].color;
            let display = element[id];
            contact.innerHTML += /*html*/`
                <div class="contact" id="contact${id}" onclick="renderContactDisplay('${encodeURIComponent(JSON.stringify(display))}')">
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
    contactDisplay.classList.remove('d-none');
    contactDisplay.innerHTML = '';
    contactDisplay.innerHTML += /*html*/`
        <div id="contact-header">
            <div id="contact-icon">${initials}</div>
            <div id="contact-actions">
                <div id="contact-display-name">${name}</div>
                <div id="contact-imgs">
                    <div class="contact-img"><img src="./assets/img/edit_contact.png">Edit</div>
                    <div onclick="deleteContact(${NumberofContacts})" class="contact-img"><img src="./assets/img/delete_contact.png">Delete</div>
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

function addNewContact(){
    docID('background-add-contact').classList.remove('d-none')
}

function cancelNewContact(){
    docID('background-add-contact').classList.add('d-none')
}




//JSON-Vorlage wird erstellt. Dort wwird der erstellte Contact eingefügt und anschließend in das array gepushed und remote gespeichert
function createJsonContact(name, mail, phone){
    const color = 'orange';
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

        await setElement('contacts', flatContacts);
        contactsInit();
    } else {
        console.log('Name, E-Mail und Telefonnummer sind erforderlich.');
    }
}

async function loadRemoteContacts(){
    try {
        const getdataContacts = await getElement('contacts');
        const savedContacts = JSON.parse(getdataContacts);

        // Überprüfen, ob es gespeicherte Kontakte gibt
        if (Array.isArray(savedContacts)) {
            // Hier gehen wir davon aus, dass die Kontakte flach gespeichert werden
            // Wir setzen sie hier in die ursprüngliche Struktur zurück
            for (const contact of savedContacts) {
                if (contact.name && contact.mail && contact.phone) {
                    const firstLetter = contact.name.charAt(0).toUpperCase();
                    if (!contacts[firstLetter]) {
                        contacts[firstLetter] = [];
                    }
                    contacts[firstLetter].push(contact);
                }
            }
        }

        console.log('contacts:', contacts);

    } catch (error) {
        console.error('Error initializing contacts:', error);
    }  
}

function deleteContact(contactId) {
    // Durchlaufe alle Buchstaben im Kontaktdaten-Objekt
    for (const letter in contacts) {
        if (contacts.hasOwnProperty(letter)) {
            const contactArray = contacts[letter];
            
            // Durchlaufe die Kontakte im aktuellen Buchstaben-Array
            for (let i = 0; i < contactArray.length; i++) {
                if (contactArray[i].contactId === contactId) {
                    // Entferne den Kontakt aus dem Array
                    contactArray.splice(i, 1);
                    renderContacts(); // Aktualisiere die Anzeige
                    console.log('Contact deleted with contactId:', contactId);
                    return; // Beende die Funktion, da der Kontakt gefunden und gelöscht wurde
                }
            }
        }
    }
    console.log('Contact not found with contactId:', contactId);
}