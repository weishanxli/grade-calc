let numAssignments = 1;
let totalScore = 0;
let totalWeight = 0;
let totalCategoryWeight = 0;

assignmentOne = new Assignment("assignment 1")
let allAssignments = [];
allAssignments.push(assignmentOne);

let subassignmentArr = [];

//calculates grade from the grades and weights in input boxes
function calculateGrade() {

    //resets category grades
    removeElement("subAnswerDiv");
    let newsubAnswerDiv = document.createElement("DIV");
    newsubAnswerDiv.id = "subAnswerDiv";
    document.getElementById("answerDiv").appendChild(newsubAnswerDiv);
    
    //initializes input error to false
    let inputError = false;
    
    //loop that checks and throws errors on input, otherwise calculatates category grades and total grade and appends them to answerDiv
    for (j = 1; j <= numAssignments; j++) {
        let totalSubScore = 0;
        let totalSubWeight = 0;

        //loop for error checks and category grades
        for (k = 1; k <= allAssignments[j-1].numSubassignments; k++) {
            let subGrade = document.getElementById("subGrade " + k + j);
            let subWeight = document.getElementById("subWeight " + k + j);

            let isGradeNum = isNaN(subGrade.value);
            let isWeightNum = isNaN(subWeight.value);
            
            if (isGradeNum == true || isWeightNum == true || subGrade.value == "" || subWeight.value == "") {
                inputError = true;
                alert("Grade and weight of assignments must be filled in. Inputs must contain only digits");
                break;
            } else {
                if (subGrade.value < 0 || subGrade.value > 100 || subWeight.value < 0 || subWeight.value > 100) {
                    inputError = true;
                    alert("Grade and/or weight of subassignment " + k + " of assignment category " + j + " must be between 0 and 100");
                    break;
                } else {
                    totalSubScore += subGrade.value * (subWeight.value / 100);
                    totalScore += subGrade.value * (subWeight.value / 100);
                    totalSubWeight += parseInt(subWeight.value);
                    totalWeight += parseInt(subWeight.value);
                }
            }
        }

        //error checks and creates new category grade
        if (totalSubWeight < 0 || totalSubWeight > 100) {
            alert("Check total weights. Total weight of assignments must be between 0% and 100%");
            inputError = true;
        } else {
            if (inputError == false) {
                createNewGradeAnswer(j, totalSubScore, document.getElementById("categoryWeight " + j).value);
            }
        }

        totalSubWeight = 0;
        totalSubScore = 0;
    }

    //error checks and appends total grade and calculates potential grade
    if (totalWeight < 0 || totalWeight > 100 || totalCategoryWeight > 100 || totalCategoryWeight < 0) {
        alert("Check total weights. Total weight of assignments must be between 0% and 100%");
        inputError = true;
    } else {
        document.getElementById("totalGrade").innerHTML = "Current Class Grade: " + totalScore;

        let potentialScore = totalScore + (100 - totalWeight);
        document.getElementById("potentialGrade").innerHTML = "Max Potential Grade in Class: " + potentialScore;
    }

    //resets potential score, total weights, and total current grades
    potentialScore = 0;
    totalSubWeight = 0;
    totalSubScore = 0;
    totalWeight = 0;
    totalScore = 0;
}

//creates new grade answer div for new assignment category
function createNewGradeAnswer(assignment, grade, subWeight) {

    let categoryWeight = document.getElementById("categoryWeight " + assignment).value;

    let newAnswerLabel = document.createElement("B");
    let assignmentName = document.getElementById("categoryName " + assignment).value;
    newAnswerLabel.innerHTML = "Current " + assignmentName + " Grade: " + grade + " points out of " + categoryWeight;

    document.getElementById("subAnswerDiv").appendChild(document.createElement("BR"));
    document.getElementById("subAnswerDiv").appendChild(newAnswerLabel);
}

