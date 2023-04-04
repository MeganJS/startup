//lets set up the project class, shall we?
class Project {
    constructor(projectName) {
        this.name = projectName;
        this.blocklist = [];
    }
}

//and now, let's initialize a projectList
let projectList = [];
const projectStorage = localStorage.getItem("projectList");

if (projectStorage) {
    projectList = JSON.parse(projectStorage);
}
else {
    localStorage.setItem("projectList", JSON.stringify(projectList));
}

const projectNameEl = document.querySelector("#nameOfProject");
let currentProject;
const currentStorage = localStorage.getItem("currentProject");

if (currentStorage){
    currentProject = JSON.parse(currentStorage);
    projectNameEl.textContent = currentProject.name;
}
else {
    let newName = `Project ${projectList.length}`;
    currentProject = new Project(newName);
    projectList.push(currentProject);
    projectNameEl.textContent = newName;
    localStorage.setItem("currentProject", JSON.stringify(currentProject));
    localStorage.setItem("projectList", JSON.stringify(projectList));   
}


function editProjectTitle() {
    document.querySelector("#projectTitle").style.display = "none";
    document.querySelector("#projectTitleEdit").style.display = "flex";
}

function saveProjectTitle() {
    let newName = document.querySelector("#projectTitleInput").value;
    currentProject.name = newName;
    projectNameEl.textContent = newName;
    localStorage.setItem("currentProject", JSON.stringify(currentProject));
    localStorage.setItem("projectList", JSON.stringify(projectList));
    document.querySelector("#projectTitle").style.display = "flex";
    document.querySelector("#projectTitleEdit").style.display = "none";
}

function cancelProjectTitle(){
    document.querySelector("#projectTitle").style.display = "flex";
    document.querySelector("#projectTitleEdit").style.display = "none";
}


const editProjectTitleEl = document.querySelector("#editProjectName");
const saveProjectTitleEl = document.querySelector("#saveNewTitle");
const cancelProjectTitleEl = document.querySelector("#cancelNewTitle");
editProjectTitleEl.addEventListener('click', editProjectTitle);
saveProjectTitleEl.addEventListener('click', saveProjectTitle);
cancelProjectTitleEl.addEventListener('click', cancelProjectTitle);



//let's do some blocklist stuff



