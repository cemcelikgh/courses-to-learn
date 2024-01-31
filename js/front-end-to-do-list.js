//  Query Sellectors

const courseInput = document.querySelector("#course-input");
const coursesList = document.querySelector("#courses-list");

//  Event Listeners

document.addEventListener("DOMContentLoaded", loadAllCoursesToUserInterface);

//  Functions

function addCourse() {
  let newCourse = courseInput.value.trim();
  if(newCourse === "") {
    $('#errorToast').toast('show')
  } else {
    addCourseToUserInterface(newCourse);
    addCourseToLocalStorage(newCourse);
    $('#successToast').toast('show')
  }
}

function addCourseToUserInterface(course, courseSituation = "no-checkmark") {
  const listCourse = document.createElement("li");
  const noCheckmark = document.createElement("span");
  noCheckmark.className = courseSituation;
  listCourse.appendChild(noCheckmark);
  listCourse.appendChild(document.createTextNode(course));
  const removeCourse = document.createElement("span");
  removeCourse.className = "close remove";
  removeCourse.innerHTML = "&times;";
  listCourse.appendChild(removeCourse);
  coursesList.appendChild(listCourse);
  listCourse.addEventListener("click", checked);
  removeCourse.addEventListener("click", deleteCourse);
}

function getCoursesFromLocalStorage() {
  let coursesFLC;
  if (localStorage.getItem("courses") === null) {
    coursesFLC = [];
  } else {
    coursesFLC = JSON.parse(localStorage.getItem("courses"));
  }
  return coursesFLC;
}

function loadAllCoursesToUserInterface() {
  let courses = getCoursesFromLocalStorage();
  courses.forEach(course => {
    addCourseToUserInterface(course[0], course[1]);
  });
}

function checked(check) {
  let coursesFLS = getCoursesFromLocalStorage();
  let courses = [];
  let text = check.target.textContent;
  coursesFLS.forEach(course => {
    if (course[0] !== text.slice(0, text.length - 1)) {
      courses.push(course);
    } else {
      if (course[1] === "no-checkmark") {
        course[1] = "checkmark";
        check.target.firstElementChild.className = "checkmark";
        courses.push(course);
        } else {
          course[1] = "no-checkmark";
          check.target.firstElementChild.className = "no-checkmark";
          courses.push(course);
        }
    }
  });
  localStorage.setItem("courses", JSON.stringify(courses));
}

function addCourseToLocalStorage(course, courseSituation = "no-checkmark") {
  let coursesFLS = getCoursesFromLocalStorage();
  let courCSit = [course,courseSituation];
  coursesFLS.push(courCSit);
  localStorage.setItem("courses", JSON.stringify(coursesFLS));
}

function deleteCourse(x) {
  x.target.parentElement.remove();
  let coursesFLS = getCoursesFromLocalStorage();
  let removeCourse = x.target.parentElement.textContent;
  removeCourse = removeCourse.slice(0, removeCourse.length - 1);
  console.log(removeCourse);
  coursesFLS.forEach(course => {
    if (course[0] === removeCourse) {
      let i = coursesFLS.indexOf(course);
      coursesFLS.splice(i, 1);
    }
  });
  localStorage.setItem("courses", JSON.stringify(coursesFLS));
}