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
            contact.innerHTML += /*html*/`
                <div class="contact" id="contact${id}">
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