//followed bits of codeWithNick tutorial

$(document).ready(function() {
  const RED = "red";
  const BLUE = "blue";
  const YELLOW = "yellow";
  const GREEN = "green";

  var isOn = false;
  var isStrict = false;
  var curStreak = 0;
  var sequence = [];
  var colors = [RED, BLUE, YELLOW, GREEN];
  var step = 0;

  var objRed = document.createElement("audio");
  objRed.src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
  objRed.volume = 1;
  objRed.autoPlay = false;
  objRed.preLoad = true;

  var objGreen = document.createElement("audio");
  objGreen.src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
  objGreen.volume = 1;
  objGreen.autoPlay = false;
  objGreen.preLoad = true;

  var objBlue = document.createElement("audio");
  objBlue.src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
  objBlue.volume = 1;
  objBlue.autoPlay = false;
  objBlue.preLoad = true;

  var objYellow = document.createElement("audio");
  objYellow.src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
  objYellow.volume = 1;
  objYellow.autoPlay = false;
  objYellow.preLoad = true;

  const sounds = {
    red: objRed,
    blue: objBlue,
    yellow: objYellow,
    green: objGreen
  }

  function reset() {
    curStreak = 0;
    sequence = [];
    step = 0;
    $("#streakCnt").text(sequence.length);
    if (isOn) {
      nextSequence();
    }
  }

  function nextSequence() {
    var nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    $("#streakCnt").text(sequence.length);
    console.log("the sequence ", sequence);
    $.each(sequence, function(i, color) {
      var $curColor = $("#" + color);
      setTimeout(function() {
        sounds[color].play();
        $curColor.animate({
          opacity: "0.5"
        }, "fast");
        $curColor.animate({
          opacity: "1"
        }, "slow");
      }, i * 1000); // separates each color's animation by 1 second
    });
  }

  function sendColor(color) {
    if (!isOn) {
      return;
    }
    if (color === sequence[step]) {
      // go to next step
      if (step === sequence.length - 1) {
        console.log("sequence complete!");
        if (step >= 19) {
          alert("You win! You managed to store 20 steps in your short term memory!")
          reset();
          return;
        }
        step = 0;

        setTimeout(function() {
          nextSequence(); },1000);
      } else {
        step++;
      }
    } else {
      alert("WRONG!!");
      if (isStrict) {
        reset();
      }
    }
  }

  $("#red").click(function() {
    objRed.play();
    $('#red').animate({
      opacity: "0.5"
    }, "fast");
    $('#red').animate({
      opacity: "1"
    }, "fast");
    sendColor(RED);
  });
  $("#blue").click(function() {
    objBlue.play();
    $('#blue').animate({
      opacity: "0.5"
    }, "fast");
    $('#blue').animate({
      opacity: "1"
    }, "fast");
    sendColor(BLUE);
  });
  $("#yellow").click(function() {
    objYellow.play();
    $('#yellow').animate({
      opacity: "0.5"
    }, "fast");
    $('#yellow').animate({
      opacity: "1"
    }, "fast");
    sendColor(YELLOW);
  });
  $("#green").click(function() {
    objGreen.play();
    $('#green').animate({
      opacity: "0.5"
    }, "fast");
    $('#green').animate({
      opacity: "1"
    }, "fast");
    sendColor(GREEN);
  });

  $("#onOff").click(function() {
    if (isOn) {
      isOn = false;
      $("#on-led").removeClass("on");
      $("#on-led").addClass("off");
      reset();
    } else {
      isOn = true;
      $("#on-led").removeClass("off");
      $("#on-led").addClass("on");
      nextSequence();
    }
  });

  $("#strict").click(function() {
    if (!isOn) {
      return;
    }
    if (isStrict) {
      isStrict = false;
      $("#strict-led").removeClass("on");
      $("#strict-led").addClass("off");
    } else {
      isStrict = true;
      $("#strict-led").removeClass("off");
      $("#strict-led").addClass("on");
    }
  });

  $("#reset").click(function() {
    reset();
  });
});
