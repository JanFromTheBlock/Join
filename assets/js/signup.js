/**
 * Handles the process of creating a new user.
 */
async function newUser() {
    let getdata = await getElement('users');
    users = JSON.parse(getdata.replace(/'/g, "\""))
    let newName = docID('signup-name').value;
    let newEmail = docID('signup-email').value;
    let newPass = docID('signup-pass').value;
    let confirmPass = docID('signup-pass-input').value;
    if (newPass != confirmPass) {
        notMatchPass('signup-pass-confirm', 'signup-pass-con', 'not-match-span');
        return;
    }
    let newUser = {'name': newName, 'email':newEmail, 'pass': newPass, 'tel': ""};
    users.push(newUser);
    setElement('users', users);
    newContactsign(newName, newEmail);
    transition();
}

/**
 * Handles the visual changes and error messaging for non-matching passwords.
 * @param {string} login - ID of the password input field.
 * @param {string} other - ID of another input field.
 * @param {string} span - ID of the span element for error messages.
 */
function notMatchPass(login, other, span) {
    docID(login).classList.add('red-line');
    docID(login).classList.remove('blue-line');
    docID(other).classList.remove('blue-line');
    docID(span).classList.remove('d-none');
}

/**
 * Initiates a transition and displays a success message.
 */
function transition() {
    docID('signup-success-con').classList.remove('d-none');
    setTimeout(openIndex, 2000);
}

/**
 * Opens the index.html page.
 */
function openIndex() {
    window.open('../../index.html', "_self");
}