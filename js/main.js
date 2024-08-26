let menu =  window.document.querySelector(".pop-menu");
let playerDataElements = window.document.querySelectorAll(".player-data");
let mainListOfGols = [];
let scoringPlayerAndTeam = [];

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
}
function deletItemFromArray(array,index) {
    let newArray = [];
    for (i in array) {
        if (i != index) newArray.push(array[i]);
    }
    return newArray;
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

window.document.getElementsByClassName("save-all")[0].addEventListener("click",function() {
    for (let i = 0 ; i < playerDataElements.length ; ++i) {
        let playerData = []
        if (playerDataElements[i].firstElementChild.nextElementSibling.firstElementChild.value !== "0" &&
            playerDataElements[i].firstElementChild.nextElementSibling.firstElementChild.value
        ) {
            playerData.push(playerDataElements[i].firstElementChild.textContent);
            playerData.push(window.document.querySelector(`input[name = 'player${i+1}-team']:checked`).value);
            scoringPlayerAndTeam.push(playerData);
        }
    }
})