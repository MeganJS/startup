//lets set up the project class, shall we?
class Project {
    constructor(projectName) {
        this.name = projectName;
        console.log(this.name);
        this.blocklist = []; //might need to stringify this so it gets stored in local storage properly
        console.log(this.blocklist);
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
    //FIXME check if currentProject is valid and if not, fix that
    //should have each property
    if(Object.hasOwn(currentProject, "name") !== true){
        Object.defineProperty(currentProject, "name", {
            value:"",
            writable:true
        });
        console.log("rewrote name");
    }
    if(Object.hasOwn(currentProject, "blocklist") !== true){
        Object.defineProperty(currentProject, "blocklist", {
            value:JSON.stringify([]),
            writable:true
        });
        console.log("rewrote blocklist");
    }
    projectNameEl.textContent = currentProject.name;
    localStorage.setItem("currentProject", JSON.stringify(currentProject));
}
else {
    let newName = `Project ${projectList.length}`;
    currentProject = new Project(newName);
    projectList.push(currentProject);
    projectNameEl.textContent = newName;
    localStorage.setItem("currentProject", JSON.stringify(currentProject));
    localStorage.setItem("projectList", JSON.stringify(projectList));   
}

//TODO: load in blocks from blocklist on opening the page
if (currentProject.blocklist.length > 0){
    for (const block of currentProject.blocklist){
        const parentEl = document.querySelector("#building-block-stage");
        const newBlock = document.createElement("div");
        newBlock.class = "card";
        //newBlock.setAttribute("style", "display:flex;");
        newBlock.id = "building-block";
        newBlock.setAttribute("name", block.blockId);


        const blockTypeEl = document.createElement("div");
        blockTypeEl.id = "bb-label-person";
        blockTypeEl.setAttribute("aria-label", `${block.blockType}`);
        blockTypeEl.textContent = `${block.blockType}`;

        const editBtnEl = document.createElement("button");
        editBtnEl.setAttribute("type", "button");
        editBtnEl.setAttribute("aria-label", "edit-block");
        editBtnEl.class = "btn btn-outline-dark btn-sm p-0";
        editBtnEl.id = "editBlockBtn";
        editBtnEl.innerHTML = "<i class=\"bi bi-pencil-square bg-transparent m-0 p-0\" style=\"color:black;\"></i>";

        blockTypeEl.appendChild(editBtnEl);

        newBlock.appendChild(blockTypeEl);

        const blockNameEl = document.createElement("div");
        blockNameEl.class="bg-transparent";
        blockNameEl.setAttribute("style", "align-self: center;")
        blockNameEl.textContent = `${block.name}`;

        newBlock.appendChild(blockNameEl);

        const blockTagsEl = document.createElement("div");
        blockTagsEl.id = "bb-tags";
        blockTagsEl.class = "container-fluid p-1";
        for (const tag of block.taglist){
            const tagEl = document.createElement("span");
            tagEl.textContent = `${tag}`;
            blockTagsEl.appendChild(tagEl); 
        }

        newBlock.appendChild(blockTagsEl);

        parentEl.appendChild(newBlock);
    }
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
    let blockId="0";
    if (currentProject.blocklist.length){
        blockId = `${currentProject.blocklist.length}`;
    }
    console.log(`${blockId}`);
    const editBlockEl = document.querySelector("#building-block-edit");
    editBlockEl.style.display = "flex";
    editBlockEl.setAttribute("name", blockId);
    //add listener events for the buttons below:
    const saveBlockBtnEl = document.querySelector("#saveBlockBtn");
    const deleteBlockBtnEl = document.querySelector("#deleteBlockBtn");
    const returnBlockBtnEl = document.querySelector("#returnBlockBtn");
    const connectBlockBtnEl = document.querySelector("#connectBtn");
    saveBlockBtnEl.addEventListener("click", () => {saveBlockNew(blockId)});
    deleteBlockBtnEl.addEventListener("click", () => {deleteBlockNew(blockId)});
    returnBlockBtnEl.addEventListener("click", () => {deleteBlockNew(blockId)});
    connectBlockBtnEl.addEventListener("click", () => {connectBlock(blockId)});

}


function saveBlockNew(blockIdString){

    const block = {blockId: "", name:"", blockType:"", taglist:[]};
    block.blockId = blockIdString;
    const blockEl = document.querySelector(`div[name="${blockIdString}"]`);
    const childList = blockEl.childNodes;
    for(const child of childList) {
        if(child.tagName === "SELECT"){
            block.blockType = child.value;
        }
        else if(child.id === "blockTitleInput"){
            block.name = child.value;
        }
        else if (child.id === "bb-tags"){
            for(const tag of child.childNodes){
                if(tag.tagName === "SPAN"){
                    block.taglist.push(tag.textContent);
                }
                 // I'm going to store these as spans I think
            }
        }
    }
    currentProject.blocklist.push(block);
    localStorage.setItem("currentProject", JSON.stringify(currentProject));
    localStorage.setItem("projectList", JSON.stringify(projectList));
    updateBlocksSaveNew(block);
}

function updateBlocksSaveNew(block){
    const editBlockEl = document.querySelector(`div[name="${block.blockId}"]`);
    //figure out what to do about edited blocks, no sense in creating them again

    const parentEl = document.querySelector("#building-block-stage");
    const newBlock = document.createElement("div");
    newBlock.class = "card";
    //newBlock.setAttribute("style", "display:flex;");
    newBlock.id = "building-block";
    newBlock.setAttribute("name", block.blockId);


    const blockTypeEl = document.createElement("div");
    blockTypeEl.id = "bb-label-person";
    blockTypeEl.setAttribute("aria-label", `${block.blockType}`);
    blockTypeEl.textContent = `${block.blockType}`;

    const editBtnEl = document.createElement("button");
    editBtnEl.setAttribute("type", "button");
    editBtnEl.setAttribute("aria-label", "edit-block");
    editBtnEl.class = "btn btn-outline-dark btn-sm p-0";
    editBtnEl.id = "editBlockBtn";
    editBtnEl.innerHTML = "<i class=\"bi bi-pencil-square bg-transparent m-0 p-0\" style=\"color:black;\"></i>";

    blockTypeEl.appendChild(editBtnEl);

    newBlock.appendChild(blockTypeEl);

    const blockNameEl = document.createElement("div");
    blockNameEl.class="bg-transparent";
    blockNameEl.setAttribute("style", "align-self: center;")
    blockNameEl.textContent = `${block.name}`;

    newBlock.appendChild(blockNameEl);

    const blockTagsEl = document.createElement("div");
    blockTagsEl.id = "bb-tags";
    blockTagsEl.class = "container-fluid p-1";
    if(block.taglist.length > 0){
        for (const tag of block.taglist){
            const tagEl = document.createElement("span");
            tagEl.textContent = `${tag}`;
            blockTagsEl.appendChild(tagEl); 
        }
    }


    newBlock.appendChild(blockTagsEl);

    parentEl.appendChild(newBlock);

    //add listener events here

    editBlockEl.setAttribute("name", "");

    //clear out the data in editBlock so it's blank again?
    const childList = editBlockEl.childNodes;
    for(const child of childList) {
        if(child.id === "blockTitleInput"){
            child.value = "";
        }
        else if (child.id === "bb-tags"){
            for(const tag of child.childNodes){
                if (tag.tagName === "SPAN"){
                    child.removeChild(tag);
                }
            }
        }
    }

    const saveBlockBtnEl = document.querySelector("#saveBlockBtn");
    const deleteBlockBtnEl = document.querySelector("#deleteBlockBtn");
    const returnBlockBtnEl = document.querySelector("#returnBlockBtn");
    const connectBlockBtnEl = document.querySelector("#connectBtn");
    saveBlockBtnEl.removeEventListener("click", () => {saveBlockNew(block.blockId)});
    deleteBlockBtnEl.removeEventListener("click", () => {deleteBlockNew(block.blockId)});
    returnBlockBtnEl.removeEventListener("click", () => {deleteBlockNew(block.blockId)});
    connectBlockBtnEl.removeEventListener("click", () => {connectBlock(block.blockId)});

    editBlockEl.style.display = "none";
}

function deleteBlockNew (blockIdString){
    //same as returnBlockNew
    const editBlockEl = document.querySelector(`div[name="${blockIdString}"]`);
    editBlockEl.setAttribute("name", "");
    
    //clear out the data in editBlock so it's blank again?
    const childList = editBlockEl.childNodes;
    for(const child of childList) {
        if(child.id === "blockTitleInput"){
            child.value = "";
        }
        else if (child.id === "bb-tags"){
            for(const tag of child.childNodes){
                if (tag.tagName === "SPAN"){
                    child.removeChild(tag);
                }
            }
        }
    }
    const saveBlockBtnEl = document.querySelector("#saveBlockBtn");
    const deleteBlockBtnEl = document.querySelector("#deleteBlockBtn");
    const returnBlockBtnEl = document.querySelector("#returnBlockBtn");
    const connectBlockBtnEl = document.querySelector("#connectBtn");
    saveBlockBtnEl.removeEventListener("click", () => {saveBlockNew(blockIdString)});
    deleteBlockBtnEl.removeEventListener("click", () => {deleteBlockNew(blockIdString)});
    returnBlockBtnEl.removeEventListener("click", () => {deleteBlockNew(blockIdString)});
    connectBlockBtnEl.removeEventListener("click", () => {connectBlock(blockIdString)});

    editBlockEl.style.display = "none";
}



function deleteBlockEdit(blockIdString){
    var deleteIndex = 0;
    for (const block of currentProject.blocklist){
        if (block.blockId === blockIdString){
            deleteIndex = currentProject.blocklist.indexOf(block);
            currentProject.blocklist.splice(deleteIndex, 1);
            console.log(`deleted block ${blockIdString}`);
            localStorage.setItem("currentProject", JSON.stringify(currentProject));
            localStorage.setItem("projectList", JSON.stringify(projectList));
            updateBlocksRemoveEdit(blockIdString);
            break;
        }
    }
}

function updateBlocksRemoveEdit(blockIdString){
    const blockEl = document.querySelector(`div[name="${blockIdString}"]`);
    while(blockEl.firstChild){
        blockEl.removeChild(blockEl.firstChild); //will this cause problems if child elements have children?
    }
    blockEl.parentElement.removeChild(blockEl);
}


//TODO add back button


function editBlock (blockIdString){

}

function saveBlockEdit(){

}

function returnBlockEdit(){

}

function updateBlocksSaveEdit(){

}


function connectBlock(){

}

//block button event listeners
const addBlockBtn = document.querySelector("#addBlockBtn");
addBlockBtn.addEventListener("click", addBlock);





//need to add this
function deleteProject(){

}
