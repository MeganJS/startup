import React from 'react';
import "./project.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
  
  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  useEffect(() => {
    const cList = getCardList();
    if (cList) {
        setCardList(cList);
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
        <section id="shared">
          <b>Shared with:</b>
          <ul className="list-group">
            <li className="list-group-item">
              A. P. Eerson
              <button type="submit">unshare</button>
            </li>
            <li className="list-group-item" id="share-with">
              <p>Add:</p>
              <div className="dropdown">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ____________
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">A. P. Eerson</a></li>
                  <li><a className="dropdown-item" href="#">Mr. Frogdatterson</a></li>
                  <li><a className="dropdown-item" href="#">Donna Noble</a></li>
                </ul>
              </div>
              <button type="submit"><a href="project.html">submit</a></button>
            </li>
          </ul>
        </section>
        <button type="button" className="btn btn-outline-danger">delete project</button>
      </div>
    </main>
  );
}

function getSharedList() {
  let sharedList = [A. P. Eerson];
  return sharedList;
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