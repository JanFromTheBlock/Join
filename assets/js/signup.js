async function newUser() {
    let getdata = await getElement('users');
    users = JSON.parse(getdata.replace(/'/g, "\""))
    let newName = docID('signup-name').value;
    let newEmail = docID('signup-email').value;
    let newPass = docID('signup-pass').value;
    let confirmPass = docID('signup-pass-input').value;
    if (newPass != confirmPass) {
        notMatchPass('signup-pass-confirm', 'sigup-pass-con', 'not-match-span');
        return;
    }
    let newUser = {'name': newName, 'email':newEmail, 'pass': newPass, 'tel': ""};
    users.push(newUser);
    setElement('users', users);
    newContactsign(newName, newEmail);
    transition();
}



function notMatchPass(login, other, span) {
    docID(login).classList.add('red-line');
    docID(login).classList.remove('blue-line');
    docID(other).classList.remove('blue-line');
    docID(span).classList.remove('d-none');
}

function transition() {
    docID('signup-success-con').classList.remove('d-none');
    setTimeout(openIndex, 2000);
}


function openIndex() {
    window.open('../../index.html', "_self");
}