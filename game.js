var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 1;
var started = false;

$(document).on("keypress",function(){
  if (started == false) {
  nextSequence();
  started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentClick) {

  console.log("gamePattern: " + gamePattern);
  console.log("userClickedPattern: " + userClickedPattern);

  if (gamePattern[currentClick] === userClickedPattern[currentClick]) {
    if (gamePattern.length === userClickedPattern.length) {
      console.log("success");
      setTimeout(nextSequence,1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $('h1').text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * Math.floor(4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(150).fadeIn(150);
  playSound(randomChosenColour);

  $("h1").text("Level " + level);
  level ++;
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var simonSounds = new Audio("sounds/" + name + ".mp3");
  simonSounds.play();
}

function startOver () {
  level = 1;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
