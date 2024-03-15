/**
 * Renders the greeting message based on the current time of day and user status.
 */
function greetingNameRender() {
    let greeting = sumGreeting();
    if (user == "Guest") {
        docID("grtng-con").innerHTML = /*html*/`
        <span id="guest-name">${greeting}</span>    
        `
    } else {
        greeting += ",";
        docID("grtng-con").innerHTML = /*html*/`
        <span id="greeting">${greeting}</span>
        <span id="name">${user}</span>
    `
    }
}

/**
 * Calls functions related to rendering the big buttons and urgent date screen.
 */
function sumBigBtn() {
    urgentSquareButton();
    urgentDateScreenRender();
}

/**
 * Renders the urgent square button with the number of urgent tasks.
 */
function urgentSquareButton() {
    let urgentNr = sumAmout(
        "./assets/img/urgentLogo.png", "urgency");
    docID('sum-urgent-square').innerHTML = /*html*/`
        <div id="sum-urgent-con" class="flex-center">
            <div id="sum-urgent-con-in">
                <div id="icon-circle" class="flex-center">
                    <div id="icon"></div>
                </div>
                <span id="sum-urgent-con-in-span">${urgentNr}</span>
            </div>
        </div>
        <span id="sum-urgent-square-span">Tasks Urgent</span>
    `
}

/**
 * Renders the urgent date screen with the upcoming deadline.
 */
function urgentDateScreenRender() {
    let date = findMostUrgentDate(tasks);
    let text = "Upcoming Deadline";
    docID('urgent-date-screen').innerHTML = /*html*/`
        <span id="urgent-date-screen-date">${date}</span>
        <span id="urgent-date-screen-deadline">${text}</span>
    `
}

/**
 * Finds the most urgent date among tasks.
 * @param {Array} tasks - Array of tasks.
 * @returns {string} - The most urgent date.
 */
function findMostUrgentDate(tasks) {
    let earliestDate = null;

    for (const task of tasks) {
        const taskDate = task.date;
        if (taskDate && (earliestDate === null || taskDate < earliestDate)) {
            earliestDate = taskDate;
        }
    }

    return earliestDate;
}

/**
 * Renders the square button for a specific category.
 */
function squareButtonRender() {
    let todonr = sumAmout("1", "progress");
    docID('square-button').innerHTML = /*html*/`
        <div class="flex-center sum-board-btn-in">
            <div id="board-btn-img">
                <div class="board-btn-img-icon task-do-to">
                    <img src="./assets/img/ellipse 14.svg">
                </div>
                <span id="board-btn-img-span">${todonr}</span>
            </div>
            <span class="sum-board-btn-in-span">Tasks To-do</span>
        </div>
    `
}

/**
 * Renders the summary overview section with various categories.
 */
function sumOverviewRender() {
    let lower = ["Task in <br>Board", "Task in <br>Progress", "Awaiting <br>Feedback", "Tasks <br>Done"];
    let amount = [tasks.length, sumAmout("2", "progress"), sumAmout("3", "progress"), sumAmout("4", "progress")];
    let img = ["sum-board", "sum-progress", "sum-awaiting", "sum-done"];
    for (let i = 0; i < 4; i++) {
        docID('sum-overview').innerHTML += /*html*/`
                <a class="sum-board-btn summary-link" href="./board.html">
                    <div class="flex-center sum-board-btn-in">
                        <div class="board-btn-img">
                            <div class="board-btn-img-icon ${img[i]}">
                                <img src="./assets/img/ellipse 14.svg">
                            </div>
                            <span class="board-btn-img-span">${amount[i]}</span>
                        </div>
                        <span class="sum-board-btn-in-span">${lower[i]}</span>
                    </div>
                </a>
        `        
    }
}

/**
 * Counts the number of tasks with a specific property value.
 * @param {string} position - The property value to count.
 * @param {string} id - The property name.
 * @returns {number} - The count of tasks with the specified property value.
 */
function sumAmout(position, id){
    count = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i][id] == position) {
            count++
        }
    }
    return count
}

/**
 * Generates a greeting message based on the time of day.
 * @returns {string} - The generated greeting message.
 */
function sumGreeting() {
    date = new Date;
    hour = date.getHours();
    if(hour<5 || hour>21) {
        return "happy night"
    } else if (hour < 10) {
        return "good morning"
    } else if (hour < 14) {
        return "happy day"
    } else if (hour < 18) {
        return "good afternoon"
    } else if (hour < 22){
        return "good evening"
    }
}