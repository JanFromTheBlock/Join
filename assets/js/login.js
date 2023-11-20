/**
 * Changes the visual style for password input fields.
 * @param {string} login - ID of the login input field.
 * @param {string} img - ID of the image element for password visibility toggle.
 * @param {string} span - ID of the span element for error messages (optional).
 * @param {string} other - ID of another input field (optional).
 */
function passChange(login, img, span, other) {
    docID(login).classList.remove('red-line');
    docID(login).classList.add('blue-line');
    if(docID(img).src != "http://" + window.location.host + "/assets/img/visibility.svg"){
        docID(img).src = "./assets/img/visibility_off.svg";
    }
    if(other){
        docID(other).classList.remove('red-line');
    }
    if(span) {
        docID(span).classList.add('d-none');
    }
}

/**
 * Changes the visual style for password reset related elements.
 * @param {string} span - ID of the span element for error messages.
 * @param {string} other - ID of another input field.
 */
function passChangeMail(span, other) {
    docID(other).classList.remove('red-line');
    docID(span).classList.add('d-none');
}

/**
 * Adds or removes the password class based on input value and visibility.
 * @param {string} input - ID of the password input field.
 * @param {string} img - ID of the image element for password visibility toggle.
 */
function passAsterik(input, img) {
    if (docID(input).value.length > 0 && docID(img).src.includes('visibility.svg')) {
        docID(input).classList.add('password');
    } else {
        docID(input).classList.remove('password');
    }
}

/**
 * Changes the visual style when the password input loses focus.
 * @param {string} input - ID of the password input field.
 * @param {string} pass - ID of the password container element.
 * @param {string} img - ID of the image element for password visibility toggle.
 */
function passOutChange(input, pass, img) {
    docID(pass).classList.remove('blue-line');
    if(docID(input).value.length == 0) {
        docID(img).src = "./assets/img/lock-icon.svg";
        docID(input).classList.remove('password');
    }
}

/**
 * Toggles the visibility of the password and changes the visibility icon.
 * @param {string} input - ID of the password input field.
 * @param {string} img - ID of the image element for password visibility toggle.
 */
function passVisibility(input, img) {  // docID(img).src.includes(visibility.svg)
    if(docID(input).value.length > 0 && docID(input).type == "password") {
        docID(img).src = "./assets/img/visibility.svg";
        docID(input).classList.remove('password');
        docID(input).type = "text";
    } else if (docID(input).value.length == 0) {
        docID(img).src = "./assets/img/lock-icon.svg";
    } else {
        docID(img).src = "./assets/img/visibility_off.svg";
        docID(input).classList.add('password');
        docID(input).type = "password";
    }
}

/**
 * Performs login based on user input, redirects to summary.html on success.
 */
async function login() {
    let getdata = await getElement('users');
    let data = JSON.parse(getdata);
    for (let i = 0; i < data.length; i++) {
        if (data[i]['email'] == docID('email-input').value)
            if (data[i]['pass'] == docID('pass-input').value) {
                if (docID('accept-me').checked == true) {
                    localUsersave(data[i]['name']);
                    window.location.href = './summary.html';
                    return
                } else {
                    sessionUsersave(data[i]['name']);
                    window.location.href = './summary.html';
                    return
                }
            }
        if (i == data.length - 1) {
            notPassLogin();
        }
    }
}

/**
 * Displays an error message for unsuccessful login attempts.
 */
function notPassLogin() {
    docID('login-pass').classList.add('red-line');
    docID('wrong-user').classList.remove('d-none');
}

/**
 * Performs a guest login and redirects to summary.html.
 */
async function guestLogin() {
    user = "Guest";
    await sessionUsersave(user);
    window.location.href = './summary.html';
}

/**
 * Checks if the page is loaded with a 'success' parameter and displays a success message.
 */
function successCheck() {
    let variable = new URLSearchParams(window.location.search).get('key');
    console.log('function started')
    if (variable == 'success') {
        docID('signup-success-con').classList.remove('d-none');
        setTimeout(setTimeout(sendIndex, 3000))
    }
}

/**
 * Redirects to index.html.
 */
function sendIndex() {
    window.location.href = './index.html'
}

/**
 * Checks if a given email exists in the user data.
 * @param {string} variable - Email address to check.
 * @returns {boolean} - True if the email exists, false otherwise.
 */
async function checkreset(variable) {
    let array = await getElement('users');
    mailUsers = JSON.parse(array);
    for (let i = 0; i < mailUsers.length; i++) {
        if(mailUsers[i]['email'] === variable) {
            return true;
        }
    }
    return false;
}
