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


function passChangeMail(span, other) {
    docID(other).classList.remove('red-line');
    docID(span).classList.add('d-none');
}


function passAsterik(input, img) {
    if (docID(input).value.length > 0 && docID(img).src != "http://" + window.location.host + "/assets/img/visibility.svg") {
        docID(input).classList.add('password');
    } else {
        docID(input).classList.remove('password');
    }
}


function passOutChange(input, pass, img) {
    docID(pass).classList.remove('blue-line');
    if(docID(input).value.length == 0) {
        docID(img).src = "./assets/img/lock-icon.svg";
        docID(input).classList.remove('password');
    }
}


function passVisibility(input, img) {
    if(docID(input).value.length > 0 && docID(img).src != "http://" + window.location.host + "/assets/img/visibility.svg") {
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


function notPassLogin() {
    docID('login-pass').classList.add('red-line');
    docID('wrong-user').classList.remove('d-none');
}


function guestLogin() {
    user = "Guest"
    window.location.href = './summary.html'
}


function successCheck() {
    let variable = new URLSearchParams(window.location.search).get('key');
    console.log('function started')
    if (variable == 'success') {
        docID('signup-success-con').classList.remove('d-none');
        setTimeout(setTimeout(sendIndex, 3000))
    }
}


function sendIndex() {
    window.location.href = './index.html'
}


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
