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
    let addNewTaskValue = document.getElementById("addNewTask").value;

    if (addNewTaskValue != "") {
        let x = {
            name: document.getElementById("addNewTask").value,
            isDone: false,
            taskId: "task" + i,
            paraId: "para" + i
        }

        task.push(x)

        addNewTask = ""

        chnageInHTML()
    }

    else {
        alert("Please Enter Real Task");
    }

    if (task.length > 4) {
        document.getElementById("todoMain").classList.add("scroll")
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
        document.getElementById("todoMain").classList.remove("scroll")
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
    if (user.userpoint > 100) {
        levelnum.innerHTML = ++user.userlevel
        user.userpoint -= 100
        audio.play();
    }

    prgbar.style.width = user.userpoint + "%"
}
updateProgressBar()

// Music Plyear

let songIndex = 0;
let audioElement = new Audio();
let playBtn = document.getElementById('playBtn');
let musicProgressBar = document.getElementById('musicProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songs = [
    {musicName: "1",
    filePath: "lofi 1.mp3"},
    {musicName: "2",
    filePath: "lofi 2.mp3"},
    {musicName: "3",
    filePath: "lofi 3.mp3"},
    {musicName: "4",
    filePath: "lofi 4.mp3"},
    {musicName: "5",
    filePath: "lofi 5.mp3"},
    {musicName: "6",
    filePath: "lofi 6.mp3"},
    {musicName: "7",
    filePath: "lofi 7.mp3"},
    {musicName: "8",
    filePath: "lofi 2.mp3"},
    {musicName: "9",
    filePath: "lofi 3.mp3"},
    {musicName: "10",
    filePath: "lofi 5.mp3"},
] 
 
masterSongName.innerText = songs[0].musicName
 function getAudio(filePath){
     let tempaudioElement = new Audio(filePath)
     return (tempaudioElement)
}
// Handle play/pause click
songs.forEach(element => {
audioElement = getAudio(element.filePath)
});   
playBtn.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime==0){
            audioElement.play();
            playBtn.src = "pause.png"    
    }   
    else{
        audioElement.pause();
        playBtn.src = "play.png"
    }
})
// Listen to Eventss
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    musicProgressBar.value = progress;
})

musicProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = musicProgressBar.value * audioElement.duration/100;
})

document.getElementById('nextBtn').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `lofi/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].musicName;
    audioElement.currentTime = 0;
    audioElement.play();

    playBtn.src = "pause.png"
})

document.getElementById('previousBtn').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `lofi/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].musicName;
    audioElement.currentTime = 0;
    audioElement.play();

    playBtn.src = "pause.png"
})
