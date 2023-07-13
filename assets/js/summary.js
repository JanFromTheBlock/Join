function SummaryRender() {
    docID('summary').innerHTML = /*html*/`
        <div id="greeting" class="greeting">
            <span id="greet-time">Good morning, </span>
            <span id="greet-name">Sofia Müller</span>
        </div>
        <div id="overview" class="overview">
            <div id="sum-important" class="sum-important">
                <div id="ov-urgent" class="ov-urgent">
                    <div id="sum-urgent" class="sum-urgent">
                        <div id="sum-urgent-symbol" class="sum-urgent-symbol">
                            <img  src="./assets/img/sum_task.png">
                            <span id="sum-task-nr">1</span>
                        </div>
                        <span class="sum-urgent-text">Task Urgent</span>
                    </div>
                    <div class="ver-line"><svg xmlns="http://www.w3.org/2000/svg" width="4" height="149" viewBox="0 0 4 149" fill="none">
                        <path d="M2 2L2.00001 147" stroke="white" stroke-width="3" stroke-linecap="round"/>
                      </svg></div>
                    <div id="sum-urgent-date" class="sum-urgent-date">
                        <span id="sum-urgent-day">October 16, 2022</span>
                        <span id="sum-urgent-text">Upcoming Deadline</span>
                    </div>
                </div>
                <div id="ov-to-do" class="sum-out-con">
                    <div class="sum-in-con light-blue">
                        <div class="sum-in-upper">
                            <img id="sum-in-upper-img" class="sum-in-upper-img" src="./assets/img/sum_task_do_to.png">
                            <span class="sum-in-upper-img-nr">1</span>
                        </div>
                        <span class="sum-in-lower">Task To-do</span>
                    </div>
                </div>
            </div>
            <div id="sum-overview" class="sum-overview">
            </div>
        </div>
    `
}

function sumOverviewRender() {
    let lower = ["Task in Board", "Task in Progress", "Awaiting Feedback", "Tasks <br>Done"];
    let amount = [5, 2, 2, 1]
    for (let i = 0; i < 4; i++) {
        docID('sum-overview').innerHTML += /*html*/`
            <div class="sum-in-con">
                <div class="sum-in-upper">
                    <img id="sum-in-upper-img" class="sum-in-upper-img" src="./assets/img/sum_task_do_to.png">
                    <span class="sum-in-upper-img-nr">${amount[i]}</span>
                </div>
                <span class="sum-in-lower">${lower[i]}</span>
            </div>
        `        
    }
}