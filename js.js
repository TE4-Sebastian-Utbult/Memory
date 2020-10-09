let img = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", 
           "8.png", "9.png", "10.png", "11.png", "12.png", "1.png", "2.png"
        , "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", 
        "9.png", "10.png", "11.png", "12.png"]

// let img = ["1.png", "1.png"];

let running = false;
shuffle();
let cards = [];
let state= []
for (let i = 0; i < img.length; i++) {  state[i] = 1; }
let uplimit = 0;
let active = []


let time = 0;
document.getElementById("timerframe").innerHTML = time;
setInterval(() => {
    if(running){
        time++;
    }else{
        time = 0;
    }
    document.getElementById("timerframe").innerHTML = time;
    CheckWin();
}, 1000);



function load(){ //PAINT

    for (let i = 0; i < img.length; i++) {
        if(state[i] == 1){
            cards[i] = addcards("back.png", i);
        }else{
            cards[i] = addcards(img[i], i);
        }
    }
    if(running){
        document.getElementById("items").style.backgroundColor = "rgb(36, 173, 105)";
    }else{
        document.getElementById("items").style.backgroundColor = "coral";
    }
    
}

function addcards(img, i){
    
    var card = document.createElement("img"); //CREATE CARD
    card.setAttribute("id", "card"+i);
    card.src ='/img/'+img;
    card.width = "100";
    card.height = "100";
    card.style.margin = "10px";
    card.style.borderRadius = "20px";

    if(state[i] == 3){
        card.style.outline = "5px solid lightgreen";
        card.style.borderRadius = "0px";
    }

    if(state[i] != 2 && state[i] != 3){
        card.onclick = function(){

            running = true;
    
            if(state[i] == 1 && uplimit != 2){
                state[i] = 0;
                uplimit = uplimit + 1;
                if(CheckMatch(i)){
                    uplimit = 0;
                }
            }else if(state[i] == 0){
                state[i] = 1;
                uplimit = uplimit -1;
                active.pop();
            }
    
            updateCanvas();
        }
    } 
    document.getElementById("cards").appendChild(card);

}

function updateCanvas(){
    while (document.getElementById("cards").firstChild) {
        document.getElementById("cards").removeChild(document.getElementById("cards").lastChild);
    }
    load();
}

function shuffle(){
    if(running==false){
        for (var i = img.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = img[i];
            img[i] = img[j];
            img[j] = temp;
        }
    }
}

function CheckMatch(i){
    var x = 0
    for (let i = 0; i < state.length; i++) {
        if(state[i] == 0){
            active[x] = img[state.indexOf(0)];
            state[state.indexOf(0)] = 2;
            x+=1;
        }
    }
    if(active[0] == active[1]){
        active.pop();
        active.pop();
        state[state.indexOf(2)] = 3;
        state[state.indexOf(2)] = 3;

        MessageConsoleUpdate(1);
        setTimeout(() => {
            document.getElementById("MessageConsole").innerHTML = Messages[0]
        }, 1500);
        return true;

    }else{
        setTimeout(() => {
            state[state.indexOf(2)] = 1;
            state[state.indexOf(2)] = 1;
        }, 2000);
    }
}

function restart(){
    for (let i = 0; i < state.length; i++) {
        state[i] = 1;
    }
    uplimit = 0;
    running = false;
    shuffle();
    updateCanvas();
}

function CheckWin(){
    var x = 0;
    for (let i = 0; i < state.length; i++) {
        if(state[i] == 3){
            x+=1
            console.log(x);
        }
    }
    if (x == state.length) {
        time -= 1;
        alert("You won under " + time + " Secconds")
        restart();
    }
}

let Messages = ["...", "MATCH!", "WIN!", "OUT OF TIME :C", "WOW!", "COOL!", "AMAZING!"]
function MessageConsoleUpdate (i){
    document.getElementById("MessageConsole").innerHTML = Messages[i];
}