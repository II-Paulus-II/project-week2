console.log("Clyker game is werkn sur!");

const hackingButton = document.getElementById("website-hacker");

function hackingDone (event) {
  console.log("i have been hacked");
}

hackingButton.addEventListener("click", hackingDone);