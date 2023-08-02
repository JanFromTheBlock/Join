async function newUser() {
    let getdata = await getElement('users');
    users = JSON.parse(getdata.replace(/'/g, "\""))
    let newName = docID('signup-name').value;
    let newEmail = docID('signup-email').value;
    let newPass = docID('signup-pass').value;
    let newUser = {'name': newName, 'email':newEmail, 'pass': newPass, 'tel': ""};
    users.push(newUser);
    // setElement('users', users);
    transition();
}

function transition() {
    docID('signup-success-con').classList.remove('d-none');
    setTimeout(openIndex, 2000);
}


function openIndex() {
    window.open('../../index.html', "_self");
}