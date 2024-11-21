var teamNames = ["Dorian", "Megnauth"];
// Done by Dorian - targeting all html elements
const userInput = document.querySelector("#student-grades");
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

var avg = 0;

// Done by Dorian - sorted grades array into sorted array and found median
function median() {
  sorted = [...grades].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

// Done by Dorian - calculates average of the grades
function average() {
  avg = grades.reduce((a, b) => a + b, 0) / grades.length;
  return avg.toFixed(2);
}

// Done by Megnauth and Dorian - asserts that input entered is correct and displays all functions in their respective container
function addGradeAndDisplay() {
  const gradeInput = userInput.value;
  const grade = parseFloat(gradeInput);

  if (!isNaN(grade) && grade >= 0 && grade <= 100) {
    grades.push(grade);

    userInput.value = "";

    // Highlighting grades based on ranges
    enteredGrades.innerHTML = `Grades Entered: ${grades
      .map((grade) => {
        let gradeClass = "";
        if (grade >= 85) {
          gradeClass = "green";
        } else if (grade >= 75 && grade <= 84) {
          gradeClass = "dark-yellow";
        } else if (grade >= 65 && grade <= 74) {
          gradeClass = "orange";
        } else {
          gradeClass = "red";
        }
        return `<span class="${gradeClass}">${grade}</span>`;
      })
      .join(", ")}`;

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

// Done by Dorian - if grade is above 65 it is passing
function passing() {
  return grades.filter((grade) => grade >= 65).length;
}

// Done by Megnauth - if grade is below 65 it is failing
function failing() {
  return grades.filter((grade) => grade < 65).length;
}

// Done by Megnauth - converts number grade to letter grade
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

// Done by Megnauth - converts letter grade to college 4.0 scale
function collegeScale(letterGrade) {
  const scale = {
    "A+": "4.0",
    A: "4.0",
    "A-": "3.7",
    "B+": "3.3",
    B: "3.0",
    "B-": "2.7",
    "C+": "2.3",
    C: "2.0",
    "C-": "1.7",
    "D+": "1.3",
    D: "1.0",
    "E/F": "0.0",
  };
  return scale[letterGrade] || "N/A";
}

// Done by Megnauth - when calculate button clicked, display everything
calculate.addEventListener("click", addGradeAndDisplay);
