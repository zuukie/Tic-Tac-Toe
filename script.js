function newRound() {
  line.style.visibility = "hidden";
  map = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  isActive = true;
  newGameBtn.disabled = true;
  endGameBtn.disabled = false;
  turns = 0;
  whoStarts();
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].setAttribute("class", "box");
    boxes[i].children[0].setAttribute("class", "");
  }
  // Wyłączamy ustawienia
  settingsMenu.setAttribute("class", "settings disabled");

  if (againstComputer) {
    if (whosTurn != playerSign) {
      if (difficulty == "E") {
        moveEasy();
      } else if (difficulty == "M") {
        moveMedium();
      } else if (difficulty == "H") {
        moveHard();
      }
    }
  }
}

function whoStarts() {
  if (!againstComputer) {
    if (firstMove == "R") {
      whosTurn = Math.floor(Math.random() * 2);
      if (whosTurn == 0) {
        whosTurn = "O";
        whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Turn';
      } else {
        whosTurn = "X";
        whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Turn';
      }
    } else if (firstMove == "X") {
      whosTurn = "X";
      whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Turn';
    } else {
      whosTurn = "O";
      whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Turn';
    }
  } else {
    if (whoStartsvsPC == "R") {
      whosTurn = Math.floor(Math.random() * 2);
      if (whosTurn == 0) {
        whosTurn = "O";
        whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Turn';
      } else {
        whosTurn = "X";
        whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Turn';
      }
    } else if (whoStartsvsPC == "P") {
      if (playerSign == "X") {
        whosTurn = "X";
        whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Turn';
      } else {
        whosTurn = "O";
        whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Turn';
      }
    } else if (whoStartsvsPC == "C") {
      if (playerSign == "O") {
        whosTurn = "X";
        whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Turn';
      } else {
        whosTurn = "O";
        whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Turn';
      }
    }
  }
}

function turnChange() {
  if (!againstComputer) {
    if (whosTurn == "O") {
      whosTurn = "X";
      whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Turn';
    } else {
      whosTurn = "O";
      whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Turn';
    }
  } else {
    if (whosTurn != playerSign) {
      if (playerSign == "X") {
        whosTurn = "X";
        whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Turn';
      } else {
        whosTurn = "O";
        whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Turn';
      }
    } else {
      if (playerSign == "O") {
        whosTurn = "X";
        whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Turn';
      } else {
        whosTurn = "O";
        whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Turn';
      }

      if (difficulty == "E") {
        setTimeout(moveEasy, 500);
      } else if (difficulty == "M") {
        moveMedium();
      } else if (difficulty == "H") {
        moveHard();
      }
    }
  }
}

let position;
function placeMove(square) {
  position = square.getAttribute("id");
  if (whosTurn == "O") {
    square.setAttribute("class", "box taken");
    square.children[0].setAttribute("class", "fa-regular fa-circle");
    map[position[2]][position[3]] = "O";
    turns++;
  } else {
    square.setAttribute("class", "box taken");
    square.children[0].setAttribute("class", "fa-solid fa-x");
    map[position[2]][position[3]] = "X";
    turns++;
  }
  if (isOver()) {
    settingsMenu.setAttribute("class", "settings");
    isActive = false;
    newGameBtn.disabled = false;
    endGameBtn.disabled = true;

    winUpdate();
  } else {
    if (isActive) {
      turnChange();
    }
  }
}

function winUpdate() {
  if (whosTurn == "X") {
    whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Won!';
    crossesWins++;
    crossWinsStat.textContent = crossesWins;
  } else {
    whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Won!';
    circlesWins++;
    circlesWinsStat.textContent = circlesWins;
  }
}

function isTaken(square) {
  if (!isActive) {
    return true;
  }
  classes = square.getAttribute("class");
  if (classes == "box taken") {
    return true;
  } else {
    return false;
  }
}

