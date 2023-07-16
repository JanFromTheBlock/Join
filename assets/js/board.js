function addBoardRender(){
    let taskArea = docID('task-area')
    taskArea.innerHTML = ''
    taskArea.innerHTML += /*html*/`
    <div class="task-body">
                <div class="task-body-flex">
                    <span>To do</span>
                    <img src="./assets/img/board_plus.png">
                </div>
                <div id="task">
                    <div id="task-category">Design</div>
                    <div id="task-title">Website redesign</div>
                    <div id="task-description">Modify the contents of the main website ...</div>
                    <div id="task-footer">
                        <div id="contact-area">
                            <span class="contacts">SM</span>
                            <span class="contacts">MV</span>
                            <span class="contacts">EF</span>
                        </div>
                        <img id="contact-area-img" src="./assets/img/lowLogo.png">
                    </div>
                    
                </div>
            </div>
            <div class="task-body">
                <div class="task-body-flex">
                    <span>In progress</span>
                    <img src="./assets/img/board_plus.png">
                </div>
                <div>
                    Test
                </div>
            </div>
            <div class="task-body">
                <div class="task-body-flex">
                    <span>Await feedback</span>
                    <img src="./assets/img/board_plus.png">
                </div>
                <div>
                    Test
                </div>
            </div>
            <div class="task-body">
                <div class="task-body-flex">
                    <span>Done</span>
                </div>
                <div>
                    Test
                </div>
            </div>
    `
    }