var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = true;


function soundmaker(color){
  $("#" + color).fadeOut(100).fadeIn(100);
  var sound = new Audio('sounds/' + color + '.mp3');
  sound.play();
}


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNum = Math.random();
  randomNum = randomNum * 4;
  randomNum = Math.floor(randomNum);
  var newColor = buttonColours[randomNum];
  gamePattern.push(newColor);
  soundmaker(newColor);
}


$(document).keypress(function() {
  if (start){
    start = false;
    game();
  }

});

function game(){
  console.log("hey2");
  gamePattern = [];
  level = 0;
  setTimeout(nextSequence, 300);
}

function checkAnswer(last){
  if (userClickedPattern[last] === gamePattern[last]){
    return true;
  }
  return false;
}


$(".btn").click(function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  if (checkAnswer(userClickedPattern.length-1)){
    soundmaker(userChosenColor);
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence, 300);
    }
  }
  else {
    start = true;
    var sound = new Audio('sounds/wrong.mp3');
    sound.play();
    $("#level-title").text("Press any button to restart");
  }

});