function isOver() {
  if (turns < 5) {
    return false;
  }
  // sprawdzamy wszystkie wiersze
  if (map[0][0] == map[0][1] && map[0][1] == map[0][2] && map[0][2] != "") {
    line.style.visibility = "visible";
    line.style.width = "275px";
    line.style.top = "16%";
    line.style.left = "";
    line.style.transform = "translate(-50%, -50%)";
    return true;
  } else if (
    map[1][0] == map[1][1] &&
    map[1][1] == map[1][2] &&
    map[1][2] != ""
  ) {
    line.style.visibility = "visible";
    line.style.width = "275px";
    line.style.top = "50%";
    line.style.left = "";

    line.style.transform = "translate(-50%, -50%)";
    return true;
  } else if (
    map[2][0] == map[2][1] &&
    map[2][1] == map[2][2] &&
    map[2][2] != ""
  ) {
    line.style.visibility = "visible";
    line.style.width = "275px";
    line.style.top = "84%";
    line.style.left = "";

    line.style.transform = "translate(-50%, -50%)";
    return true;
  }
  // sprawdzamy wszystkie kolumny
  if (map[0][0] == map[1][0] && map[1][0] == map[2][0] && map[2][0] != "") {
    line.style.visibility = "visible";
    line.style.width = "275px";
    line.style.top = "50%";
    line.style.left = "16%";
    line.style.transform = "translate(-50%, -50%) rotate(90deg)";
    return true;
  } else if (
    map[0][1] == map[1][1] &&
    map[1][1] == map[2][1] &&
    map[2][1] != ""
  ) {
    line.style.visibility = "visible";
    line.style.width = "275px";
    line.style.top = "50%";
    line.style.left = "4%";
    line.style.transform = "translateY(-50%) rotate(90deg)";
    return true;
  } else if (
    map[0][2] == map[1][2] &&
    map[1][2] == map[2][2] &&
    map[2][2] != ""
  ) {
    line.style.visibility = "visible";
    line.style.width = "275px";
    line.style.top = "50%";
    line.style.left = "84%";
    line.style.transform = "translate(-50%, -50%) rotate(90deg)";
    return true;
  }

  // sprawdzamy skosy
  if (map[0][0] == map[1][1] && map[1][1] == map[2][2] && map[2][2] != "") {
    line.style.visibility = "visible";
    line.style.width = "340px";
    line.style.top = "50%";
    line.style.left = "";

    line.style.transform = "translateX(-50%) rotate(45deg)";
    return true;
  } else if (
    map[2][0] == map[1][1] &&
    map[1][1] == map[0][2] &&
    map[0][2] != ""
  ) {
    line.style.visibility = "visible";
    line.style.width = "340px";
    line.style.top = "50%";
    line.style.left = "";

    line.style.transform = "translateX(-50%) rotate(-45deg)";
    return true;
  }
  // sprawdzamy czy zostało wolne miejsce czy jest remis
  if (turns == 9) {
    settingsMenu.setAttribute("class", "settings");
    isActive = false;
    newGameBtn.disabled = false;
    whosTurnText.innerHTML = "Draw!";
    draws++;
    drawsStats.textContent = draws;
    endGameBtn.disabled = true;
  } else {
    return false;
  }
}

let isActive;
let turns;
let whosTurn;
const whosTurnText = document.querySelector("#whosTurn");
// Game Boxes
const lt = document.querySelector("#LT00");
const ct = document.querySelector("#CT01");
const rt = document.querySelector("#RT02");
const lc = document.querySelector("#LC10");
const cc = document.querySelector("#CC11");
const rc = document.querySelector("#RC12");
const rb = document.querySelector("#RB22");
const lb = document.querySelector("#LB20");
const cb = document.querySelector("#CB21");
lt.addEventListener("click", () => {
  if (!isTaken(lt) && isPlayerTurn()) {
    placeMove(lt);
  }
});
ct.addEventListener("click", () => {
  if (!isTaken(ct) && isPlayerTurn()) {
    placeMove(ct);
  }
});
rt.addEventListener("click", () => {
  if (!isTaken(rt) && isPlayerTurn()) {
    placeMove(rt);
  }
});
lc.addEventListener("click", () => {
  if (!isTaken(lc) && isPlayerTurn()) {
    placeMove(lc);
  }
});
cc.addEventListener("click", () => {
  if (!isTaken(cc) && isPlayerTurn()) {
    placeMove(cc);
  }
});
rc.addEventListener("click", () => {
  if (!isTaken(rc) && isPlayerTurn()) {
    placeMove(rc);
  }
});
lb.addEventListener("click", () => {
  if (!isTaken(lb) && isPlayerTurn()) {
    placeMove(lb);
  }
});
cb.addEventListener("click", () => {
  if (!isTaken(cb) && isPlayerTurn()) {
    placeMove(cb);
  }
});
rb.addEventListener("click", () => {
  if (!isTaken(rb) && isPlayerTurn()) {
    placeMove(rb);
  }
});

