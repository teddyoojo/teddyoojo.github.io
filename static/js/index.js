var hundreds = document.querySelector('.hundreds');
const tens = document.querySelector('.tens');
const ones = document.querySelector('.ones');
const countField = document.querySelector('.count-field');
const columnTwo = document.querySelector('.col-4');
var currentlyDragged;
enableHundreds();
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

function dragEndOnes() {
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
    console.log(hundreds);
    this.className = 'count-field';
    countField.append(currentlyDragged);
    currentlyDragged.setAttribute("draggable", "false");
    console.log(hundreds);
    if(currentlyDragged === hundreds) {
        var tag = document.createElement("div");
        tag.classList.add("hundreds");
        tag.setAttribute("draggable", "true");
        hundreds = tag;
        columnTwo.append(tag);
    }
    enableHundreds();
    console.log(hundreds);
}

function enableHundreds() {
    hundreds.addEventListener('dragstart', dragStartHundreds);
    hundreds.addEventListener('dragend', dragEndHundreds);
}
