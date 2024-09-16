let players = [];
// Check from Local Storage
if (localStorage.players) {
    for (let i = 0 ; i < localStorage.players.split(",").length ; ++i) {
        addPlayer(localStorage.players.split(",")[i])
        players.push(localStorage.players.split(",")[i])
    }
}

let menu =  window.document.querySelector(".pop-menu");
let mainListOfGols = [];
let scoringPlayerAndTeam = [];

function howIsThis(player) {
    for (let i = 0 ; i < scoringPlayerAndTeam.length ; ++i)
        if (scoringPlayerAndTeam[i].slice(-1) == player)
            return scoringPlayerAndTeam[i][0];
}
function howIsMyTeam(player) {
    for (let i = 0 ; i < scoringPlayerAndTeam.length ; ++i) {
        if (scoringPlayerAndTeam[i].slice(-1) == player)
            return scoringPlayerAndTeam[i][1];
    }
}
function goalsOfTeam(team) {
    let result = 0;
    for (let i = 1 ; i < team.length ; ++i) {
        result += team[i].slice(1).length
    }
    return result
}
function setSoccers(team) {
    let containerGoals;
    team[0] === "team1" 
    ? (containerGoals = document.querySelector(".team1-soccers")) 
    : (containerGoals = document.querySelector(".team2-soccers"));
    
    for (let i = 1 ; i < team.length ; ++i) {
        let player = document.createElement("p");
        team[i].length == 2
        ? player.append(`${team[i][0]} ${team[i].slice(1).map(num => `${num}' `).join()}`)
        : player.append(`${team[i][0]} (${team[i].slice(1).map(num => `${num}' `).join()})`);
        containerGoals.append(player)
    }
}
function setAllData(){
    let team1Result = ["team1"],team2Result = ["team2"];
    for (let i = 0 ; i < mainListOfGols.length ; ++i) {
        let heplerList = [];
        heplerList = heplerList.concat(howIsThis(mainListOfGols[i][0]),mainListOfGols[i].slice(1));
        if (howIsMyTeam(mainListOfGols[i][0]) === "team1") team1Result.push(heplerList)
        else team2Result.push(heplerList)
    }
    // Set The Goals In The Page
    document.querySelector(".result .results .team1-result span").textContent = goalsOfTeam(team1Result)
    document.querySelector(".result .results .team2-result span").textContent = goalsOfTeam(team2Result)

    // Set The Sccoring Players  // 
    setSoccers(team1Result);
    setSoccers(team2Result);

    // Set The Time
    let today = new Date();
    let formatedDate = today.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
    document.querySelector(".time").lastElementChild.textContent = formatedDate;
};
function removeChildsByClassName(parent,className) {
    let child = parent.children[0];
    while(child) {
        if (child.className === className) {
            let temp = child.nextElementSibling;
            child.remove();
            child = temp;
        }else {
            child = child.nextElementSibling;
        }
    }
};
function deletItemFromArray(array,index) {
    let newArray = [];
    for (i in array) {
        if (i != index) newArray.push(array[i]);
    }
    return newArray;
};
function addPlayer(name) {
    document.querySelector(".no-player").style.display = "none";
    let newPlayer = document.querySelector(".player-data-template").cloneNode(true);
    newPlayer.style.display = "table-row";
    newPlayer.className = "player-data";
    newPlayer.firstElementChild.textContent = name;

    newPlayer.querySelector(".goal-insert").id = `Player${document.getElementsByTagName("tbody")[0].children.length - 2}`;
    newPlayer.querySelectorAll("[type = radio]")[0].name = `player${document.getElementsByTagName("tbody")[0].children.length - 2}-team`
    newPlayer.querySelectorAll("[type = radio]")[1].name = `player${document.getElementsByTagName("tbody")[0].children.length - 2}-team`
    document.querySelector("tbody").append(newPlayer);
}
function removeItemFromList(list,item) {
    return list
        .slice(0,list.indexOf(item))
        .concat(list.slice(list.indexOf(item)+1))
}

document.addEventListener("focusout",function(ev){
    if (ev.target.type === "number"){
        if (ev.target.value && ev.target.value !== '0') {
            ev.target.nextElementSibling.nextElementSibling.style.backgroundColor = "#F44336";
            ev.target.nextElementSibling.nextElementSibling.onclick = function() {
                window.document.querySelector(".insert-data table").style.filter = "blur(10px)";
                menu.style.display = "block";

                // Check If This Field Already Have Data.
                let haveDate = false;
                let indexOfData = 0;
                for (let i = 0 ; i < mainListOfGols.length ; i++) {
                    if (mainListOfGols[i].indexOf(ev.target.parentElement.id) !== -1) {
                        if (+ev.target.value === (mainListOfGols[i].length - 1)) {
                            haveDate = true;
                            indexOfData = i;
                            break;
                        }
                        else {
                            mainListOfGols = deletItemFromArray(mainListOfGols,mainListOfGols.indexOf(mainListOfGols[i]));
                        }
                    }
                }
                // End Check If This Field Already Have Data.

                for (let j = 1 ; j <= + ev.target.value ; ++j) {
                    let setTime = window.document.createElement("div");
                    let goals = window.document.createElement("span");
                    let input = window.document.createElement("input")
                    let goalsText = window.document.createTextNode(`Goal ${j}`);
                    setTime.className = "set-time";
                    input.type = "text";
                    haveDate ? input.value = mainListOfGols[indexOfData][j] : menu.style.backgroundColor = "#ff000017";
                    // append all that 
                    goals.append(goalsText);
                    setTime.append(goals);
                    setTime.append(input);
                    setTime.setAttribute("data-idGoal",ev.target.parentElement.id);
                    menu.append(setTime);
                }
            }
        }else {
            ev.target.nextElementSibling.nextElementSibling.style.backgroundColor = "#ddd"
        }
    }
})

// Close Pop Menu 
window.document.querySelector(".cancel-menu").onclick = function() {
    removeChildsByClassName(window.document.querySelector(".insert-data .pop-menu"),"set-time");
    window.document.querySelector(".insert-data table").style.filter = "blur(0px)"
    menu.style.display = "none"
}

// Save Changes
window.document.querySelector(".insert-data .pop-menu .save-changes").onclick = function() {
    let scoringTime = window.document.querySelectorAll(".pop-menu .set-time");
    let pass = true
    for (let i = 0 ; i < scoringTime.length ; ++i) {
        if (!parseInt(scoringTime[i].lastElementChild.value) ||
            parseInt(scoringTime[i].lastElementChild.value) <= 0 ||
            parseInt(scoringTime[i].lastElementChild.value) > 120) {
            pass = false
            scoringTime[i].style.color = "red";
        }else{
            scoringTime[i].style.removeProperty("color");
        }
    }
    if (pass) {
        menu.style.backgroundColor = "#00ff0017";
        let listOfGoalsWithOwner = [];
        listOfGoalsWithOwner.push(scoringTime[0].getAttribute("data-idgoal"));
        for (let i = 0 ; i < scoringTime.length ; ++i){
            listOfGoalsWithOwner.push(scoringTime[i].lastElementChild.value);
        }
        mainListOfGols.push(listOfGoalsWithOwner);
    }
}

// Collect And Range All Data
window.document.getElementsByClassName("save-all")[0].addEventListener("click",function(event) {
    let playerDataElements = window.document.querySelectorAll(".player-data");
    for (let i = 0 ; i < playerDataElements.length ; ++i) {
        let playerData = []
        if (playerDataElements[i].firstElementChild.nextElementSibling.firstElementChild.value !== "0" &&
            playerDataElements[i].firstElementChild.nextElementSibling.firstElementChild.value
        ) {
            playerData.push(playerDataElements[i].firstElementChild.textContent);
            playerData.push(window.document.querySelector(`input[name = 'player${i+1}-team']:checked`).value);
            playerData.push(`Player${i+1}`)
            scoringPlayerAndTeam.push(playerData);
        }
    }
    document.querySelector(".match-form").remove();
    document.querySelector(".match-result").style.display = "block";
    setAllData();
})

// click on adding player
document.querySelector(".add-player").onclick = function () {
    window.document.querySelector(".insert-data table").style.filter = "blur(10px)";
    document.querySelector(".insert-data .add-player-menu").style.display = "block";
}

// cancel adding player
window.document.querySelector(".cancel-adding").onclick = function() {
    window.document.querySelector(".insert-data table").style.filter = "blur(0px)"
    document.querySelector(".insert-data .add-player-menu").style.display = "none"
}

// add player to Table
window.document.querySelector(".save-player").onclick = function() {
    addPlayer(document.querySelector(".set-name").lastElementChild.value);

    // Start adding to lacal Storage
    players.push(document.querySelector(".set-name").lastElementChild.value)
    localStorage.players = players;
    // end adding to local Storage 

    window.document.querySelector(".insert-data table").style.filter = "blur(0px)"
    document.querySelector(".insert-data .add-player-menu").style.display = "none"
}

// remove a player
window.document.addEventListener("click",function(event) {
    if (event.target.classList[2] === "delete-player") {
        event.target.parentElement.parentElement.remove();
        players = removeItemFromList(players,event.target.parentElement.parentElement.firstElementChild.textContent);
        if (players.length === 0) {
            document.querySelector(".no-player").style.display = "table-row";
        }
        // update local storage
        localStorage.players = players;
    }
})

