/**
 * Hides specific elements on the page.
 * Elements are identified by their IDs and have the 'd-none' class added to hide them.
 */
function hideElements(){
    document.getElementById('menu-summary').classList.add('d-none');
    document.getElementById('menu-board').classList.add('d-none');
    document.getElementById('menu-add').classList.add('d-none');
    document.getElementById('menu-contacts').classList.add('d-none');
    document.getElementById('header-user-con').classList.add('d-none');
    document.getElementById('header-help').classList.add('d-none');
    docID('legal-notice').classList.add("topic-active");
}

/**
 * Restores the visibility of hidden elements on the page.
 * Elements are identified by their IDs and have the 'd-none' class removed to show them.
 */
function leavePage(){
    document.getElementById('menu-summary').classList.remove('d-none');
    document.getElementById('menu-board').classList.remove('d-none');
    document.getElementById('menu-add').classList.remove('d-none');
    document.getElementById('menu-contacts').classList.remove('d-none');
    document.getElementById('header-user-con').classList.remove('d-none');
    document.getElementById('header-help').classList.remove('d-none');
    docID('legal-notice').classList.add("topic-active");
}

/**
 * Opens the legal notice topic, making it active.
 * Removes the "topic-active" class from the private policy element.
 */
function openLegalNotice(){
    docID('private-policy').classList.remove("topic-active");
    docID('legal-notice').classList.add("topic-active");
}

/**
 * Opens the private policy topic, making it active.
 * Removes the "topic-active" class from the legal notice element.
 */
function openPrivatePolicy(){
    docID('legal-notice').classList.remove("topic-active");
    docID('private-policy').classList.add("topic-active");
}