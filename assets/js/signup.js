async function newUser() {
    users = await getUser('users');
    let newName = docID('signup-name').value;
    let newEmail = docID('signup-email').value;
    let newPass = docID('signup-pass').value;

    console.log(users);
    console.log(newName);
    console.log(newEmail);
    console.log(newPass);

    let newUser = {'name': newName, 'email':newEmail, 'pass': newPass, 'tel': ""};
    console.log(newUser);
    users.append(newUser);
    console.log(users);
}

