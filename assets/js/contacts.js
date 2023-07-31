let contacts = [
    {
        name: "Anton Mayer",
        mail: "antonm@gmail.com",
        phone: "+49 1111 111 11 1"
    },
    {
        name: "Anton Mayer",
        mail: "antonm@gmail.com",
        phone: "+49 1111 111 11 1"
    },
    {
        name: "Anton Mayer",
        mail: "antonm@gmail.com",
        phone: "+49 1111 111 11 1"
    }
]

function renderContacts() {
    let contact = docID('contact');
    contact.innerHTML = ''
    for (let id = 0; id < contacts.length; id++) {
        const element = contacts[id];
        let name = element['name'];
        let initials = name.replace(/[a-z]/g, '');
        initials = initials.replace(/\s/g, '');
        let mail = element['mail'];
        contact.innerHTML += /*html*/`
        <div class="contact" id="contact${id}">
        <div id="contact-sign">${initials}</div>
                   <div id="contact-data">
                       <div id="name">${name}</div>
                       <div id="mail">${mail}</div>
                   </div>
        </div>
       
   `
    }

}