//adds additional assignment
function addAssignment() {

    //increments number of assignments then creates new Assignment object
    numAssignments ++;
    newAssignment = new Assignment("assignment " + numAssignments);
    allAssignments.push(newAssignment);

    //creating new assignmentDiv to append to allAssignmentsDivs
    let newAssignmentDiv = document.createElement("DIV");
    newAssignmentDiv.id = "assignmentsDiv " + numAssignments;
    document.getElementById("allAssignmentsDiv").appendChild(newAssignmentDiv);

    //creating new assignment category label and appending
    let newLabel = document.createElement("LABEL");
    newLabel.className = "labels";
    newLabel.id = "label " + numAssignments;
    newLabel.innerHTML = "Assignment Category " + numAssignments;
    newAssignmentDiv.appendChild(document.createElement("BR"));
    newAssignmentDiv.appendChild(newLabel);
    
    //creating new assignment catergory name input box and appending
    let newAssignmentName = document.createElement("INPUT");
    newAssignmentName.type = "text";
    newAssignmentName.placeholder = "Name...";
    newAssignmentName.id = "categoryName " + numAssignments;
    newAssignmentDiv.appendChild(newAssignmentName);

    //creating new total weight input box and appending
    newAssignmentDiv.appendChild(document.createElement("BR"));
    let newTotalWeight = document.createElement("INPUT");
    newTotalWeight.type = "text";
    newTotalWeight.placeholder = "Total Weight...";
    newTotalWeight.id = "categoryWeight " + numAssignments;
    newAssignmentDiv.appendChild(newTotalWeight);
    
    //creating percent elements and appending
    let percent1 = document.createElement("B");
    let percent2 = document.createElement("B");
    let percent3 = document.createElement("B");
    percent1.innerHTML = " %";
    percent2.innerHTML = " %";
    percent3.innerHTML = " %";
    newAssignmentDiv.appendChild(percent1);

    //creating sub label and appending
    newAssignmentDiv.appendChild(document.createElement("BR"));
    let subAssignmentLabel1 = document.createElement("LABEL");
    subAssignmentLabel1.className = "sublabels";
    subAssignmentLabel1.innerHTML = "Subassignment 1";
    newAssignmentDiv.appendChild(subAssignmentLabel1);

    //creating new sub1 grade input box and appending
    newAssignmentDiv.appendChild(document.createElement("BR"));
    let newSubGrade1 = document.createElement("INPUT");
    newSubGrade1.type = "text";
    newSubGrade1.placeholder = "Grade...";
    newSubGrade1.id = "subGrade 1" + numAssignments;
    newAssignmentDiv.appendChild(newSubGrade1);
    newAssignmentDiv.appendChild(percent2);

    //creating new sub1 weight input box and appending
    newAssignmentDiv.appendChild(document.createElement("BR"));
    let newSubWeight1 = document.createElement("INPUT");
    newSubWeight1.type = "text";
    newSubWeight1.placeholder = "Weight...";
    newSubWeight1.id = "subWeight 1" + numAssignments;
    newAssignmentDiv.appendChild(newSubWeight1);
    newAssignmentDiv.appendChild(percent3);

    //creating new sub div for future sub assignments and appending
    let newSubDiv = document.createElement("DIV");
    newSubDiv.id = "subassignmentsDiv " + numAssignments;
    newAssignmentDiv.appendChild(newSubDiv);
    
    const currentAssignmentNum = numAssignments;

    //creating new add sub button and appending
    newAssignmentDiv.appendChild(document.createElement("BR"));
    let newAddSub = document.createElement("BUTTON");
    newAddSub.className = "subButtons";
    newAddSub.innerHTML = "Add Subassignment";
    newAddSub.onclick = function() {addSubassignment(currentAssignmentNum)};
    newAssignmentDiv.appendChild(newAddSub);

    let space = document.createElement("B");
    space.innerHTML = " ";

    //creating new remove sub button and appending
    newAssignmentDiv.appendChild(space);
    let newRemoveSub = document.createElement("BUTTON");
    newRemoveSub.className = "subButtons";
    newRemoveSub.innerHTML = "Remove Subassignment";
    newRemoveSub.onclick = function() {removeSubassignment(currentAssignmentNum)}
    newAssignmentDiv.appendChild(newRemoveSub);

}

