var teamNames = ["Dorian", "Megnauth"];
// Done by Dorian - targeting all html elements
const userInput = document.querySelector("#student-grades");
const calculate = document.querySelector("#calculate");
const enteredGrades = document.querySelector("#enteredGrades");
const studentGradeAverage = document.querySelector("#average");
const studentGradeMedian = document.querySelector("#median");
const studentGradePassing = document.querySelector("#passing");
const studentGradeFailing = document.querySelector("#failing");
const studentLetterGrade = document.querySelector("#letterGrade");
const gradeCollegeScale = document.querySelector("#collegeScale");

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
    // populates
    studentGradeAverage.textContent = `Average: ${average()}`;
    studentGradeMedian.textContent = `Median: ${median()}`;
    studentGradePassing.textContent = `Passing: ${passing()}`;
    studentGradeFailing.textContent = `Failing: ${failing()}`;
    studentLetterGrade.textContent = `Letter Grade: ${letterGrade()}`;
    gradeCollegeScale.textContent = `College 4.0 Scale: ${collegeScale(
      letterGrade()
    )}`;

    saveGradeToDB(grade); // Save the grade to IndexedDB
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
    "E/F": "0.0",
  };
  return scale[letterGrade] || "N/A";
}

// Done by Dorian - Initialize the IndexedDB database
function openDB() {
  const request = indexedDB.open("Gradebook", 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // Create object store if it doesn't exist
    if (!db.objectStoreNames.contains("grades")) {
      const objectStore = db.createObjectStore("grades", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("grade", "grade", { unique: false });
    }
  };

  request.onerror = function (event) {
    console.error("Error opening IndexedDB:", event.target.error);
  };

  return request;
}

// Done by Dorian - Save grades to IndexedDB
function saveGradeToDB(grade) {
  const request = openDB();

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction("grades", "readwrite");
    const store = transaction.objectStore("grades");

    const gradeData = { grade: grade };
    store.add(gradeData);

    transaction.oncomplete = function () {
      console.log("Grade saved to IndexedDB.");
    };

    transaction.onerror = function (event) {
      console.error("Error saving grade:", event.target.error);
    };
  };
}

// Done by Megnauth - Load grades from IndexedDB
function loadGradesFromDB() {
  const request = openDB();

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction("grades", "readonly");
    const store = transaction.objectStore("grades");

    const getAllRequest = store.getAll(); // Get all grades

    getAllRequest.onsuccess = function (event) {
      const gradesFromDB = event.target.result;
      grades = gradesFromDB.map((entry) => entry.grade); // Extract grades
      displayGrades();
    };

    getAllRequest.onerror = function (event) {
      console.error("Error loading grades:", event.target.error);
    };
  };
}

// Done by Megnuath - Display grades from the loaded data
function displayGrades() {
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
  studentGradeMedian.textContent = `Median: ${median()}`;
  studentGradePassing.textContent = `Passing: ${passing()}`;
  studentGradeFailing.textContent = `Failing: ${failing()}`;
  studentLetterGrade.textContent = `Letter Grade: ${letterGrade()}`;
  gradeCollegeScale.textContent = `College 4.0 Scale: ${collegeScale(
    letterGrade()
  )}`;
}

// Done by Dorian - Reset the gradebook and IndexedDB
function resetGradebook() {
  grades = []; // Clear the grades array

  // Clear the displayed grades
  enteredGrades.innerHTML = "Grades Entered: ";
  studentGradeAverage.textContent = "Average: ";
  studentGradeMedian.textContent = "Median: ";
  studentGradePassing.textContent = "Passing: ";
  studentGradeFailing.textContent = "Failing: ";
  studentLetterGrade.textContent = "Letter Grade: ";
  gradeCollegeScale.textContent = "College 4.0 Scale: ";

  // Remove all entries from IndexedDB
  const request = openDB();

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction("grades", "readwrite");
    const store = transaction.objectStore("grades");

    store.clear(); // Clears all grades in the object store

    transaction.oncomplete = function () {
      console.log("Gradebook reset in IndexedDB.");
    };
  };
}

// Done by Dorian - Load data when page loads
window.addEventListener("load", function () {
  loadGradesFromDB();
});

// Done by Megnauth - Event listeners for the buttons
calculate.addEventListener("click", addGradeAndDisplay);
document.getElementById("reset").addEventListener("click", resetGradebook);
