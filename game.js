var gamePattern = [];
var userClickPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).on("keydown", init);
$("h1").on("click",init);

function init(){
  if (!started) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }

}

function nextSequence() {
  userClickPattern=[];
  level++;
  $("#level-title").html("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").on("click", function() {
  animatePress(this.id);

  var userChosenColor = this.id;
  playSound(userChosenColor);
  userClickPattern.push(userChosenColor);
  checkAnswer((userClickPattern.length)-1);
});



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).toggleClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
      if(userClickPattern.length === gamePattern.length){
        setTimeout(nextSequence, 1000);
      }
    }

  else {
    $("body").toggleClass("game-over");
    $("#level-title").html("WRONG");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    setTimeout(function() {
      $("body").toggleClass("game-over");
      $("#level-title").html("Press Any key to Start");
    }, 1000);
    startOver();


  }
}
function startOver(){
  level = 0;
  started = false;
  gamePattern=[];
}
