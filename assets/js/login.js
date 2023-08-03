function passChange(login, img, span, other) {
    docID(login).classList.remove('red-line');
    docID(login).classList.add('blue-line');
    docID(img).src = "./assets/img/visibility_off.svg";
    docID(other).classList.remove('red-line');
    docID(span).classList.add('d-none');
}

function passAsterik(input) {
    if (docID(input).value.length > 0) {
        docID(input).classList.add('password');
    } else {
        docID(input).classList.remove('password');
    }
}


function passOutChange(input, pass, img) {
    if(docID(input).value.length == 0) {
        docID(pass).classList.remove('blue-line');
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

