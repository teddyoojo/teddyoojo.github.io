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
//#endregion

window.onload = function() {
    var randomNumber =  Math.floor(Math.random() * 1000);
    const exercise = "Bitte geben sie folgende Zahl mit den Zahlenfeldern an: " + randomNumber;
    document.getElementById('exercise').innerHTML = exercise;
    document.getElementById('display-number').innerHTML = "Die angegebene Zahl ist: 0";
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
            } else if (hundredCounter < 10) {
                rowTwo.append(tag);
            }
            hundredCounter++;
            break;
        case tens:
            var tag = document.createElement("div");
            tag.classList.add("tens-resized");
            if(tensCounter < 5) {
                rowThree.append(tag);
            } else if(tensCounter < 10) {
                rowFour.append(tag);
            }
            tensCounter++;
            break;
        case ones:
            if(onesCounter < 10) {
                var tag = document.createElement("div");
                tag.classList.add("ones");
                rowFive.append(tag);
            }
            onesCounter++;
            break;
        default: 
            break;
    }
    totalNumber = hundredCounter * 100 + tensCounter*10 + onesCounter;
    const displayText = "Die angegebene Zahl " + totalNumber;
    document.getElementById('display-number').innerHTML = displayText;
}
