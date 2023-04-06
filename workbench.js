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
function addBlock(){
    const blockId = `${blocklist.length}`;
    const parentEl = document.querySelector("#building-block-stage");
    
    const newBlock = document.createElement("div");
    newBlock.class = "card";
    newBlock.id = "building-block";
    newBlock.setAttribute("name", blockId);


    const typeSelect = document.createElement("select");
    typeSelect.class = "form-select form-select-sm";
    typeSelect.setAttribute("aria-label", "block-type-select");
    typeSelect.id = "block-type-select";
    typeSelect.innerHTML="<option selected value=\"Element\" style=\"background-color:dimgrey; color:white;\">Element</option><option value=\"Person\" style=\"background-color: dimgrey; color: white;\">Person</option>"

    newBlock.appendChild(typeSelect);

    const nameInput = document.createElement("input");
    nameInput.type="text";
    nameInput.class="form-control";
    nameInput.id="blockTitleInput";
    nameInput.setAttribute("placeholder", "block name");
    nameInput.setAttribute("aria-label", "block name");
    
    newBlock.appendChild(nameInput);

    const buttonHolder = document.createElement("div");
    buttonHolder.class="container-fluid bg-transparent";
    buttonHolder.setAttribute("style", "display:flex; justify-content:space-between;")

    const saveBlockBtn = document.createElement("button");
    saveBlockBtn.setAttribute("type", "button");
    saveBlockBtn.setAttribute("aria-label", "save block");
    saveBlockBtn.class="btn btn-success btn-sm p-0";
    saveBlockBtn.id="saveBlockBtn";
    saveBlockBtn.innerHTML="<i class=\"bi bi-check-square bg-transparent m-0 p-0\" style=\"color:black;\"></i>"
    //Add even listener for save button

    buttonHolder.appendChild(saveBlockBtn);

    const deleteBlockBtn = document.createElement("button");
    deleteBlockBtn.setAttribute("type", "button");
    deleteBlockBtn.setAttribute("aria-label", "delete block");
    deleteBlockBtn.class="btn btn-warning btn-sm p-0";
    deleteBlockBtn.id="deleteBlockBtn";
    deleteBlockBtn.innerHTML="<i class=\"bi bi-trash bg-transparent m-0 p-0\" style=\"color:black;\"></i>"
    //Add event listener for delete button

    buttonHolder.appendChild(deleteBlockBtn);

    newBlock.appendChild(buttonHolder);

    const bbTags = document.createElement("div");
    bbTags.class="container-fluid p-1";
    bbTags.id="bb-tags";

    const connectBtn = document.createElement("button");
    connectBtn.setAttribute("type", "button");
    connectBtn.setAttribute("aria-label", "connect");
    connectBtn.class="btn btn-light btn-sm";
    connectBtn.id="connectBtn";
    connectBtn.textContent = "+connect";
    //Add listener event for connect button

    bbTags.appendChild(connectBtn);

    newBlock.appendChild(bbTags);

    parentEl.appendChild(newBlock);
    //add listener events here
}



function saveBlock(blockIdString){
    const block = {blockId: "", name:"", taglist:[]};
    block.blockId = blockIdString;
    const blockEl = document.querySelector(`div[name="${blockIdString}"]`);
    const childList = blockEl.childNodes;
    for(const child of childList) {
        if(child.id === "blockTitleInput"){
            block.name = child.value;
        }
        else if (child.id === "bb-tags"){
            for(const tag of child.childNodes){
                taglist.push(tag.textContent); // I'm going to store these as spans I think
            }
        }
    }

    currentProject.blocklist.push(block);
    localStorage.setItem("currentProject", JSON.stringify(currentProject));
    localStorage.setItem("projectList", JSON.stringify(projectList));
}


function deleteBlock(blockIdString){
    var deleteIndex = 0;
    for (const block of currentProject.blocklist){
        if (block.blockId === blockIdString){
            deleteIndex = blocklist.indexOf(block);
            currentProject.blocklist.splice(deleteIndex, 1);
            console.log(`deleted block ${blockIdString}`);
            localStorage.setItem("currentProject", JSON.stringify(currentProject));
            localStorage.setItem("projectList", JSON.stringify(projectList));
            updateBlocksRemove(blockIdString);
            break;
        }
    }
}

function updateBlocksRemove(blockIdString){
    const blockEl = document.querySelector(`div[name="${blockIdString}"]`);
    while(blockEl.firstChild){
        blockEl.removeChild(blockEl.firstChild); //will this cause problems if child elements have children?
    }
    blockEl.parentElement.removeChild(blockEl);
}


//TODO add back button

