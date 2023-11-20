/**
 * Changes the color based on the provided status and updates corresponding elements.
 *
 * @param {string} status - The status to change the color.
 */
function changeColor(status) {
    changeColorIdUrgent(docID(`urgent`), docID(`urgentLogo`), status)
    changeColorIdMedium(docID(`medium`), docID(`mediumLogo`), status)
    changeColorIdLow(docID(`low`), docID(`lowLogo`), status)
}

/**
 * Changes the color for the "Urgent" status and updates corresponding elements.
 *
 * @param {Object} urgent - The "Urgent" button element.
 * @param {Object} urgentLogo - The "Urgent" logo element.
 * @param {string} status - The status to change the color.
 */
function changeColorIdUrgent(urgent, urgentLogo, status) {
    if (status == "urgent") {
        urgent.classList.add("change-color-urgent");
        urgent.classList.add("clicked");
        urgency = "./assets/img/urgentLogo.png";
        urgentLogo.src = `./assets/img/urgentLogoWhite.png`;
        mediumLogo.src = `./assets/img/mediumLogo.png`;
        lowLogo.src = `./assets/img/lowLogo.png`;
    }
    else {
        urgent.classList.remove("change-color-urgent");
        urgent.classList.remove("clicked");
    }
}

/**
* Changes the color for the "Low" status and updates corresponding elements.
*
* @param {Object} low - The "Low" button element.
* @param {Object} lowLogo - The "Low" logo element.
* @param {string} status - The status to change the color.
*/
function changeColorIdLow(low, lowLogo, status) {
    if (status == "low") {
        low.classList.add("clicked");
        low.classList.add("change-color-low");
        urgency = "./assets/img/lowLogo.png";
        lowLogo.src = `./assets/img/lowLogoWhite.png`;
        urgentLogo.src = `./assets/img/urgentLogo.png`;
        mediumLogo.src = `./assets/img/mediumLogo.png`;
    } else {
        low.classList.remove("clicked");
        low.classList.remove("change-color-low");
    }
}

/**
* Adds a color to the category based on the provided ID.
*
* @param {string} id - The ID of the color to add.
*/
function addColorToCategory(id) {
    placeholderColorCategory = docID(`placeholderColorCategory`);
    placeholderColorCategory.src = `${id}`;
    placeholderColorCategory.classList.remove(`d-none`);
    let imgs = ['ellipsegreen.png', 'ellipseOrange.png', 'ellipseLightblue.png', 'ellipseRed.png', 'ellipseBlue.png', 'ellipseRosa.png'];
    let color = ["#2AD300", "#FF7A00", "#1FD7C1", "#FF0000", "#0038FF", "#E200BE"];
    addcolorLoop(imgs, color, id);
}

/**
 * Chooses a category based on the provided index.
 *
 * @param {number} i - The index of the category to choose.
 */
function addcolorLoop(imgs, color, id) {
    for (let i = 0; i < imgs.length; i++) {
      if (id.includes(imgs[i])) { categoryColor = color[i]; };
    }
  }