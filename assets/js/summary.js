function SummaryRender() {
    docID('summary').innerHTML = /*html*/`
        <div id="grtng-con"></div>
        <div id="summary-con">
            <div id="summary-con-upper">
                    <a id="urgency-summary" class="summary-link" href="./board.html">
                        <div id="sum-urgent-square"></div>
                        <div id="ver-line">
                            <svg viewBox="0 0 4 149" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 2L2.00001 147" stroke-width="3" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div id="urgent-date-screen"></div>
                    </a>
                    <a id="square-button" class="summary-link" href="./board.html"></a>
            </div>
            <div id="sum-overview"></div>
        </div>
    `
}


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


function sumBigBtn() {
    urgentSquareButton();
    urgentDateScreenRender();
}


function urgentSquareButton() {
    let urgentNr = sumAmout("urgent", "urgency");
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
    let todonr = sumAmout("1", "progress");
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
    let amount = [tasks.length, sumAmout("2", "progress"), sumAmout("3", "progress"), sumAmout("4", "progress")];
    let img = ["sum-board", "sum-progress", "sum-awaiting", "sum-done"];
    for (let i = 0; i < 4; i++) {
        docID('sum-overview').innerHTML += /*html*/`
                <a class="sum-board-btn summary-link" href="./board.html">
                    <div class="sum-board-btn-in">
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


function sumAmout(position, id){
    count = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i][id] == position) {
            count++
        }
    }
    return count
}

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


    console.log(hour);
}