const boxes = [lt, ct, rt, lc, cc, rc, rb, lb, cb];
let map = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const line = document.querySelector("#line");

const newGameBtn = document.querySelector("#newGameBtn");
newGameBtn.addEventListener("click", () => {
  newRound();
});
const endGameBtn = document.querySelector("#endGameBtn");
endGameBtn.addEventListener("click", () => {
  settingsMenu.setAttribute("class", "settings");
  isActive = false;
  newGameBtn.disabled = false;
  endGameBtn.disabled = true;

  whosTurnText.innerHTML = "Game Ended!";
});
// Stats
let crossesWins = 0;
let circlesWins = 0;
let draws = 0;
const crossWinsStat = document.querySelector("#crossesWinsNum");
const circlesWinsStat = document.querySelector("#circlesWinsNum");
const drawsStats = document.querySelector("#drawsNum");
// Settings
const settingsMenu = document.querySelector("#settingsMenu");
const typePlayersBtn = document.querySelector("#players");
const typeComputerBtn = document.querySelector("#computer");
const settings2Players = document.querySelector("#settings2Players");
const settingsComputer = document.querySelector("#settingsComputer");

// Wybieramy tryb gry
let againstComputer = false;
typePlayersBtn.addEventListener("click", () => {
  if (typePlayersBtn.getAttribute("class") != "enabled") {
    typePlayersBtn.setAttribute("class", "enabled");
    typeComputerBtn.setAttribute("class", "");
    againstComputer = false;
    settings2Players.style.display = "block";
    settingsComputer.style.display = "none";
  }
});
typeComputerBtn.addEventListener("click", () => {
  if (typeComputerBtn.getAttribute("class") != "enabled") {
    typeComputerBtn.setAttribute("class", "enabled");
    typePlayersBtn.setAttribute("class", "");
    againstComputer = true;
    settings2Players.style.display = "none";
    settingsComputer.style.display = "block";
  }
});

// Wybór kto zaczyna
let firstMove = "R"; // "R" to default + "O" i "X"
const firstMoveCrossOpt = document.querySelector("#firstCross");
const firstMoveCircleOpt = document.querySelector("#firstCircle");
const firstMoveRandomOpt = document.querySelector("#firstRandom");

// Opcje kto zaczyna
firstMoveCrossOpt.addEventListener("click", () => {
  if (firstMoveCrossOpt.getAttribute("class") != "enabled") {
    firstMoveCrossOpt.setAttribute("class", "enabled");
    firstMoveCircleOpt.setAttribute("class", "");
    firstMoveRandomOpt.setAttribute("class", "");
    firstMove = "X";
  }
});
firstMoveCircleOpt.addEventListener("click", () => {
  if (firstMoveCircleOpt.getAttribute("class") != "enabled") {
    firstMoveCircleOpt.setAttribute("class", "enabled");
    firstMoveCrossOpt.setAttribute("class", "");
    firstMoveRandomOpt.setAttribute("class", "");
    firstMove = "O";
  }
});
firstMoveRandomOpt.addEventListener("click", () => {
  if (firstMoveRandomOpt.getAttribute("class") != "enabled") {
    firstMoveRandomOpt.setAttribute("class", "enabled");
    firstMoveCrossOpt.setAttribute("class", "");
    firstMoveCircleOpt.setAttribute("class", "");
    firstMove = "R";
  }
});

