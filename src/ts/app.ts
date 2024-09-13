// Define the Course structure
class Course {
  constructor(
    public name: string,
    public lessons: Lesson,
    public visible: boolean
  ) { }
}

class Lesson {
  constructor(
    public type: LessonType,
    public from: string,
    public to: string,
    public day: Weekday,
    public visible: boolean
  ) { }
}
enum Weekday {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday"
}
enum LessonType {
  V = "V",
  U = "U",
  A = "A"
}

let courses: Course[] = [];

function renderCourses() {
  const courseList = document.getElementById('courseList')!;
  courseList.innerHTML = '';  // Clear the previous course list

  // Render each course in the array
  courses.forEach((course, index) => {
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-item';
    courseDiv.style.display = course.visible ? 'flex' : 'none';  // Hide if not visible

    courseDiv.innerHTML = `
        <span>${course.name}, ${course.lessons.type}, ${course.lessons.day}, ${course.lessons.from} - ${course.lessons.to} </span>
        <button class="toggle-btn" data-index="${index}">${course.visible ? 'Hide' : 'Show'}</button>
      `;

    courseList.appendChild(courseDiv);
  });

  // Add event listeners to all toggle buttons
  document.querySelectorAll('.toggsle-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      const index = parseInt(target.dataset.index!);
      toggleCourseVisibility(index);
    });
  });
}

// Function to toggle visibility of a course
function toggleCourseVisibility(index: number) {
  courses[index].visible = !courses[index].visible;
  renderCourses();
}

// Function to add a new course
function addCourse(name: string, day: string, from: string, to: string) {
  const type = LessonType.V;
  const lesson = new Lesson(type, from, to, stringToEnum(Weekday, day), true);

  courses.push(new Course(name, lesson, true));

  renderCourses();
}

function addExistingCourse(name: string, day: string, from: string, to: string) {
  const type = LessonType.V;
  const lesson = new Lesson(type, from, to, stringToEnum(Weekday, day), true);

  const id = `${lesson.day}-${lesson.from}`
  console.log(id);

  const course = new Course(name, lesson, true)

  courses.push(course);

  renderCourses();

  addToTimetable(name, lesson);

  const cell = document.getElementById("monday-8");

  if (cell === null) {
    console.error("Could not find cell");
    return;
  }
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('event');
  eventDiv.textContent = name;
  cell.appendChild(eventDiv);
}

function addToTimetable(name: string, lesson: Lesson) {
  const id = `${lesson.day}-${lesson.from}`
  console.log("id");
  const cell = document.getElementById(id);

  if (cell === null) {
    console.error("Could not find cell");
    return;
  }
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('event');
  eventDiv.textContent = name;
  cell.appendChild(eventDiv);

}

function stringToEnum<T>(enumObj: T, value: string): T[keyof T] {
  return enumObj[value as keyof T];
}


// Add event listener to the form submission
document.getElementById('courseForm')!.addEventListener('submit', (event) => {
  event.preventDefault();  // Prevent form from refreshing the page



  const nameInput = document.getElementById('courseName') as HTMLInputElement;
  const dayInput = document.getElementById('courseDay') as HTMLSelectElement;
  const fromInput = document.getElementById('courseFrom') as HTMLInputElement;
  const toInput = document.getElementById('courseTo') as HTMLInputElement;


  const name = nameInput.value;
  const day = dayInput.value;
  const from = fromInput.value;
  const to = toInput.value;

  const buttonID = event.submitter!.id;
  if (buttonID === 'add') {
    addCourse(name, day, from, to);
  } else if (buttonID === 'addExisting') {
    addExistingCourse(name, day, from, to);
  }

  // Clear the input fields after adding the course
  nameInput.value = '';
  dayInput.value = '';
  fromInput.value = '';
  toInput.value = '';
});
