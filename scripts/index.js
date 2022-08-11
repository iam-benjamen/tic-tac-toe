class NormalGame {
  xTurn = true;
  xState = [];
  oState = [];
  xScore = 0;
  oScore = 0;

  winningStates = [
    // Rows
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    // Columns
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    // Diagonal
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];

  container = document.querySelector(".canvas--container");

  constructor() {
    //activating cell on click
    this.activateCell();

    //reset button
    document
      .querySelector("#reset__btn")
      .addEventListener("click", this.resetGame.bind(this));
  }

  //Activate cell onClick
  activateCell() {
    this.container.addEventListener("click", (e) => {
      const target = e.target;
      const isCell = target.classList.contains("grid-cell");
      const isDisabled = target.classList.contains("disabled");

      if (isCell && !isDisabled) {
        const cellValue = target.dataset.value;

        this.xTurn === true
          ? this.xState.push(cellValue)
          : this.oState.push(cellValue);

        target.classList.add("disabled");
        target.classList.add(game.xTurn ? "x" : "o");

        this.xTurn = !this.xTurn;
        document.querySelector(".player__turn").textContent = game.xTurn
          ? `X's turn...`
          : `O's turn...`;

        //check for win or draw
        this.checkDraw();
        this.checkWin();
      }
    });
  }

  //Check for draws
  checkDraw() {
    if (!document.querySelectorAll(".grid-cell:not(.disabled)").length) {
      document.querySelector(".game-over").classList.add("visible");
      document.querySelector(".game-over-text").textContent = "DRAW😞";
    }
  }

  //check for wins
  checkWin() {
    this.winningStates.forEach((winningState) => {
      const xWins = winningState.every((state) => this.xState.includes(state));
      const oWins = winningState.every((state) => this.oState.includes(state));

      if (xWins || oWins) {
        document
          .querySelectorAll(".grid-cell")
          .forEach((cell) => cell.classList.add("disabled"));
   
        //Display Winner
        document.querySelector(".game-over").classList.add("visible");
        document.querySelector(".game-over-text").textContent = xWins
          ? "X wins😋"
          : "O wins😋";

        //update score panel
        if (xWins) ++this.xScore;
        if (oWins) ++this.oScore;
        console.log(this.oScore, this.xScore);
      }
    });

    //Players score
    document.querySelector(".x_score").textContent = `X:${this.xScore}`;
    document.querySelector(".o_score").textContent = `O:${this.oScore}`;
  }

  //reset game
  resetGame() {
    document.querySelector(".game-over").classList.remove("visible");
    document.querySelectorAll(".grid-cell").forEach((cell) => {
      cell.classList.remove("disabled", "x", "o");
    });

    this.xTurn = true;
    this.xState = [];
    this.oState = [];
  }
}

const game = new NormalGame();
