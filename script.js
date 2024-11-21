 var teamNames = ["Dorian", "Megnauth"];

 const userInput = document.querySelector("#student-grades").value;
 const calculate = document.querySelector("#calculate");
 const enteredGrades = document.querySelector("#enteredGrades");
 const studentGradeAverage = document.querySelector("#average");
 const StudentGradeMedian = document.querySelector("#median");
 const studentGradePassing = document.querySelector("#passing");
 const StudentGradeFailing = document.querySelector("#failing");
 const StudentLetterGrade = document.querySelector("#letterGrade");
 const GradeCollegeScale = document.querySelector("#collgeScale");

var grades = [];
var sorted = [];

var gradeTestData = [
  100, 97, 96, 93, 92, 90, 89, 87, 86, 83, 82, 80, 79, 77, 76, 73, 72, 70, 69,
  67, 66, 65,
];

var avg = 0;

function median() {}

function average() {}

function addGradeAndDisplay() {
  const gradeInput = userInput.value.trim();
  const grade = parseFloat(gradeInput);

  if (!isNaN(grade) && grade >= 0 && grade <= 100) {
    gradeTestData.push(grade);

    userInput.value = "";

    enteredGrades.textContent = `Grades Entered: ${gradeTestData.join(", ")}`;
    studentGradeAverage.textContent = `Average: ${average()}`;
    StudentGradeMedian.textContent = `Median: ${median()}`;
    studentGradePassing.textContent = `Passing: ${passing()}`;
    StudentGradeFailing.textContent = `Failing: ${failing()}`;
    StudentLetterGrade.textContent = `Letter Grade: ${letterGrade()}`;
    GradeCollegeScale.textContent = `College 4.0 Scale: ${collegeScale(
      letterGrade()
    )}`;
  } else {
    alert("Please enter a valid grade between 0 and 100.");
  }
}

function passing() {}

// failing done by Megnauth
function failing() {
    return gradeTestData.filter(grade => grade < 70).length;
}
// letterGrade done by Megnauth
function letterGrade() {
   if (avg >= 97) {
    return "A+";
  } else if (avg >= 93) {
    return "A";
  } else if (avg >= 90) {
    return "A-";
  } else if (avg >= 87) {
    return "B+";
  } else if (avg >= 83) {
    return "B";
  } else if (avg >= 80) {
    return "B-";
  } else if (avg >= 77) {
    return "C+";
  } else if (avg >= 73) {
    return "C";
  } else if (avg >= 70) {
    return "C-";
  } else if (avg >= 67) {
    return "D+";
  } else if (avg >= 65) {
    return "D";
  } else {
    return "E/F";
  }
}

//Done by Megnauth
//Checks through the letters array and compares it to the current letter grade being displayed then if they are equal using the index given, display the scale from the "scale" array.
function collegeScale(letterGrade) {
    const scale = {
    "A+": "4.0",
    "A": "4.0",
    "A-": "3.7",
    "B+": "3.3",
    "B": "3.0",
    "B-": "2.7",
    "C+": "2.3",
    "C": "2.0",
    "C-": "1.7",
    "D+": "1.3",
    "D": "1.0",
    "E/F": "0.0"
    };
    return scale[letterGrade] || "N/A";
}

