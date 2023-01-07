var randomNumber = 0;
var counter = 0;
var hundredCounter = 0;
var tensCounter = 0;
var onesCounter = 0;

$(function () {
  $("#draggableHundreds").draggable({
    helper: "clone",
    revert: "invalid",
    connectToDroppable: "#droppable",
  });
  $("#draggableTens").draggable({
    helper: "clone",
    revert: "invalid",
    connectToDroppable: "#droppable",
  });
  $("#draggableOnes").draggable({
    helper: "clone",
    revert: "invalid",
    connectToDroppable: "#droppable",
  });
  $("#droppable").droppable({
    accept: "#draggableHundreds, #draggableTens, #draggableOnes",
    drop: function (event, ui) {
      var cloned = $(ui.helper).clone();
      cloned.attr("id", "clonedElem" + counter);

      cloned.css({
        position: "absolute",
      });

      cloned.attr("visible", "true");

      cloned.draggable({
        containment: "parent",
      });
      $("#droppable").append(cloned);
      refreshCounter(cloned, true);
    },
  });
  $("#trash").droppable({
    over: function (event, ui) {
      refreshCounter(ui.draggable, false);
      ui.draggable.remove();
    },
  });
});

//Aufgabenstellung
window.onload = function () {
  randomNumber = Math.floor(Math.random() * 1000);
  document.getElementById("exercise").innerHTML =
    "Stelle die Zahl " +
    randomNumber +
    " dar   " +
    '<button class="btn" style="background-color:#00868b" onClick="playSound()"><i class="bi bi-mic-fill"></i></button>';
};

function playSound() {
  var msg = new SpeechSynthesisUtterance();
  msg.text = randomNumber;
  msg.volume = 0.5;
  msg.lang = "de-at";
  window.speechSynthesis.speak(msg);
}

function refreshCounter(element, adds) {
  if (element.attr("class").includes("draggable-hundreds")) {
    if (adds) {
      counter += 100;
      hundredCounter++;
    } else {
      counter -= 100;
      hundredCounter--;
    }
  }
  if (element.attr("class").includes("draggable-tens")) {
    if (adds) {
      counter += 10;
      tensCounter++;
    } else {
      counter -= 10;
      tensCounter--;
    }
  }
  if (element.attr("class").includes("draggable-ones")) {
    if (adds) {
      counter += 1;
      onesCounter++;
    } else {
      counter -= 1;
      onesCounter--;
    }
  }
  document.getElementById("counter").innerHTML = counter;
}

function submitBtnClicked() {
  var solutionText = "";
  document.getElementById("myModal").style.display = "block";
  if (counter === randomNumber) {
    solutionText = "Das ist richtig :)";
    document.getElementById("closeBtn").innerHTML = "Nächste Aufgabe!";
    solutionIsCorrect = true;
  } else {
    solutionText =
      "Du hast " +
      hundredCounter +
      " Hunderter, " +
      tensCounter +
      " Zehner und " +
      onesCounter +
      " Einer genommen und die Zahl " +
      counter +
      " dargestellt. Du solltest aber die Zahl " +
      randomNumber +
      " darstellen. Versuch es noch einmal.";
    document.getElementById("closeBtn").innerHTML = "Nochmal probieren";
    solutionIsCorrect = false;
  }
  document.getElementById("solution").innerHTML = solutionText;
}

function closeModal() {
  console.log(solutionIsCorrect);
  if (solutionIsCorrect) {
    window.location.reload();
  } else {
    document.getElementById("myModal").style.display = "none";
    clearCountField();
    elementsDragged = 0;
  }
}

function refreshBtnClicked() {
  window.location.reload();
}
