"use strict";
// Define the Course structure
var Course = /** @class */ (function () {
    function Course(name, lessons, visible) {
        this.name = name;
        this.lessons = lessons;
        this.visible = visible;
    }
    return Course;
}());
var Lesson = /** @class */ (function () {
    function Lesson(type, from, to, day, visible) {
        this.type = type;
        this.from = from;
        this.to = to;
        this.day = day;
        this.visible = visible;
    }
    return Lesson;
}());
var Weekday;
(function (Weekday) {
    Weekday["monday"] = "monday";
    Weekday["tuesday"] = "tuesday";
    Weekday["wednesday"] = "wednesday";
    Weekday["thursday"] = "thursday";
    Weekday["friday"] = "friday";
})(Weekday || (Weekday = {}));
var LessonType;
(function (LessonType) {
    LessonType["V"] = "V";
    LessonType["U"] = "U";
    LessonType["A"] = "A";
})(LessonType || (LessonType = {}));
var courses = [];
function renderCourses() {
    var courseList = document.getElementById('courseList');
    courseList.innerHTML = ''; // Clear the previous course list
    // Render each course in the array
    courses.forEach(function (course, index) {
        var courseDiv = document.createElement('div');
        courseDiv.className = 'course-item';
        courseDiv.style.display = course.visible ? 'flex' : 'none'; // Hide if not visible
        courseDiv.innerHTML = "\n        <span>".concat(course.name, ", ").concat(course.lessons.type, ", ").concat(course.lessons.day, ", ").concat(course.lessons.from, " - ").concat(course.lessons.to, " </span>\n        <button class=\"toggle-btn\" data-index=\"").concat(index, "\">").concat(course.visible ? 'Hide' : 'Show', "</button>\n      ");
        courseList.appendChild(courseDiv);
    });
    // Add event listeners to all toggle buttons
    document.querySelectorAll('.toggsle-btn').forEach(function (button) {
        button.addEventListener('click', function (event) {
            var target = event.target;
            var index = parseInt(target.dataset.index);
            toggleCourseVisibility(index);
        });
    });
}
// Function to toggle visibility of a course
function toggleCourseVisibility(index) {
    courses[index].visible = !courses[index].visible;
    renderCourses();
}
// Function to add a new course
function addCourse(name, day, from, to) {
    var type = LessonType.V;
    var lesson = new Lesson(type, from, to, stringToEnum(Weekday, day), true);
    courses.push(new Course(name, lesson, true));
    renderCourses();
}
function addExistingCourse(name, day, from, to) {
    var type = LessonType.V;
    var lesson = new Lesson(type, from, to, stringToEnum(Weekday, day), true);
    var id = "".concat(lesson.day, "-").concat(lesson.from);
    console.log(id);
    var course = new Course(name, lesson, true);
    courses.push(course);
    renderCourses();
    addToTimetable(name, lesson);
    var cell = document.getElementById("monday-8");
    if (cell === null) {
        console.error("Could not find cell");
        return;
    }
    var eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.textContent = name;
    cell.appendChild(eventDiv);
}
function addToTimetable(name, lesson) {
    var id = "".concat(lesson.day, "-").concat(lesson.from);
    console.log("id");
    var cell = document.getElementById(id);
    if (cell === null) {
        console.error("Could not find cell");
        return;
    }
    var eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.textContent = name;
    cell.appendChild(eventDiv);
}
function stringToEnum(enumObj, value) {
    return enumObj[value];
}
// Add event listener to the form submission
document.getElementById('courseForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page
    var nameInput = document.getElementById('courseName');
    var dayInput = document.getElementById('courseDay');
    var fromInput = document.getElementById('courseFrom');
    var toInput = document.getElementById('courseTo');
    var name = nameInput.value;
    var day = dayInput.value;
    var from = fromInput.value;
    var to = toInput.value;
    var buttonID = event.submitter.id;
    if (buttonID === 'add') {
        addCourse(name, day, from, to);
    }
    else if (buttonID === 'addExisting') {
        addExistingCourse(name, day, from, to);
    }
    // Clear the input fields after adding the course
    nameInput.value = '';
    dayInput.value = '';
    fromInput.value = '';
    toInput.value = '';
});
