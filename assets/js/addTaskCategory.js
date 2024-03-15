/**
 * Handles the addition of a new category.
 */
function newCategory() {
    docID(`categorySelectArrow`).classList.add(`d-none`);
    docID(`editCategory`).classList.remove(`d-none`);
    docID(`showCategories`).classList.add(`d-none`);
    docID(`selectCategory`).placeholder = "New category name";
    docID(`selectCategory`).classList.remove(`hide-cursor`);
    docID(`selectCategory`).focus();
}

/**
* Pushes a new category to the categories array.
*
* @param {string} categoryColor - The color of the new category.
*/
function pushCategoryToArray(categoryColor) {
    let selectCategory = docID(`selectCategory`).value;
    let category = { name: selectCategory, color: categoryColor };

    if (!categories.includes(selectCategory)) {
        categories.push(category);
    } else {
        alert(`Ist bereits vorhanden`);
    }
}

/**
* Shows the added categories in the categories section.
*/
function showAddedCategory() {
    let showCategories = docID(`showCategories`);
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        showCategories.innerHTML += /*html*/ `<span id="savedCategory${i}" onclick="chooseCategory(${i})" class="add-task-single-priority">
      ${category[`name`]}<img src=${category["img"]}></span>`;
    }
}

/**
* Chooses a category based on the provided index.
*
* @param {number} i - The index of the category to choose.
*/
function chooseCategory(i) {
    let savedCategoryImg = docID(`savedCategory${i}`).querySelector("img");
    let placeholderColorCategory = docID("placeholderColorCategory");
    placeholderColorCategory.src = savedCategoryImg.src;
    docID(`selectCategory`).value = docID(`savedCategory${i}`).textContent;
    docID("placeholderColorCategory").classList.remove(`d-none`);
    docID(`selectCategory`).style.paddingLeft = "0";
    docID(`showCategories`).classList.add(`d-none`);
    docID(`showCategories`).classList.add(`add-task-hide-contacts`);
    categoryId = i;
}