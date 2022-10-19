/* 변수 및 배열 선언 */
let taskInput = document.getElementById('task_input');
let addButton = document.getElementById('add_button');
let taskList = [];
let tabs = document.querySelectorAll('.task_tabs div');
let mode = 'all';
let filterList = [];
// console.log(taskInput)
// console.log(addButton)
// console.log(tabs)

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) {
        filter(event);
    });
}

/* 이벤트 추가 */
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        addTask(event);
    }
});

/* 함수 선언 */
// addTask() - 할일 추가하기
function addTask() {
    let taskValue = taskInput.value;
    let task = {
        id: randomIDGenerate(),
        taskContent: taskValue,
        isComplete: false,
    };
    // let taskContent=taskInput.value;
    // console.log(taskContent)
    taskList.push(task);
    // taskList.push(taskContent)
    console.log(taskList);
    taskInput.value = '';
    render();
}
// render() - 할일(taskList)표시
function render() {
    let resultHTML = '';
    let list = [];
    if (mode == 'all') {
        list = taskList;
    } else {
        list = filterList;
    }
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            resultHTML += `<div class="task task-done" id="${list[i].id}">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            </div>`;
        } else {
            resultHTML += `<div class="task" id="${list[i].id}">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            </div>`;
        }
        // font awesome 사이트에서 css걸고 <button class="check" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button> 이런식으로 바꾸기
    }

    document.getElementById('task_board').innerHTML = resultHTML;
}

// toggleComplete() - check 버튼 누르면 isComplete를 true로 바꿔줌
function toggleComplete(id) {
    // console.log(id)
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            // true면 false, false면 true
            break;
        }
    }
    // console.log(taskList)
    filter();
}

// deleteTask()- delete버튼 누르면 삭제하기
function deleteTask(id) {
    // console.log(id)
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    console.log(taskList);
    filter();
}

// filter() - 탭에 따른 리스트 변화
function filter(event) {
    // console.log('체크',event.target.id)
    // event.target 어떤 것을 클릭했는지 알 수 있음
    if (event) {
        mode = event.target.id;
        document.getElementById('under_line').style.width = event.target.offsetWidth + 'px';
        // offset-width -> css일때 사용, script에서 -불가능 / offsetWidth -> script 문서로 넘어올때 카멜로 표기
        document.getElementById('under_line').style.top = '75px';
        document.getElementById('under_line').style.left = event.target.offsetLeft + 'px';
    }
    filterList = [];
    if (mode === 'ongoing') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        // taskList=filterList -> taskList가 변해서 모두가 바뀌는 것임 덮어쓰기 X
    } else if (mode === 'done') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
    // console.log(filterList)
}

// randomIDGenerate - id값 주기 > 항상 마지막에 넣기
function randomIDGenerate() {
    return Math.random().toString(36).substr(2, 16);
}
