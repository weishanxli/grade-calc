let numAssignments = 1;
let totalScore = 0;

//calculates grade from the grades and weights in input boxes
function calculateGrade() {
    let i = 1;
    let totalWeight = 0;
    let gradeError = false;
    let inputError = false;
    
    //calculates total score and also checks for errors
    for (i = 1; i<=numAssignments; i++) {
        let assignmentGrade = document.getElementById("grade " + i);
        let assignmentWeight = document.getElementById("weight " + i);
        console.log(assignmentGrade.value);

        let isGradeNum = isNaN(document.getElementById("grade " + i).value);
        let isWeightNum = isNaN(document.getElementById("weight " + i).value);

        if (isGradeNum == true || isWeightNum == true || assignmentGrade.value == "" || assignmentWeight.value == "") {
            inputError = true;
            alert("Grade and weight of assignments must be filled in and be integers");
            break;
        } else {
            weightDec = assignmentWeight.value / 100;
                    
            if (weightDec < 0 || weightDec > 1) {
                alert("Weight of assignment " + i + " must be between 0 and 100");
                gradeError = true;
                break;
            } else {
                if (assignmentGrade.value < 0 || assignmentGrade.value > 100) {
                    alert("Grade of assignment " + i + " must be between 0 and 100");
                    gradeError = true;
                    break;
                } else {
                    score = document.getElementById("grade " + i).value * weightDec;
                    totalScore += score;
            
                    totalWeight += weightDec;
                }
            }
        }
    }

    if (totalWeight < 0 || totalWeight > 1) {
        alert("Check total weights. Total weight of assignments must be between 0% and 100%");
    } else {
        if (gradeError == false && inputError == false) {
            //displays total current grade
            document.getElementById("answer").innerHTML = totalScore;

            //displays max potential grade
            let potentialScore = totalScore + (100 - (totalWeight*100));
            document.getElementById("potential").innerHTML = potentialScore;
        }
    }

    //resets potential score, total weight, and total current grade
    potentialScore = 0;
    totalWeight = 0;
    totalScore = 0;
}

//adds additional assignment
function addAssignment() {

    //increments number of assignments, then creates and ids new label
    numAssignments ++;
    let newLabel = document.createElement("LABEL");
    newLabel.className = "labels";
    newLabel.id = "label " + numAssignments;
    newLabel.innerHTML = "Assignment " + numAssignments;
    
    //creates new grade and weight input boxes
    let newGrade = document.createElement("INPUT");
    let newWeight = document.createElement("INPUT");
    newGrade.type = "text";
    newWeight.type = "text";
    newGrade.placeholder = "Grade...";
    newWeight.placeholder = "Weight...";

    //ids new grade and weight input boxes
    newGrade.id = "grade " + numAssignments;
    newWeight.id = "weight " + numAssignments;

    //creating percent signs after input boxes
    let percent1 = document.createElement("B");
    let percent2 = document.createElement("B");
    percent1.innerHTML = "%";
    percent2.innerHTML = "%";
    percent1.id = "percent1";
    percent2.id = "percent2";

    //creating assignmentsDiv variable
    let assignmentsDiv = document.getElementById("assignmentsDiv");

    //appending everything from earlier into assignmentsDiv
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

//clears everything back to one assignment
function clearAll() {
    //removing current assignmentsDiv, resetting numAssignments and total
    removeElement("assignmentsDiv");
    numAssignments = 1;
    totalScore = 0;
    document.getElementById("grade 1").value = null;
    document.getElementById("weight 1").value = null;
    document.getElementById("answer").innerHTML = "??";
    document.getElementById("potential").innerHTML = "??";
    
    //creating new assignmentsDiv
    let newAssignmentsDiv = document.createElement("DIV");
    newAssignmentsDiv.id = "assignmentsDiv";
    document.getElementById("allAssignments").appendChild(newAssignmentsDiv);
}

//removes element with id
function removeElement(elementID) {
    let element = document.getElementById(elementID);
    element.parentNode.removeChild(element);
}

function removeAssingment() {
    
}