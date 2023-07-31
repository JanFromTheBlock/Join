let contacts = {
    "A": [
        {
            name: "Anton Mayer",
            mail: "antonm@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "orange"
        },
        {
            name: "Anton Mayer",
            mail: "antonm@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "orange"
        }
    ],
    "B": [
        {
            name: "Bnton Mayer",
            mail: "antonm@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "orange"
        }
    ],
    "F": [
        {
            name: "Fnton Mayer",
            mail: "antonm@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "orange"
        }
    ]
}

function renderContacts() {
    let contactColumn = docID('contact-column');
    let NumberofContacts = 0;
    contactColumn.innerHTML = '';

    // Durchlaufe alle Buchstaben in contacts
    for (let index in contacts) {
        const element = contacts[index];
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
                    <div class="contact-img"><img src="./assets/img/delete_contact.png">Delete</div>
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
}
