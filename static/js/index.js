//#region constants and variables
var hundreds = document.querySelector('.hundreds');
const tens = document.querySelector('.tens');
const ones = document.querySelector('.ones');
const countField = document.querySelector('.count-field');
const columnTwo = document.querySelector('.col-4');
const rowOne = document.querySelector('.row-one');
const rowTwo = document.querySelector('.row-two');
const rowThree = document.querySelector('.row-three');
const rowFour = document.querySelector('.row-four');
const rowFive = document.querySelector('.row-five');
var currentlyDragged;
var hundredCounter = 0;
var tensCounter = 0;
var onesCounter = 0;
var totalNumber = 0;
var randomNumber = 0;
var solutionIsCorrect;
//#endregion

window.onload = function() {
    randomNumber =  Math.floor(Math.random() * 1000);
    document.getElementById('exercise').innerHTML = "Bitte geben sie folgende Zahl mit den Zahlenfeldern an: " + randomNumber + "   "+"<button class=\"btn btn-info\" onClick=\"playSound()\"><i class=\"bi bi-volume-up\"></i></button>";
}
hundreds.addEventListener('dragstart', dragStartHundreds);
hundreds.addEventListener('dragend', dragEndHundreds);

tens.addEventListener('dragstart', dragStartTens);
tens.addEventListener('dragend', dragEndTens);

ones.addEventListener('dragstart', dragStartOnes);
ones.addEventListener('dragend', dragEndOnes);

countField.addEventListener('dragenter', dragEnter);
countField.addEventListener('dragover', dragOver);
countField.addEventListener('dragleave', dragLeave);
countField.addEventListener('drop', dragDrop);

function dragStartHundreds() {
    this.className += ' hold';
    currentlyDragged = hundreds;
}

function dragEndHundreds() {
    this.className = 'hundreds';
}

function dragStartTens() {
    this.className += ' hold';
    currentlyDragged = tens;

}

function dragEndTens() {
    this.className = 'tens';
}

function dragStartOnes() {
    this.className += ' hold';
    currentlyDragged = ones;
}

function dragEndOnes(e) {
    this.className = 'ones';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    this.className = 'count-field';
}

function dragDrop() {
    switch(currentlyDragged) {
        case hundreds:
            var tag = document.createElement("div");
            tag.classList.add("hundreds-resized")
            if(hundredCounter < 5) {
                rowOne.append(tag); 
                hundredCounter++; 
            } else if (hundredCounter < 9) {
                rowTwo.append(tag);
                hundredCounter++;
            }
            break;
        case tens:
            var tag = document.createElement("div");
            tag.classList.add("tens-resized");
            if(tensCounter < 5) {
                rowThree.append(tag);
                tensCounter++;
            } else if(tensCounter < 9) {
                rowFour.append(tag);
                tensCounter++;
            }
            break;
        case ones:
            if(onesCounter < 9) {
                var tag = document.createElement("div");
                tag.classList.add("ones");
                rowFive.append(tag);
                onesCounter++;
            }
            break;
        default: 
            break;
    }
    totalNumber = hundredCounter * 100 + tensCounter*10 + onesCounter;
    console.log(totalNumber);
    console.log(randomNumber);
}

function submitBtnClicked() {
    var solutionText = "";
    document.getElementById("myModal").style.display = "block";
    if(totalNumber === randomNumber) {
        solutionText = "Das ist richtig :)";
        document.getElementById("closeBtn").innerHTML = "Nächste Aufgabe!";
        solutionIsCorrect = true;
    } else {
        solutionText = "Das ist leider falsch :(";
        document.getElementById("closeBtn").innerHTML = "Nochmal probieren";
        solutionIsCorrect = false;
    }
    document.getElementById("solution").innerHTML = solutionText;
}

function closeModal() {
    console.log(solutionIsCorrect); 
    if(solutionIsCorrect) {
        window.location.reload();
    } else {
        document.getElementById("myModal").style.display = "none";
        clearCountField();
    }
}

function refreshBtnClicked() {
    window.location.reload();
}

function clearCountField() {
    while(rowOne.firstChild) {
        rowOne.removeChild(rowOne.lastChild);
    }
    while(rowTwo.firstChild) {
        rowTwo.removeChild(rowTwo.lastChild);
    }
    while(rowThree.firstChild) {
        rowThree.removeChild(rowThree.lastChild);
    }
    while(rowFour.firstChild) {
        rowFour.removeChild(rowFour.lastChild);
    }
    while(rowFive.firstChild) {
        rowFive.removeChild(rowFive.lastChild);
    }
    totalNumber = 0;
    hundredCounter = 0;
    tensCounter = 0;
    onesCounter = 0;
}

function playSound() {
    var msg = new SpeechSynthesisUtterance();
    msg.text = randomNumber;
    msg.volume = 0.5;
    msg.lang = 'de-at';
    window.speechSynthesis.speak(msg);
}