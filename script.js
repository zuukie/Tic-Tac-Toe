function newRound() {
  line.style.visibility = "hidden";
  map = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  isActive = true;
  newGameBtn.disabled = true;
  turns = 0;
  whoStarts();
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].setAttribute("class", "box");
    boxes[i].children[0].setAttribute("class", "");
  }
}

function whoStarts() {
  whosTurn = Math.floor(Math.random() * 2);
  if (whosTurn == 0) {
    whosTurn = "O";
    whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Turn';
  } else {
    whosTurn = "X";
    whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Turn';
  }
}

function turnChange() {
  if (whosTurn == "O") {
    whosTurn = "X";
    whosTurnText.innerHTML = '<i class="fa-solid fa-x"> </i> Turn';
  } else {
    whosTurn = "O";
    whosTurnText.innerHTML = '<i class="fa-regular fa-circle"> </i> Turn';
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
    isActive = false;
    newGameBtn.disabled = false;
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
    line.style.transform = "translate(-50%, -50%) rotate(45deg)";
    return true;
  } else if (
    map[2][0] == map[1][1] &&
    map[1][1] == map[0][2] &&
    map[0][2] != ""
  ) {
    line.style.visibility = "visible";
    line.style.width = "340px";
    line.style.top = "50%";
    line.style.transform = "translate(-50%, -50%) rotate(-45deg)";
    return true;
  }
  // sprawdzamy czy zostało wolne miejsce czy jest remis
  if (turns == 9) {
    isActive = false;
    newGameBtn.disabled = false;
    whosTurnText.innerHTML = "Draw!";
    draws++;
    drawsStats.textContent = draws;
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
const boxes = [lt, ct, rt, lc, cc, rc, rb, lb, cb];
let map = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const line = document.querySelector("#line");
const newGameBtn = document.querySelector("#newGameBtn");
// Stats
let crossesWins = 0;
let circlesWins = 0;
let draws = 0;
const crossWinsStat = document.querySelector("#crossesWinsNum");
const circlesWinsStat = document.querySelector("#circlesWinsNum");
const drawsStats = document.querySelector("#drawsNum");

lt.addEventListener("click", () => {
  if (!isTaken(lt)) {
    placeMove(lt);
  }
});
ct.addEventListener("click", () => {
  if (!isTaken(ct)) {
    placeMove(ct);
  }
});
rt.addEventListener("click", () => {
  if (!isTaken(rt)) {
    placeMove(rt);
  }
});
lc.addEventListener("click", () => {
  if (!isTaken(lc)) {
    placeMove(lc);
  }
});
cc.addEventListener("click", () => {
  if (!isTaken(cc)) {
    placeMove(cc);
  }
});
rc.addEventListener("click", () => {
  if (!isTaken(rc)) {
    placeMove(rc);
  }
});
lb.addEventListener("click", () => {
  if (!isTaken(lb)) {
    placeMove(lb);
  }
});
cb.addEventListener("click", () => {
  if (!isTaken(cb)) {
    placeMove(cb);
  }
});
rb.addEventListener("click", () => {
  if (!isTaken(rb)) {
    placeMove(rb);
  }
});
newGameBtn.addEventListener("click", () => {
  newRound();
});

newRound();
