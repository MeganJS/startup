import React from 'react';
import "./project.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

//TODO need a way to sanitize user input
//TODO load project cards from storage - use map?
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


//cards
export function Project() {
  const [cards, setCardList] = React.useState([]);
  const [sharedList, setSharedList] = React.useState([]);
  
  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  useEffect(() => {
    const cList = getCardList();
    const sList = getSharedList();
    if (cList) {
      setCardList(cList);
    }
    if (sList) {
      setSharedList(sList);
    }
  }, []);

  const blankCard= {
    title: "NEW CARD",
    type: "---",
    image: 'images/plus-circle.svg',
    text: ""
  }
  // Demonstrates rendering an array with React
  const cardComps = [];
  if (cards.length) {
    for (const card of cards) {
      cardComps.push(
        <ProjectCard cardObj={card}></ProjectCard>
      );
    }
  }
  cardComps.push(
    <ProjectCard cardObj={blankCard}></ProjectCard>
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

function getCardList() {
  const cObj1= {
    title: "Button of DOOM",
    type: "Item",
    image: 'images/button icon.png',
    text: "no one knows where this came from, and no one knows what it does. would you be the first to press it?"
  }
  const cObj2= {
    title: "Agent Squeaker",
    type: "Character",
    image: 'images/dolphin.png',
    text: "Agent Squeaker started training very young - as a jazz musician. Now that the music club cabal have swept that career off the deck, she's joined up with the task force bent on taking them down - with the help of some friends... "
  }
  const cObj3= {
    title: "The Arctic Sea",
    type: "Setting",
    image: 'images/setting icon.png',
    text: "Surprisingly quite cozy, once you get used to it. The seedy underbelly of the seafloor is nothing to laugh at, of course..."
  }
  const cList = [cObj1,cObj2,cObj3];
  return cList;
}