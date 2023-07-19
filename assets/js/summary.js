function SummaryRender() {
    docID('summary').innerHTML = /*html*/`
        <div class="frame-69">
            <span id="greeting">Good morning,</span>
            <span id="name">Sofia Müller</span>
        </div>
        <div id="frame-66">
            <div id="frame-189">
                <div id="urgency-summary">
                    <div id="frame-187">
                        <div id="frame-188">
                            <div id="frame-63">
                                <div id="icon-circle">
                                    <div id="icon"></div>
                                </div>
                                <span id="frame-63-span">1</span>
                            </div>
                        </div>
                        <span id="frame-187-span">Tasks Urgent</span>
                    </div>
                    <div id="ver-line">
                        <svg viewBox="0 0 4 149" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2L2.00001 147" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div id="frame-68">
                        <span id="frame-68-date">October 16, 2022</span>
                        <span id="frame-68-deadline">Upcoming Deadline</span>
                    </div>
                </div>
                <div id="square-button">
                    <div id="frame-61">
                        <div id="frame-184">
                            <div class="frame-184-icon task-do-to">
                                <img src="./assets/img/ellipse 14.svg">
                            </div>
                            <span id="frame-184-span">1</span>
                        </div>
                        <span class="frame-61-span">Tasks To-do</span>
                    </div>
                </div>
            </div>
            <div id="sum-overview"></div>
        </div>
    `
}

function sumOverviewRender() {
    let lower = ["Task in <br>Board", "Task in <br>Progress", "Awaiting <br>Feedback", "Tasks <br>Done"];
    let amount = [5, 2, 2, 1]
    let img = ["sum-board", "sum-progress", "sum-awaiting", "sum-done"]
    for (let i = 0; i < 4; i++) {
        docID('sum-overview').innerHTML += /*html*/`
            <div class="square-button-V1">
                <div class="frame-61">
                    <div class="frame-184">
                        <div class="frame-184-icon ${img[i]}">
                            <img src="./assets/img/ellipse 14.svg">
                        </div>
                        <span class="frame-184-span">${amount[i]}</span>
                    </div>
                    <span class="frame-61-span">${lower[i]}</span>
                </div>
            </div>
        `        
    }
}
