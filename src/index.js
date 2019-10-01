//I'm defining these variables here so they're accessible
//in the init and other child scopes

//rootNode needs to be accessible from everything
//but no guarantee that the DOM is ready
//to do an ID lookup right now, so assign it in init
let rootNode;

//our array of button dom elements
let buttonNodes = [
  [], //row 0
  [], //row 1
  [] //row 2
];

//button for the AI to go first
let aiFirst;

//determine the winner. 0 is none, 1 is player, 2 is AI
let winner = 0;

//AI moving. Picks the first available space
let aiMove = () => {
  const availSpaces = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        buttonNodes[i][j].innerHTML !== "X" &&
        buttonNodes[i][j].innerHTML !== "O"
      ) {
        availSpaces.push(buttonNodes[i][j]);
      }
    }
  }
  availSpaces[0].innerHTML = "O";
  availSpaces[0].owned = "O";
  availSpaces[0].disabled = true;
};

//refreshes page button
let refreshPage = () => {
  window.location.reload();
}

//Make AI button disappear
let disappear = () => {
  aiFirst.disabled = true;
  aiFirst.style.visibility = "hidden";
  aiFirst.style.display = "none";
}

let aiFirstMove = () => {
  aiMove();
  disappear();
}

//disable all the buttons of the buttonNOdes
let disableAll = () => {
  for (let i =0; i < 3; i++){
    for (let j=0; j <3; j++){
      buttonNodes[i][j].disabled = true;
      }
    }
}

//testing for diagonal win
const diagWin = () => {
  let oof = false;
  if (buttonNodes[0][0].innerHTML == buttonNodes[1][1].innerHTML
    && buttonNodes[0][0].innerHTML == buttonNodes[2][2].innerHTML 
    && buttonNodes[0][0].innerHTML != "_"){
    oof = true;
    return oof;
  }
  if (buttonNodes[2][0].innerHTML == buttonNodes[1][1].innerHTML 
    && buttonNodes[2][0].innerHTML == buttonNodes[0][2].innerHTML 
    && buttonNodes[2][0].innerHTML != "_"){
    oof = true;
    return oof;

  } else {
    return oof;
  } 
}

//testing for vertical win
let vertWin = () => {
  let oof = false;
  let boop = buttonNodes[0][0].innerText
  if ((buttonNodes[0][0].innerHTML == buttonNodes[1][0].innerHTML 
    && buttonNodes[0][0].innerHTML == buttonNodes[2][0].innerHTML 
    && buttonNodes[0][0].innerHTML != "_")
  || (buttonNodes[0][1].innerHTML == buttonNodes[1][1].innerHTML
    && buttonNodes[0][1].innerHTML == buttonNodes[2][1].innerHTML 
    && buttonNodes[0][1].innerHTML!= "_")
  || (buttonNodes[0][2].innerHTML == buttonNodes[1][2].innerHTML
  && buttonNodes[0][2].innerHTML == buttonNodes[2][2].innerHTML 
  && buttonNodes[0][2].innerHTML!= "_")){
    oof = true;
    return oof;
  }
  else{
    return false;
  }
}

//testing for horizontal win
let horizWin = () => {
  if ((buttonNodes[0][0].innerHTML == buttonNodes[0][1].innerHTML 
      && buttonNodes[0][0].innerHTML == buttonNodes[0][2].innerHTML 
      && buttonNodes[0][0].innerHTML!= "_")
  || (buttonNodes[1][0].innerHTML == buttonNodes[1][1].innerHTML 
    && buttonNodes[1][0].innerHTML == buttonNodes[1][2].innerHTML 
    && buttonNodes[1][0].innerHTML != "_")
  || (buttonNodes[2][0].innerHTML == buttonNodes[2][1].innerHTML 
    && buttonNodes[2][0].innerHTML == buttonNodes[2][2].innerHTML
    && buttonNodes[2][0].innerHTML != "_")){
    return true;
  }
  else{
    return false;
  }
}

//checks all the win
let checkWin = () => {
  if (diagWin() == true || vertWin() == true || horizWin() == true){
    return true;
  }
  else{
    return false;
  }
}

//check for no win
const checkCat = () => {
  let filled = true;
  loop:
  for (let i =0; i < 3; i++){
    for (let j=0; j <3; j++){
      if (buttonNodes[i][j].innerHTML == "_"){
        filled = false;
        break loop;
      }
    }
  }
  if (checkWin == false && filled == true){
    return true;
  }
  else{
    return false;
  }
}

//The algorithim for the onclick function
//
//1. set X in this.innerHTML
//2. disable this button
//3. check win states [end the game if true]
//      - horizontal
//      - vertical
//      - diags
//      - cat game
//5. call aiMove
//6. check win states again
//

//the win state
let win = false;
//cat state
let noOne = false;

//testing for onclick. Not the final if I could get 
//the comparisons to work
// const onclick = function() {
//   console.log(this);
//   let x = this.row;
//   let y = this.col;

//   this.innerHTML = "X";
//   this.owned = "X";
//   this.disabled = true;

//   disappear();
//   win = checkWin();
//   console.log(win);

//   aiMove();
// };

//If my checkwin fuctions would work,
//this would be my onclick function.

let onclick = function() {
  console.log(this);
  let x = this.row;
  let y = this.col;

  this.innerHTML = "X";
  this.owned = "X";
  this.disabled = true;

  noOne = checkCat();
  if (noOne == true){
    meh = "Cat game. hit refresh to play again!";
    alert(meh);
    return; 
  }

  win = checkWin();
  if (win == true){
    winner = 1;
  }

  if (winner == 1){
    disableAll();
    let playerWin = "You Win! Hit refersh to play again";
    alert(playerWin);
    return;
  }

  aiMove();
  win = checkWin();
  if (win == true){
    winner = 2;
  }
  if (winner == 2){
    disableAll();
    let AIWin = "You Lose! Hit refersh to play again";
    alert(AIWin);
    return;
  }
};

//this gets called by the 'load' event listener
let init = function() {
  console.log("init");
  rootNode = document.getElementById("app");

  //create and add the 9 game board buttons
  //to the array and to DOM
  //assign an onclick callback
  for (let i = 0; i < 3; i++) {
    let rowDivNode = document.createElement("div");
    for (let j = 0; j < 3; j++) {
      let btn = (buttonNodes[i][j] = document.createElement("button"));
      btn.innerHTML = "_";
      btn.owned = false;
      btn.row = i;
      btn.col = j;
      btn.onclick = onclick;
      rowDivNode.appendChild(btn);
    }
    rootNode.appendChild(rowDivNode);
  }

  //creates the space and the set up the variables
  let br = document.createElement("br");
  rootNode.appendChild(br);

  //create and add the "AI Go First" button
  aiFirst = document.createElement("button");
  aiFirst.innerHTML = "AI go First";
  aiFirst.onclick = aiFirstMove;
  rootNode.appendChild(aiFirst);
  
  //create a reload button here if you want?
  
  let refresh = document.createElement("button");
  refresh.innerHTML = "Refresh";
  refresh.onclick = refreshPage;
  rootNode.appendChild(refresh);
};



//called once page is laded,
//DOM is ready and has all it's nodes loaded
//console.log("adding init");
window.addEventListener("load", init);

