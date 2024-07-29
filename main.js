const introCard = document.getElementById("introCard");
const indicatorWave = document.getElementById("indicatorWave");
const guessCard = document.getElementById("guessCard");
const guessInput = document.getElementById("guessInput");
const btGuess = document.getElementById("btGuess");
const gameOverCard = document.getElementById("gameOverCard");
const winCard = document.getElementById("winCard");
const canvas = document.getElementById("canvas");
const lbPrompt = document.getElementById("lbPrompt");
const livesDisplay = document.getElementById("lives");

const tmpIndicatorDisplatType = indicatorWave.style.display;
const tmpGuessCardDisplatType = guessCard.style.display;

// disable indicatorWave
indicatorWave.style.display = "line";
// disable guessCard
guessCard.style.display = "none";
//disable gameOverCard
gameOverCard.style.display = "none";
//disable winCard
winCard.style.display = "none";

let mysteryNumber = Math.floor(Math.random() * 100) + 1;
let live = 7;

introCard.onclick = () => {
  new Audio("./assets/title2.mp3").play();
  mysteryNumber = Math.floor(Math.random() * 100) + 1;
  console.log(mysteryNumber);
  live = 7;
  document.documentElement.style.setProperty(
    "--tube-percentage",
    (7 - live) * 20 + "%"
  );
  indicatorWave.style.display = tmpIndicatorDisplatType;
  introCard.classList.add("zoomOutAndFadeOut");
  setTimeout(() => {
    introCard.style.display = "none";
    guessCard.style.display = tmpGuessCardDisplatType;
  }, 500);

  // Populate the guess list
  let guessList = document.getElementById("guessList");
  guessList.innerHTML = "";
  for (let i = 1; i <= 100; i++) {
    let guessItem = document.createElement("div");
    guessItem.innerText = i;
    guessItem.style.margin = "2px";
    guessItem.style.width = "20px";
    guessItem.style.textAlign = "center";
    guessItem.style.border = "1px solid black";
    guessList.appendChild(guessItem);
  }
};

btGuess.onclick = () => {
  const guess = parseInt(guessInput.value);
  // set css variables --tube-percentage
  document.documentElement.style.setProperty(
    "--tube-percentage",
    (7 - live) * 20 + "%"
  );

  if (guess === mysteryNumber) {
    guessCard.style.display = "none";
    winCard.style.display = tmpGuessCardDisplatType;
    let lbResultOnWin = document.getElementById("lbResultOnWin");
    lbResultOnWin.innerHTML = `The number was ${mysteryNumber}`;

    new Audio("./assets/correct.mp3").play();
    startConfetti();
  } else if (guess < mysteryNumber) {
    lbPrompt.innerHTML = "Your guess is too low";
    new Audio("./assets/wrong.mp3").play();
  } else {
    lbPrompt.innerHTML = "Your guess is too high";
    new Audio("./assets/wrong.mp3").play();
  }
  live--;
  document.getElementById("lives").innerHTML = `Lives left: ${live}`;
  if (live === 0) {
    guessCard.style.display = "none";
    gameOverCard.style.display = tmpGuessCardDisplatType;
    let lbResultOnOver = document.getElementById("lbResultOnOver");
    lbResultOnOver.innerHTML = `The number was ${mysteryNumber}`;
  }

  console.log(guess);
};

function restartGame() {
  mysteryNumber = Math.floor(Math.random() * 100) + 1;
  live = 7;
  document.documentElement.style.setProperty(
    "--tube-percentage",
    (7 - live) * 20 + "%"
  );
  introCard.classList.remove("zoomOutAndFadeOut");
  introCard.style.display = tmpGuessCardDisplatType;
  indicatorWave.style.display = "none";
  guessCard.style.display = "none";
  gameOverCard.style.display = "none";
  winCard.style.display = "none";
  guessInput.value = "";
  document.getElementById("lives").innerHTML = `Lives left: ${live}`;
  
  // Populate the guess list
  let guessList = document.getElementById("guessList");
  guessList.innerHTML = "";
  for (let i = 1; i <= 100; i++) {
    let guessItem = document.createElement("div");
    guessItem.innerText = i;
    guessItem.style.margin = "2px";
    guessItem.style.width = "20px";
    guessItem.style.textAlign = "center";
    guessItem.style.border = "1px solid black";
    guessList.appendChild(guessItem);
  }
}

// startConfetti() function here
function startConfetti() {
  const confettiSettings = { target: 'canvas' };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}
