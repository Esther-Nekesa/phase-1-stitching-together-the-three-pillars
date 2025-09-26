// We use the Objects below to control toggling like / unlike status

const glyphStates = {
  "♡": "♥",
  "♥": "♡",
};

const colorStates = {
  red: "",
  "": "red",
};

// STEP 1: Select all the hearts
const articleHearts = document.querySelectorAll(".like-glyph");

function likeCallback(e) {
  const heart = e.target;
  mimicServerCall()
    .then(function (serverMessage) {
      // STEP 2: Update DOM when server "succeeds"
      console.log(serverMessage); // shows pretend server response
      heart.innerText = glyphStates[heart.innerText];
      heart.style.color = colorStates[heart.style.color];
    })
    .catch(function (error) {
      // Handle server "failure"
      alert("Something went wrong! Try again.");
      console.error(error);
    });
}

// STEP 3: Add event listener to each heart
for (const glyph of articleHearts) {
  glyph.addEventListener("click", likeCallback);
}

//------------------------------------------------------------------------------
// Mock server call (simulates a delay and random failure)
//------------------------------------------------------------------------------
function mimicServerCall() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      // Simulate random failure (20% of the time)
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
