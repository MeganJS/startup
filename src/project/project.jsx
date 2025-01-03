import React from 'react';
import "./project.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardObj, ProjectObj} from './projectAndCard.js';
import SharedWith from './sharedWith.jsx';

//TODO need a way to sanitize user input
function ProjectCard({cardObj, shared}){
  function setCurCard(card){
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
          {shared === false && (
            <NavLink className='nav-link' to='/Card' onClick={()=>setCurCard(cardObj)}>view card</NavLink>
          )}
          {shared === true && (
            <NavLink className='nav-link' to='/card-shared' onClick={()=>setCurCard(cardObj)}>view card</NavLink>
          )}
        </div>
      </div>
    </div>
  );
}


export function Project(props) {
  const blankCard = new CardObj("NEW CARD",`plus-circle.svg`, "---","");
  console.log(props.shared);
  const shared = props.shared;
  const username = props.username;
  {/*localStorage.setItem('currentCard',JSON.stringify(blankCard));*/}
  let proj = getCurProject();
  const [project, setProject] = React.useState(proj);
  const [cards, setCardList] = React.useState(proj.cardList);
  const [saveMsg, setSaveMsg] = React.useState("");
  
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

  async function createNewCard(bCard) {
    console.log("new card");

    let projectList = getProjectList();
    let cProject = { ...project }
    let cCardList = cards.slice()

    for (const pCard of cProject.cardList) {
      if (pCard.title === bCard.title){
        bCard.title = bCard.title + '+';
      }
    }
    cCardList.push(bCard);

    if (projectList) {
      for (const proj of projectList) {
        if (proj.title === cProject.title) {
          proj.cardList = cCardList;
          localStorage.setItem("currentProject",JSON.stringify(proj));
          setProject(proj);
        }
      }

      cProject.cardList = cCardList;
      localStorage.setItem('projects',JSON.stringify(projectList));
      localStorage.setItem('currentCard',JSON.stringify(bCard));
      setCardList(cCardList);

      let saveResult = saveProjectChange(projectList);
      if (saveResult !== "success"){
        setSaveMsg(saveResult);
      }
    }
  }

  async function deleteProject(){
    let projectListStr = localStorage.getItem('projects');
    let cProject = { ...project }
    if (projectListStr) {
      let projectList = JSON.parse(projectListStr);
      let cProjectList = projectList.slice();
      for (const proj of projectList) {
        if (proj.title === cProject.title) {
          console.log("same");
          let ind = cProjectList.indexOf(proj);
          //console.log(ind);
          cProjectList.splice(ind,1);
          sendDeleteProj(proj);
        }
      }
      let blankProject = new ProjectObj("Idea Title",[],[]);
      localStorage.setItem("currentProject",JSON.stringify(blankProject));
      localStorage.setItem('projects',JSON.stringify(cProjectList));
      let saveResult = await saveProjectChange(cProjectList);
      if (saveResult !== "success"){
        setSaveMsg(`${saveResult}`);
      }
    }
  }

  async function sendDeleteProj(project){
    const shared = project.sharedList;
    for (const sh of shared) {
      //console.log(sh);
      await fetch('/api/shared', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({userToRemove: sh, title: project.title, sharedby: props.username}),
      });
    }
  }

  const cardComps = [];
  if (cards.length) {
    for (const card of cards) {
      cardComps.push(
        <ProjectCard cardObj={card} shared={shared} username={username}></ProjectCard>
      );
    }
  }

  return (
    <main>
      <section id="project-content">
        <ProjectTitle title={project.title} shared={shared} username={username}></ProjectTitle>
          {/*<h2 id="project-title">{project.title}</h2>
          <div id="project-controls">
              <div className="dropdown">
                  Sort by:
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Date of Creation
                  </button>
                  <ul className="dropdown-menu">
                    <li key="Card Type"><a className="dropdown-item" href="#">Card Type</a></li>
                    <li key="Date"><a className="dropdown-item" href="#">Date of Creation</a></li>
                    <li key="Alphabet"><a className="dropdown-item" href="#">Alphabet Order</a></li>
                  </ul>
              </div>
          </div>
          */}
          <div style={{color:"red"}}>{saveMsg}</div>
          <section id="project-cards">
            {cardComps}
            {shared === false && (
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
            )}
          </section>
      </section>
      {shared === false && (
      <div id="project-controls">
        {/*
        <button type="button" className="btn btn-outline-info">download project</button>
        */}
        <SharedWith username={props.username}></SharedWith>

        <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
          delete project
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
      )}
    </main>
  );
}


function ProjectTitle({title, shared, username}){
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

  async function sendSavedProj(oldTitle, project){
    const shared = project.sharedList;
    const shProject = {
      title: project.title,
      sharedby: props.username,
      cardList: project.cardList
    }
    for (const sh of shared) {
      //console.log(sh);
      await fetch('/api/shared', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({userToUpdate: sh, title: oldTitle, sharedby: username, shProject: shProject}),
      });
    }
  }

  async function saveTitle(newTitle){
    let projectListStr = localStorage.getItem('projects');
    let project = getCurProject();
    let oldTitle = project.title;
    if (projectListStr) {
      let projectList = JSON.parse(projectListStr);
      for (const proj of projectList) {
        if (proj.title === project.title) {
          proj.title = newTitle;
          localStorage.setItem("currentProject",JSON.stringify(proj));
          localStorage.setItem('projects',JSON.stringify(projectList));
          let saveResult = saveProjectChange(projectList);
          if (saveResult !== "success"){
            setMessage(`Could not save project: ${saveResult}`);
          }
          sendSavedProj(oldTitle, proj);
        }
      }
    }
  }

  return(
    <h2 id="project-title">
      {title}
      {shared === false && (
        <h3>
          <img src="pencil-square.svg" data-bs-toggle="modal" data-bs-target="#editTitleModal"></img>
        </h3>
      )}
      {shared === false && (
        <div className="modal fade" id="editTitleModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="editTitleModal" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">edit title</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                </div>
                <div className="modal-body">
                  <div className="input-group mb-3">
                    <button onClick={()=>saveChange()} className="btn btn-outline-secondary" type="button" id="button-addon1">save</button>
                    <input onChange={(i)=>changeText(i)} type="text" className="form-control" defaultValue={title} placeholder={title} aria-label="save button for title edit" />
                  </div>
                  <p>{message}</p>
                </div>
              </div>
            </div>
          </div>
      )}
    </h2>
  );
}

async function saveProjectChange(newList) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newList),
  });
  if (response?.status === 200) {
    console.log("successfully saved project change");
    return "success";
  } else {
    const body = await response.json();
    console.log(body.msg);
    return body.msg;
    //setDisplayError(`Error Ocurred: ${body.msg}`);
  }
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