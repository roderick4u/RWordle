const wordsArray = ['APPLE', 'SMOKE', 'UNCLE', 'DRIVE', 'EAGLE']; // Array de palabras posibles
const guess_word = document.getElementById("guess-input");
const button = document.getElementById("guess-button");
const letterContainers = document.getElementById("correct-letters");
const buttonReset = document.getElementById("reset-button");
const buttonGiveUp = document.getElementById("give-up-button");
const winningMessage = document.getElementById("winning-message");
const losingMessage = document.getElementById("losing-message");
const highScoreDisplay = document.getElementById("boardScore"); 
const buttonHelp = document.getElementById("help-button");

let wordAPI = wordsArray[Math.floor(Math.random() * wordsArray.length)];
let pista = "No hint available for the selected word.";

console.log('Palabra generada:', wordAPI);

// Simulamos una pista (en caso de ser necesaria)
const hints = {
    'APPLE': 'A fruit.',
    'SMOKE': 'Cigarrete?',
    'UNCLE': 'He is the brother of your dad.',
    'DRIVE': 'To operate a vehicle maybe',
    'EAGLE': 'A large bird and.. America?.'
};

if (hints[wordAPI]) {
    pista = hints[wordAPI];
}

buttonHelp.addEventListener("click", () => {
    alert(pista);
});

let intentos = 6;
let correctLetters = 0;
let saveScore = JSON.parse(localStorage.getItem("highScore")) || 0;
let highScore = saveScore;

console.log(highScore);
highScoreDisplay.innerHTML = "SCORE: " + saveScore;

button.addEventListener("click", checkGuess);
guess_word.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkGuess();
    }
});
buttonReset.addEventListener("click", () => {
    location.reload();
});
buttonGiveUp.addEventListener("click", () => { 
    alert("The word is: " + wordAPI);
    location.reload();
});

function checkGuess() {
    if (intentos === 0) {
        losingMessage.style.display = "block";
        return;
    }
    verification(correctLetters);
    let word = guess_word.value.toUpperCase();
    let arrayWord = word.split('');
    let arrayDictionaryWord = (wordAPI).split('');
    if (word.length !== 5) {
        alert("The word must have 5 letters");
        return;
    }
    console.log(arrayWord);
    for (let i = 0; i < arrayDictionaryWord.length; i++) {
        const letterContainer = document.createElement("div");
        letterContainer.classList.add("letter-container");
        if (arrayWord[i] === arrayDictionaryWord[i]) {
            letterContainer.classList.add("correct");
            correctLetters++;
        } else if (arrayDictionaryWord.includes(arrayWord[i])) {
            letterContainer.classList.add("parcialCorrect");
        } else {
            letterContainer.classList.add("incorrect");
        }
        letterContainer.innerHTML = arrayWord[i];
        letterContainers.appendChild(letterContainer);
    }
    letterContainers.innerHTML += "<br>";
    intentos--;
    verification(correctLetters);
}

function verification(correctLetters) {
    if (correctLetters === 5) {
        saveScore++;
        console.log(saveScore);
        localStorage.setItem("highScore", saveScore);
        winningMessage.style.display = "block";
        return;
    }
}
