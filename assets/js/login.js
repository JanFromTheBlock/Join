function passChange() {
    docID('login-pass').classList.add('blue-line');
}

function passOutChange() {
    if(docID('pass-input').value.length == 0) {
        docID('login-pass').classList.remove('blue-line');
    }
    
}