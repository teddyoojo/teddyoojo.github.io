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
var elementsDragged = 0;
var selectedRow = rowOne;
//#endregion

window.onload = function() {
    randomNumber =  Math.floor(Math.random() * 1000);
    document.getElementById('exercise').innerHTML = "Stelle die Zahl " + randomNumber + " dar   "+"<button class=\"btn\" style=\"background-color:#00868b\" onClick=\"playSound()\"><i class=\"bi bi-mic-fill\"></i></button><button class=\"btn btn-danger\" onClick=\"deleteLast()\">Letzte Eingabe löschen</button>";
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
    if(elementsDragged < 5) { 
        addToCountField(rowOne)
    } else if(elementsDragged < 10) {
        addToCountField(rowTwo)
    } else if(elementsDragged < 15) {
        addToCountField(rowThree)
    } else if(elementsDragged < 20) {
        addToCountField(rowFour)
    } else if(elementsDragged < 25) {
        addToCountField(rowFive)
    }
}

function addToCountField(selectedRow) {
    switch(currentlyDragged) {
        case hundreds:
            var tag = document.createElement("div");
            tag.classList.add("hundreds-resized")
            selectedRow.append(tag);
            hundredCounter++;
            break;
        case tens:
            var tag = document.createElement("div");
            tag.classList.add("tens-resized");
            selectedRow.append(tag);
            tensCounter++;
            break;
        case ones:
            var tag = document.createElement("div");
            tag.classList.add("ones");
            selectedRow.append(tag);
            onesCounter++;
            break;
        default: 
            break;
    }
    elementsDragged++;
    console.log(elementsDragged);
    totalNumber = hundredCounter * 100 + tensCounter*10 + onesCounter;
}

function submitBtnClicked() {
    var solutionText = "";
    document.getElementById("myModal").style.display = "block";
    if(totalNumber === randomNumber) {
        solutionText = "Das ist richtig :)";
        document.getElementById("closeBtn").innerHTML = "Nächste Aufgabe!";
        solutionIsCorrect = true;
    } else {
        solutionText = "Du hast " + hundredCounter + " Hunderter, " + tensCounter + " Zehner und " + onesCounter + " Einer genommen und die Zahl " + totalNumber +
        " dargestellt. Du solltest aber die Zahl " + randomNumber + " darstellen. Versuch es noch einmal.";
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
        elementsDragged = 0;
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

function deleteLast() {
    if(elementsDragged > 0) {
        var removedElement = selectedRow.removeChild(selectedRow.lastChild);
        elementsDragged--;
        console.log(removedElement);
        switch(removedElement) {
            case document.getElementsByClassName('hundreds-resized'):
                hundredCounter--;
                break;
            case document.getElementsByClassName('tens-resized'):
                tensCounter--;
                break;
            case document.getElementsByClassName('ones'):
                onesCounter--;
                break;
        }
    }
}
