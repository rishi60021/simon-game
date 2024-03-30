var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


  //Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time
  $(document).keypress(function() {

    //to check whether game has started or note
    if (!started) {

    started = true;
  $("#level-title").css("font-size","3rem");
  $("#level-title").css("animation","0");
    $("#level-title").text("Level 0");

    //start the Timer
    

    //call nextSequence()
    nextSequence();
  }
  });



//to check which button is clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  // animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name) {
  //to play audio as same as randomChosenColour
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel]===userClickedPattern[currentLevel] ) {
    //console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    //console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);


    //set gameover text back to blinking
      $("#level-title").css("font-size","2.5rem");
      $("#level-title").text("Game Over, Press any key to Restart");
      $("#level-title").css("animation","animate 1.5s linear infinite");


    startOver();
  }
}


function arraysEqual(a1, a2) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) == JSON.stringify(a2);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;

}
