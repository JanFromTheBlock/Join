function addBoardRender() {
    docID('task1').innerHTML = '';
    docID('task2').innerHTML = '';
    docID('task3').innerHTML = '';
    docID('task4').innerHTML = '';
    for (let id = 0; id < tasks.length; id++) {
        const task = tasks[id];
        let j = tasks[id]["progress"];
        let taskBody = docID('task' + j);
        taskBody.innerHTML += /*html*/`
                    
                    <div id="task" class="task-decoration">
                        <div id="task-category">${tasks[0]['category']}</div>
                        <div id="task-title">${tasks[0]['title']}</div>
                        <div id="task-description">${tasks[0]['description']}</div>
                        <div id="task-footer">
                            <div id="contact-area">
                                <span class="contacts">SM</span>
                                <span class="contacts">MV</span>
                                <span class="contacts">EF</span>
                            </div>
                            <img id="contact-area-img" src="./assets/img/lowLogo.png">
                        </div>
                        
                    </div>
        `
    }


}