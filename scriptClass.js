let numAssignments = 1;
let totalScore = 0;

function calculateGrade() {
    let i = 1;
    let totalWeight = 0;

    for (i = 1; i<=numAssignments; i++) {
        console.log(document.getElementById("weight " + i))
        weightDec = document.getElementById("weight " + i).value / 100;
        score = document.getElementById("grade " + i).value * weightDec;
        totalScore += score;

        totalWeight += weightDec;
    }

    document.getElementById("answer").innerHTML = totalScore;

    let potentialScore = totalScore + (100 - (totalWeight*100));
    document.getElementById("potential").innerHTML = potentialScore;

    potentialScore = 0;
    totalWeight = 0;
    totalScore = 0;
}

function addAssignment() {
    numAssignments ++;
    let newLabel = document.createElement("LABEL");
    newLabel.className = "labels";
    newLabel.id = "label " + numAssignments;
    newLabel.innerHTML = "Assignment " + numAssignments;
    
    let newGrade = document.createElement("INPUT");
    let newWeight = document.createElement("INPUT");
    newGrade.type = "text";
    newWeight.type = "text";
    newGrade.placeholder = "Grade...";
    newWeight.placeholder = "Weight...";

    newGrade.id = "grade " + numAssignments;
    newWeight.id = "weight " + numAssignments;

    let percent1 = document.createElement("B");
    let percent2 = document.createElement("B");
    percent1.innerHTML = "%";
    percent2.innerHTML = "%";
    percent1.id = "percent1";
    percent2.id = "percent2";

    let assignmentsDiv = document.getElementById("assignmentsDiv");

    assignmentsDiv.appendChild(document.createElement("BR"));
    assignmentsDiv.appendChild(document.createElement("BR"));
    assignmentsDiv.appendChild(newLabel);

    assignmentsDiv.appendChild(document.createElement("BR"));
    assignmentsDiv.appendChild(newGrade);
    assignmentsDiv.appendChild(percent1);
    
    assignmentsDiv.appendChild(document.createElement("BR"));
    assignmentsDiv.appendChild(newWeight);
    assignmentsDiv.appendChild(percent2);

}

function clearAll() {
    removeElement("assignmentsDiv");
    numAssignments = 1;
    totalScore = 0;

    let newAssignmentsDiv = document.createElement("DIV");
    newAssignmentsDiv.id = "assignmentsDiv";
    document.getElementById("allAssignments").appendChild(newAssignmentsDiv);
}

function removeElement(elementID) {
    let element = document.getElementById(elementID);
    element.parentNode.removeChild(element);
}