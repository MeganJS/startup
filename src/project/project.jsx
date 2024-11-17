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
  return(
    <div className="card" id="project-card">
      <div className="card-body">
        <img id = "card-img" alt="smile icon" src={cardObj.image} />
        <h5 className="card-title">{cardObj.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{cardObj.type}</h6>
        <p className="card-text">{cardObj.text}</p>
        <div id="card-footer">
          <NavLink className='nav-link' to='/Card'>view card</NavLink>
        </div>
      </div>
    </div>
  );
}


export function Project(props) {
  const blankCard = new CardObj("NEW CARD",`plus-circle.svg`, "---","");
  localStorage.setItem('currentCard',JSON.stringify(blankCard));
  const [project, setProject] = React.useState(new ProjectObj());
  const [cards, setCardList] = React.useState([]);
  const [sharedList, setSharedList] = React.useState([]);
  
  useEffect(() => {
    const project = getCurProject();
    const cList = project.cardList;
    const sList = project.sharedList;
    if (project) {
      setProject(project);
    }
    if (cList) {
      setCardList(cList);
    }
    if (sList) {
      setSharedList(sList);
    }
  }, []);

  function setCurCard(card){
    localStorage.setItem('currentCard',JSON.stringify(card));
  }

  function createNewCard(bCard) {
    let projectListStr = localStorage.getItem('projects');
    if (projectListStr) {
      let projectList = JSON.parse(projectListStr);
      projectList.filter((p) => p !== project);
      project.addCard(bCard);
      projectList.push(project);
      localStorage.setItem("currentProject",JSON.stringify(project));
      localStorage.setItem('projects',JSON.stringify(projectList));
    }
  }



  const cardComps = [];
  if (cards.length) {
    for (const card of cards) {
      cardComps.push(
        <ProjectCard cardObj={card} onClick={()=>setCurCard(card)}></ProjectCard>
      );
    }
  }
  cardComps.push(
    <ProjectCard cardObj={blankCard} onClick={()=>createNewCard(blankCard)}></ProjectCard>
  );

  const sharedComps = [];
  if (sharedList.length) {
    for (const shared of sharedList) {
      sharedComps.push(
        <li className="list-group-item">
          {shared}
          <button className="btn btn-outline-secondary btn-sm" type="submit">unshare</button>
        </li>
      );
    }
  }

  return (
    <main>
      <section id="project-content">
          <h2 id="project-title">Dolphins=evil???</h2>
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
          </section>
      </section>
      <div id="project-controls">
        <button type="button" className="btn btn-outline-info">download project</button>
        <SharedWith></SharedWith>
        <button type="button" className="btn btn-outline-danger">delete project</button>
      </div>
    </main>
  );
}

function SharedWith(){
  const [sharedList, setSharedList] = React.useState([]);
  const [friendList, setFriendList] = React.useState([]);
  const [shareVal, setShareVal] = React.useState("__________");

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
  const sharedList = localStorage.getItem('sharedList');
  if (sharedList) {
      return JSON.parse(sharedList);
  }
  return [];
}

function updateSharedList(sharedList) {
  localStorage.setItem('sharedList', JSON.stringify(sharedList));
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