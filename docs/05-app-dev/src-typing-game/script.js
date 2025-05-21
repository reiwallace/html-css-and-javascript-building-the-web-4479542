// Page elements
const startButton = document.getElementById("startButton");
const input = document.getElementById("userInputBox");
const animalText = document.getElementById("animal");
const winText = document.getElementById("winText");
const img = document.getElementById("animalImage")

// Animal List - Also used for images
const animals = ["Dog", "Cat", "Tiger", "Elephant", "Giraffe", "Capybara"];

var activeAnimal;
var startTime;

// Disable input box initially
input.disabled = true;
input.value = "";

// Set up button to start game on click
startButton.onclick = function (e) {
  e.stopPropagation();
  document.addEventListener("click", startGame(animals[getRandomInt(0, animals.length - 1)]));
  return false; //handled click
}

// Set up input box to trigger function when typed in
input.oninput = function (e) {
  e.stopPropagation();
  document.addEventListener("input", verifyInput(input), false);
  return false;
}

/** Disables button and starts the game
 * @param {String} animal
 */
function startGame(animal) {
  // Disable button
  startButton.disabled = true;

  // Enable input box
  input.disabled = false;
  input.value = "";
  input.focus();

  // Configure winText and animalText
  winText.innerHTML = "";
  animalText.innerHTML = animal;
  animalText.style.color = "#c50000";
  activeAnimal = animal;
  img.src = "./img/" + activeAnimal + ".jpg";

  // Save round start time
  startTime = new Date().getTime();
}

/** Ends game re-enabling button and disabling text input
 * @param {Double} endTime 
 */
function endGame(endTime) {
  // Calculate duration of round rounding to 2 decimal places
  let roundDuration = Math.round((endTime - startTime) / 10) / 100

  // Disables input box and re-enables button
  input.disabled = true;
  startButton.disabled = false;

  // Set win text showing round duration
  winText.innerHTML = "You typed the correct answer in: " + roundDuration + " seconds!!";
}

/** Verfies the player's inputs changing text colours or ending round
 * @param {Element} input 
 */
function verifyInput(input) {
  var value = input.value;

  // Changes colour of animalText to red or green depending on player input
  for (let i = 0; i < value.length; i++) {
    if (value[i] == activeAnimal[i]) {
      animalText.style.color = "#00d134";
    } else {
      animalText.style.color = "#c50000";
      return;
    }
  }

  // Ends game if player input is the same as the activeAnimal
  if (value == activeAnimal) {
    endGame(new Date().getTime());
  }
}

/** Returns a random number between two values
* @param {int} min - the minimum number to generate a value from
* @param {int} max - the minimum number to generate a value from 
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}