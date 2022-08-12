
let task = []

let i = 0, totalTask = task.length, pandingTask = 0;

let user = {
    userlevel: 0,
    userpoint: 0,
    studiedTime: 0,
    taskcompleted: 0
}

let levelnum = document.getElementById("levelnum")
let maintaskcompleted = document.getElementById("maintaskcompleted")
let totalstudied = document.getElementById("totalstudied")

function addItem() {
    let toDoList = document.getElementById("myList");
    let addNewTask = document.getElementById("addNewTask");
    let addNewTaskValue = document.getElementById("addNewTask").value;

    if (addNewTaskValue != "") {
        let x = {
            name: document.getElementById("addNewTask").value,
            isDone: false,
            taskId: "task" + i,
            paraId: "para" + i
        }

        task.push(x)

        console.table(task)

        chnageInHTML()
    }

    else {
        alert("Please Enter Real Task");
    }

    if (task.length > 4) {
        document.getElementById("mainBox").classList.add("scroll")
    }
}

function howMuckDone() {
    let y = 0
    task.forEach(element => {
        if (element.isDone == false) {
            y++;
        }
    });

    return y
}

function chnageInHTML() {
    let toDoList = document.getElementById("myList");
    let addNewTask = document.getElementById("addNewTask");
    let addNewTaskValue = document.getElementById("addNewTask").value;
    let li = document.createElement("li");
    let para = document.createElement("p");
    let button = document.createElement("button");

    li.setAttribute('id', addNewTask.value);

    li.appendChild(para);
    li.appendChild(button);

    para.appendChild(document.createTextNode(addNewTask.value));
    button.appendChild(document.createTextNode("X"));

    toDoList.appendChild(li);

    li.id = "task" + i;

    para.classList.add("nameTask");
    para.id = "para" + i;
    para.onclick = function () { doneItem(this.id) };

    button.classList.add("btnTask");
    button.id = "button" + i;
    button.onclick = function () { removeItem(li.id) };

    i++

    pandingTask = howMuckDone()
    totalTask = task.length

    document.getElementById("pandingTask").innerHTML = howMuckDone();

    document.getElementById("totalTask").innerHTML = task.length;

    document.getElementById("addNewTask").value = "";
}

function doneItem(idName) {
    if (document.getElementById(idName).style.textDecoration != "line-through") {
        document.getElementById(idName).style.textDecoration = "line-through";

        task.forEach(element => {
            if (element.paraId == idName) {
                element.isDone = true
            }
        });

        console.table(task)

        pandingTask = howMuckDone()
        totalTask = task.length

        document.getElementById("pandingTask").innerHTML = howMuckDone();

        maintaskcompleted.innerHTML = ++user.taskcompleted
        user.userpoint += 2
        updateProgressBar()
    }
}

function removeItem(liIdName) {
    document.getElementById(liIdName).style.display = "none";

    for (let j = 0; j < task.length; j++) {
        if (task[j].taskId == liIdName) {
            task.splice(j, 1)
        }
    }

    console.table(task)
    pandingTask = howMuckDone()
    totalTask = task.length

    document.getElementById("pandingTask").innerHTML = howMuckDone();

    document.getElementById("totalTask").innerHTML = task.length;

    if (task.length <= 4) {
        document.getElementById("mainBox").classList.remove("scroll")
    }
}
// POMODORO CLOCK 
let time = 1499, secondTime = 299;
let minute = Math.floor(time / 60), second = time - minute * 60;
var audio = new Audio('finishSound.mp3');

let isWork = true;

let message = document.getElementById("message");
let timer = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resumeBtn = document.getElementById("resumeBtn");
let resetBtn = document.getElementById("resetBtn");

let mainTimer, breakTimer;

pauseBtn.style.display = resumeBtn.style.display = "none"
message.style.visibility = "hidden"

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resumeBtn.addEventListener("click", resume);
resetBtn.addEventListener("click", reset);

function start() {
    if (isWork)
        mainTimer = setInterval(pomodoro, 1000);
    else
        breakTime()

    pauseBtn.style.display = "block"
    resumeBtn.style.display = startBtn.style.display = "none"
}
function pause() {
    clearInterval(mainTimer);
    clearInterval(breakTimer);
    resumeBtn.style.display = "block"
    pauseBtn.style.display = startBtn.style.display = "none"
}

function resume() {
    if (time <= 0)
        breakTimer = setInterval(takeBreak, 1000);
    else
        mainTimer = setInterval(pomodoro, 1000);

    pauseBtn.style.display = "block"
    resumeBtn.style.display = startBtn.style.display = "none"
}

function reset() {
    if (isWork) {
        clearInterval(mainTimer);
        time = 1499;
        timer.innerText = "25 : 00"
    }
    else {
        clearInterval(breakTimer);
        secondTime = 299;
        timer.innerText = "05 : 00"
    }
    startBtn.style.display = "block"
    pauseBtn.style.display = resumeBtn.style.display = "none"
}

function pomodoro() {
    minute = Math.floor(time / 60);
    second = time - minute * 60;
    minute = ('0' + minute).slice(-2)
    second = ('0' + second).slice(-2)
    timer.innerText = minute + " : " + second;

    if (time <= 0) {
        audio.play();
        message.style.visibility = "visible"
        clearInterval(mainTimer);
        user.studiedTime += 1499
        totalstudied.innerHTML = (Math.floor(user.studiedTime / 60) / 60).toFixed(2) + " HOUR"
        user.userpoint += 4
        updateProgressBar()
    }
    time--;
}

function messageClear() {
    message.style.visibility = "hidden"

    if (time <= 0)
        breakTime();
}

function breakTime() {
    breakTimer = setInterval(takeBreak, 1000);
}

function takeBreak() {
    isWork = false
    minute = Math.floor(secondTime / 60);
    second = secondTime - minute * 60;
    minute = ('0' + minute).slice(-2)
    second = ('0' + second).slice(-2)
    timer.innerText = minute + " : " + second;

    if (secondTime <= 0) {
        audio.play();
        message.innerHTML = "<span>Hurray, Now It's Time To Get Back To Work!! </span> <span onclick=\"messageClear()\">OK</span>"
        clearInterval(breakTimer);
        time = 1499, secondTime = 299;
        timer.innerText = "25 : 00"
        message.style.visibility = "visible"
        startBtn.style.display = "block"
        pauseBtn.style.display = resumeBtn.style.display = "none"
        isWork = true
    }
    secondTime--;
}

let animationBox = document.getElementsByTagName("main")

setTimeout(() => {
    animationBox[0].style.opacity = "1"
}, 2000);

let prgbar = document.getElementById("prgbar")

function updateProgressBar() {
    if(user.userpoint > 100){
        levelnum.innerHTML = ++user.userlevel
        user.userpoint -= 100
        audio.play();
    }

    prgbar.style.width = user.userpoint+"%"
}

updateProgressBar()