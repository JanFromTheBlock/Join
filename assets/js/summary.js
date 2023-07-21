function SummaryRender() {
    docID('summary').innerHTML = /*html*/`
        <div id="grtng-con"></div>
        <div id="summary-con">
            <div id="summary-con-upper">
                <div id="urgency-summary">
                    <div id="sum-urgent-square"></div>
                    <div id="ver-line">
                        <svg viewBox="0 0 4 149" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2L2.00001 147" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div id="urgent-date-screen"></div>
                </div>
                <div id="square-button"></div>
            </div>
            <div id="sum-overview"></div>
        </div>
    `
}


function greetingNameRender() {
    let greeting = "Good morning";
    let name = "Sofia Müller";

    docID("grtng-con").innerHTML = /*html*/`
        <span id="greeting">${greeting},</span>
        <span id="name">${name}</span>
    `
}


function sumBigBtn() {
    urgentSquareButton();
    urgentDateScreenRender();
}


function urgentSquareButton() {
    let urgentNr = 1;
    docID('sum-urgent-square').innerHTML = /*html*/`
        <div id="sum-urgent-con">
            <div id="sum-urgent-con-in">
                <div id="icon-circle">
                    <div id="icon"></div>
                </div>
                <span id="sum-urgent-con-in-span">${urgentNr}</span>
            </div>
        </div>
        <span id="sum-urgent-square-span">Tasks Urgent</span>
    `
}


function urgentDateScreenRender() {
    let date = "October 16, 2022";
    let text = "Upcoming Deadline";
    docID('urgent-date-screen').innerHTML = /*html*/`
        <span id="urgent-date-screen-date">${date}</span>
        <span id="urgent-date-screen-deadline">${text}</span>
    `
}


function squareButtonRender() {
    let todonr = 1;
    docID('square-button').innerHTML = /*html*/`
        <div id="sum-board-btn-in">
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


function sumOverviewRender() {
    let lower = ["Task in <br>Board", "Task in <br>Progress", "Awaiting <br>Feedback", "Tasks <br>Done"];
    let amount = [5, 2, 2, 1];
    let img = ["sum-board", "sum-progress", "sum-awaiting", "sum-done"];
    for (let i = 0; i < 4; i++) {
        docID('sum-overview').innerHTML += /*html*/`
            <div class="sum-board-btn">
                <div class="sum-board-btn-in">
                    <div class="board-btn-img">
                        <div class="board-btn-img-icon ${img[i]}">
                            <img src="./assets/img/ellipse 14.svg">
                        </div>
                        <span class="board-btn-img-span">${amount[i]}</span>
                    </div>
                    <span class="sum-board-btn-in-span">${lower[i]}</span>
                </div>
            </div>
        `        
    }
}