function addSubassignment(assignmentNumber){

    currentAssignment = allAssignments[assignmentNumber-1];
    currentAssignment.numSubassignments++;

    let newSubDiv = document.createElement("DIV");
    newSubDiv.id = "subDiv " + currentAssignment.numSubassignments + " of " + assignmentNumber 
    document.getElementById("subassignmentsDiv " + assignmentNumber).appendChild(newSubDiv);

    let newLabel = document.createElement("LABEL");
    newLabel.className = "sublabels";
    newLabel.innerHTML = "Subassignment " + currentAssignment.numSubassignments;

    let newSubGrade = document.createElement("INPUT");
    newSubGrade.type = "text";
    newSubGrade.placeholder = "Grade...";
    newSubGrade.id = "subGrade " + currentAssignment.numSubassignments + assignmentNumber;

    let newSubWeight = document.createElement("INPUT");
    newSubWeight.type = "text";
    newSubWeight.placeholder = "Weight...";
    newSubWeight.id = "subWeight " + currentAssignment.numSubassignments + assignmentNumber;

    let percent1 = document.createElement("B");
    let percent2 = document.createElement("B");
    percent1.innerHTML = "%";
    percent2.innerHTML = "%";

    appendId(newSubDiv.id, document.createElement("BR"));
    appendId(newSubDiv.id, newLabel);

    appendId(newSubDiv.id, document.createElement("BR"));
    appendId(newSubDiv.id, newSubGrade);
    appendId(newSubDiv.id, percent1);
    
    appendId(newSubDiv.id, document.createElement("BR"));
    appendId(newSubDiv.id, newSubWeight);
    appendId(newSubDiv.id, percent2);

}

function appendId(parent, child) {
    document.getElementById(parent).appendChild(child);
}

//clears everything back to one assignment
function clearAll() {
    for (i = numAssignments; i > 1; i--) {
        removeElement("assignmentsDiv " + i);
    }
    for (i = allAssignments[0].numSubassignments; i > 1; i--) {
        removeElement("subDiv " + i + " of 1");
    }
    numAssignments = 1;
    totalScore = 0;

    document.getElementById("categoryName 1").value = null;
    document.getElementById("categoryWeight 1").value = null;
    document.getElementById("subGrade 11").value = null;
    document.getElementById("subWeight 11").value = null;
    document.getElementById("totalGrade").innerHTML = "Current Class Grade: ??";
    document.getElementById("potentialGrade").innerHTML = "Max Potential Grade in Class: ??";

    for (i = allAssignments.length; i>1; i--) {
        allAssignments.pop();
    }
    allAssignments[0].numSubassignments = 1;
}

//removes the last assignment
function removeAssignment() {
    if (numAssignments > 1) {
        removeElement("assignmentsDiv " + numAssignments);
        numAssignments--;
    }
}

//removes the last subassignment
function removeSubassignment(numAssignment) {
    let currentAssignment = allAssignments[numAssignment-1];
    if (currentAssignment.numSubassignments > 1) {
        removeElement("subDiv " + currentAssignment.numSubassignments + " of " + numAssignment);
        currentAssignment.numSubassignments--;
    }
}

//removes element with id
function removeElement(elementID) {
    let element = document.getElementById(elementID);
    element.parentNode.removeChild(element);
}

//Assignment and subassignment object
function Assignment(id) {
    this.id = id;

    let numSubassignments = 1;
    this.numSubassignments = numSubassignments;
}

function Subassignment(grade, weight) {
    this.grade = grade;
    this.weight = weight;
}