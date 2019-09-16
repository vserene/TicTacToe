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

let onclick = function() {
  console.log(this);
  let x = this.row;
  let y = this.col;

  this.innerHTML = "X";
  this.owned = "X";
  this.disabled = true;
};

//Testing

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

  //create and add the "AI Go First" button

  //create a reload button here if you want?
  let reload = document.createElement("button");
  reload.onclick = window.location.reload();
};

//called once page is laded,
//DOM is ready and has all it's nodes loaded
//console.log("adding init");
window.addEventListener("load", init);
