import React from 'react';
import "./project.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardObj, ProjectObj} from './projectAndCard.js';

//TODO need a way to sanitize user input
//TODO load project cards from storage - use map?
//TODO add delete functionality
//TODO fix shared with functionality
function ProjectCard({cardObj}){
  function setCurCard(card){
    console.log("frogs");
    localStorage.setItem('currentCard',JSON.stringify(card));
  }
  return(
    <div className="card" id="project-card">
      <div className="card-body">
        <img id = "card-img" alt="smile icon" src={cardObj.image} />
        <h5 className="card-title">{cardObj.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{cardObj.type}</h6>
        <p className="card-text">{cardObj.text}</p>
        <div id="card-footer">
          <NavLink className='nav-link' to='/Card' onClick={()=>setCurCard({cardObj})}>view card</NavLink>
        </div>
      </div>
    </div>
  );
}


export function Project(props) {
  const blankCard = new CardObj("NEW CARD",`plus-circle.svg`, "---","");
  {/*localStorage.setItem('currentCard',JSON.stringify(blankCard));*/}
  let proj = getCurProject();
  const [project, setProject] = React.useState(proj);
  const [cards, setCardList] = React.useState(proj.cardList);
  
  {/*
  useEffect(() => {
    const project = getCurProject();
    const cList = project.cardList;
    if (project) {
      setProject(project);
    }
    if (cList) {
      setCardList(cList);
    }
  }, []);
  */}

  function createNewCard(bCard) {
    console.log("frogs");
    let projectListStr = localStorage.getItem('projects');
    let cProject = { ...project }
    let cCardList = cards.slice()
    if (projectListStr) {
      let projectList = JSON.parse(projectListStr);
      let cProjectList = projectList.slice();
      for (const proj of projectList) {
        if (proj.title === cProject.title) {
          console.log("same");
          let ind = cProjectList.indexOf(proj);
          console.log(ind);
          cProjectList.splice(ind,1);
        }
      }
      cCardList.push(bCard);
      cProject.cardList = cCardList;
      setProject(cProject);
      cProjectList.push(cProject);
      localStorage.setItem("currentProject",JSON.stringify(cProject));
      localStorage.setItem('projects',JSON.stringify(cProjectList));
      setProject(blankProject);
      setCardList(blankProject.cardList);
    }
  }

  function deleteProject(){
    let projectListStr = localStorage.getItem('projects');
    let cProject = { ...project }
    if (projectListStr) {
      let projectList = JSON.parse(projectListStr);
      let cProjectList = projectList.slice();
      for (const proj of projectList) {
        if (proj.title === cProject.title) {
          console.log("same");
          let ind = cProjectList.indexOf(proj);
          console.log(ind);
          cProjectList.splice(ind,1);
        }
      }
      let blankProject = new ProjectObj("Idea Title",[],[]);
      localStorage.setItem("currentProject",JSON.stringify(blankProject));
      localStorage.setItem('projects',JSON.stringify(cProjectList));
    }
  }

  const cardComps = [];
  if (cards.length) {
    for (const card of cards) {
      cardComps.push(
        <ProjectCard cardObj={card}></ProjectCard>
      );
    }
  }

  return (
    <main>
      <section id="project-content">
        <ProjectTitle title={project.title}></ProjectTitle>
          {/*<h2 id="project-title">{project.title}</h2>*/}
          <div id="project-controls">
              <div className="dropdown">
                  Sort by:
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Date of Creation
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Card Type</a></li>
                    <li><a className="dropdown-item" href="#">Date of Creation</a></li>
                    <li><a className="dropdown-item" href="#">Alphabet Order</a></li>
                  </ul>
              </div>
          </div>
          <section id="project-cards">
            {cardComps}
            <div className="card" id="project-card">
              <div className="card-body">
                <img id = "card-img" alt="smile icon" src={blankCard.image} />
                <h5 className="card-title">{blankCard.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{blankCard.type}</h6>
                <p className="card-text">{blankCard.text}</p>
                <div id="card-footer">
                  <NavLink className='nav-link' to='/Card' onClick={()=>createNewCard(blankCard)}>create</NavLink>
                </div>
              </div>
            </div>
          </section>
      </section>
      <div id="project-controls">
        <button type="button" className="btn btn-outline-info">download project</button>
        <SharedWith></SharedWith>

        <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
          delete project
        </button>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">delete project?</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
              </div>
              <div className="modal-body">
                please note: this action cannot be undone
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">no, do not delete</button>
                <button type="button" className="btn btn-danger" onClick={()=>deleteProject()} data-bs-dismiss="modal">yes, delete project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


function ProjectTitle({title}){
  const [inputValue,setInputValue] = React.useState({title});
  const [message,setMessage] = React.useState("");

  const changeText = (i) => {
    setInputValue(i.target.value);
  }

  const saveChange = () => {
    const prList = getProjectList();
    for (const proj of prList) {
      if (proj.title === inputValue){
        if (inputValue !== title){
          setMessage("title must be distinct from other idea titles");
          return;
        }
      }
    }
    saveTitle(inputValue);
    setMessage("saved! refresh page to see new title");
  }

  function saveTitle(newTitle){
    let projectListStr = localStorage.getItem('projects');
    let project = getCurProject();
    let cProject = { ...project }
    if (projectListStr) {
      let projectList = JSON.parse(projectListStr);
      let cProjectList = projectList.slice();
      for (const proj of projectList) {
        if (proj.title === cProject.title) {
          console.log("same");
          let ind = cProjectList.indexOf(proj);
          console.log(ind);
          cProjectList.splice(ind,1);
        }
      }
      cProject.title = newTitle;
      cProjectList.push(cProject);
      localStorage.setItem("currentProject",JSON.stringify(cProject));
      localStorage.setItem('projects',JSON.stringify(cProjectList));
    }
  }

  return(
    <h2 id="project-title">
      {title}
      <h3>
        <img src="pencil-square.svg" data-bs-toggle="modal" data-bs-target="#editTitleModal"></img>
      </h3>

      <div className="modal fade" id="editTitleModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="editTitleModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">edit title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
              </div>
              <div className="modal-body">
                <div class="input-group mb-3">
                  <button onClick={()=>saveChange()} class="btn btn-outline-secondary" type="button" id="button-addon1">save</button>
                  <input onChange={(i)=>changeText(i)} type="text" class="form-control" defaultValue={title} placeholder={title} aria-label="save button for title edit" />
                </div>
                <p>{message}</p>
              </div>
            </div>
          </div>
        </div>
    </h2>
  );
}

function SharedWith(){
  const sList = getSharedList();
  const frList = getFriendList();
  const [sharedList, setSharedList] = React.useState(sList);
  const [friendList, setFriendList] = React.useState(frList);
  const [shareVal, setShareVal] = React.useState("__________");

  {/*
  useEffect(() => {
    const sList = getSharedList();
    if (sList) {
      setSharedList(sList);
    }
    const frList = getFriendList();
    if (frList) {
      setFriendList(frList);
    }
  }, []);
  */}

  function changeShareVal(friend){
    setShareVal(friend);
  }

  function addToSharedList(shareVal){
    for (const shared of sharedList) {
      if (shared === shareVal) {
        return;
      }
    }
    const newShare = sharedList.slice();
    newShare.push(shareVal);
    setSharedList(newShare);
    updateSharedList(newShare);
  }

  function removeShareVal(shareVal){
    const newShare = sharedList.slice();
    let ind = sharedList.indexOf(shareVal);
    newShare.splice(ind,1);
    console.log(newShare);
    setSharedList(newShare);
    updateSharedList(newShare);
  }

  const sharedComps = [];
  if (sharedList.length) {
    for (const shared of sharedList) {
      sharedComps.push(
        <li className="list-group-item">
          {shared}
          <button className="btn btn-outline-secondary btn-sm" type="submit" onClick={()=>removeShareVal(shared)}>unshare</button>
        </li>
      );
    }
  }

  const friendComps = [];
  if (friendList.length) {
    for (const friend of friendList) {
      friendComps.push(
        <li><a className="dropdown-item" href="#" onClick={()=>changeShareVal(friend)}>{friend}</a></li>
      );
    }
  }

  return (
    <section id="shared">
      <b>Shared with:</b>
      <ul className="list-group">
        {sharedComps}
        <li className="list-group-item" id="share-with">
          <p>Add:</p>
          <div className="dropdown">
            <a className="btn btn-dark btn-sm dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {shareVal}
            </a>
            <ul className="dropdown-menu">
              {friendComps}
            </ul>
          </div>
          <button className="btn btn-outline-secondary btn-sm" type="submit" onClick={()=>addToSharedList(shareVal)}>submit</button>
        </li>
      </ul>
    </section>
  );
}



function getSharedList() {
  const projectStr = localStorage.getItem('currentProject');
  if (projectStr) {
      return JSON.parse(projectStr).sharedList;
  }
  return [];
}


function updateSharedList(sharedList) {
    let projectListStr = localStorage.getItem('projects');
    let project = getCurProject();
    let cProject = { ...project }
    if (projectListStr) {
      let projectList = JSON.parse(projectListStr);
      let cProjectList = projectList.slice();
      for (const proj of projectList) {
        if (proj.title === cProject.title) {
          console.log("same");
          let ind = cProjectList.indexOf(proj);
          console.log(ind);
          cProjectList.splice(ind,1);
        }
      }
      cProject.sharedList = sharedList;
      cProjectList.push(cProject);
      localStorage.setItem("currentProject",JSON.stringify(cProject));
      localStorage.setItem('projects',JSON.stringify(cProjectList));
    }
  }

function getFriendList() {
  const frList = localStorage.getItem('friendList');
  if (frList) {
      return JSON.parse(frList);
  }
  return [];
}
{/* turns out the folder needs to be named public*/}
function getCurProject(){
  let curProjectStr = localStorage.getItem('currentProject');
  let curProj = JSON.parse(curProjectStr);
  return curProj;
}

function getProjectList(){
  let projectListStr = localStorage.getItem('projects');
  let projectList = JSON.parse(projectListStr);
  return projectList;
}

function getCardList() {
  let curProjectStr = localStorage.getItem('currentProject');
  let curProj = JSON.parse(curProjectStr);
  return curProj.cardList;
  {/*
  const cObj1= {
    title: "Button of DOOM",
    type: "Item",
    image: `button icon.png`,
    text: "no one knows where this came from, and no one knows what it does. would you be the first to press it?"
  }
  const cObj2= {
    title: "Agent Squeaker",
    type: "Character",
    image: `dolphin.png`,
    text: "Agent Squeaker started training very young - as a jazz musician. Now that the music club cabal have swept that career off the deck, she's joined up with the task force bent on taking them down - with the help of some friends... "
  }
  const cObj3= {
    title: "The Arctic Sea",
    type: "Setting",
    image: `setting icon.png`, 
    text: "Surprisingly quite cozy, once you get used to it. The seedy underbelly of the seafloor is nothing to laugh at, of course..."
  }
  const cList = [cObj1,cObj2,cObj3];
  return cList;
  */}
}