// Ustawienia do gry vs pc
let playerSign = "X";
const playerSignOptCross = document.querySelector("#playerCross");
const playerSignOptCircle = document.querySelector("#playerCircle");

playerSignOptCross.addEventListener("click", () => {
  if (playerSignOptCross.getAttribute("class") != "enabled") {
    playerSignOptCross.setAttribute("class", "enabled");
    playerSignOptCircle.setAttribute("class", "");
    playerSign = "X";
  }
});
playerSignOptCircle.addEventListener("click", () => {
  if (playerSignOptCircle.getAttribute("class") != "enabled") {
    playerSignOptCircle.setAttribute("class", "enabled");
    playerSignOptCross.setAttribute("class", "");
    playerSign = "O";
  }
});

let whoStartsvsPC = "R"; // "P", "C", "R"
const firstPlayerOpt = document.querySelector("#firstPlayer");
const firstComputerOpt = document.querySelector("#firstComputer");
const firstRandomOpt = document.querySelector("#firstRandomC");

firstPlayerOpt.addEventListener("click", () => {
  if (firstPlayerOpt.getAttribute("class") != "enabled") {
    firstPlayerOpt.setAttribute("class", "enabled");
    firstComputerOpt.setAttribute("class", "");
    firstRandomOpt.setAttribute("class", "");
    whoStartsvsPC = "P";
  }
});

firstComputerOpt.addEventListener("click", () => {
  if (firstComputerOpt.getAttribute("class") != "enabled") {
    firstComputerOpt.setAttribute("class", "enabled");
    firstPlayerOpt.setAttribute("class", "");
    firstRandomOpt.setAttribute("class", "");
    whoStartsvsPC = "C";
  }
});

firstRandomOpt.addEventListener("click", () => {
  if (firstRandomOpt.getAttribute("class") != "enabled") {
    firstRandomOpt.setAttribute("class", "enabled");
    firstPlayerOpt.setAttribute("class", "");
    firstComputerOpt.setAttribute("class", "");
    whoStartsvsPC = "R";
  }
});

let difficulty = "E"; // "E", "M", "H"

const lvlEasyOpt = document.querySelector("#easy");
const lvlMediumOpt = document.querySelector("#medium");
const lvlHardOpt = document.querySelector("#hard");

lvlEasyOpt.addEventListener("click", () => {
  if (lvlEasyOpt.getAttribute("class") != "enabled") {
    lvlEasyOpt.setAttribute("class", "enabled");
    lvlMediumOpt.setAttribute("class", "");
    lvlHardOpt.setAttribute("class", "");
    difficulty = "E";
  }
});

lvlMediumOpt.addEventListener("click", () => {
  if (lvlMediumOpt.getAttribute("class") != "enabled") {
    lvlMediumOpt.setAttribute("class", "enabled");
    lvlEasyOpt.setAttribute("class", "");
    lvlHardOpt.setAttribute("class", "");
    difficulty = "M";
  }
});

lvlHardOpt.addEventListener("click", () => {
  if (lvlHardOpt.getAttribute("class") != "enabled") {
    lvlHardOpt.setAttribute("class", "enabled");
    lvlEasyOpt.setAttribute("class", "");
    lvlMediumOpt.setAttribute("class", "");
    difficulty = "H";
  }
});

function isPlayerTurn() {
  if (againstComputer) {
    if (whosTurn == playerSign) {
      return true;
    }
    return false;
  }
  return true;
}

let emptySpots;
let pickSpotNum;
function moveEasy() {
  emptySpots = 9 - turns;
  pickSpotNum = Math.floor(Math.random() * emptySpots);

  for (let i = 0; i < 9; i++) {
    if (!isTaken(boxes[i])) {
      if (pickSpotNum == 0) {
        placeMove(boxes[i]);
        break;
      } else {
        pickSpotNum--;
      }
    }
  }
}

newRound();
