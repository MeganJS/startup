import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import "./card.css";
import { CardObj, ProjectObj} from '../project/projectAndCard.js';

//components on this page: card type, card image, card name, card text (all loaded from database)
//TODO need a way to load certain card based on what was clicked - talk to TA
export function Card(props) {
  {/*const blankCard = new CardObj("NEW CARD",`plus-circle.svg`, "---","");*/}
  let curCard = getCardInfo();
  const [card, setCard] = React.useState(curCard);

  useEffect(() => {
    let curCard = getCardInfo();
    setCard(curCard);
  }, []);


  function deleteCard() {
    let projectList = getProjectList();
    let project = getCurProject()
    let cProject = { ...project }
    let cCardList = cProject.cardList.slice()
    let cProjectList = projectList.slice();
    for (const proj of projectList) {
      if (proj.title === cProject.title) {
        console.log("same");
        let ind = cProjectList.indexOf(proj);
        console.log(ind);
        cProjectList.splice(ind,1);
      }
    }
    let ind = cCardList.indexOf(card);
    cCardList.splice(ind,1);
    cProject.cardList = cCardList;
    cProjectList.push(cProject);
    localStorage.setItem("currentProject",JSON.stringify(cProject));
    localStorage.setItem('projects',JSON.stringify(cProjectList));
    localStorage.setItem('currentCard',JSON.stringify(blankCard));
    setCard(blankCard);
  }


  return (
    <main>
      <div className="all">
        <button type="submit" id="return-to-project" className="btn btn-outline-primary btn-sm">
            <NavLink className='nav-link' to='/project'>Return to Project</NavLink>
        </button>
        <div className="card-content">
          <section id="card-data">
            <div id="card-type">
              {card.type}
            </div>
            <div id="card-image">
              <img alt="card-image" src={card.image} />
            </div>
            <div id="card-name">
              <h3>{card.title}</h3>
            </div>
            {/*
            <div id="card-tags">
                Tags:
                <span>Samosed Maat --</span>
                <span>Tree Place Hollow Ground (Sea) --</span>
                <span>The Evil Overlords (musical piece) --</span>
                
            </div>
            */}
            <div id="card-control-buttons">
              <button id="edit-button" type="button" className="btn btn-outline-primary btn-sm">
                <NavLink className='nav-link' to='/card-edit'>edit</NavLink>
              </button>
              <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                delete card
              </button>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">delete?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                      </div>
                      <div className="modal-body">
                        Please Note: This action cannot be undone.
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">no, do not delete</button>
                        <button type="button" className="btn btn-danger" onClick={()=>deleteCard()} data-bs-dismiss="modal">yes, delete card</button>
                      </div>
                    </div>
                  </div>
                </div>

            </div>
          </section>
  
          <section id="card-text">
            <div>
              <p>
                {card.text}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

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

function getCardInfo(){
  const cardStr = localStorage.getItem('currentCard');
  const cardObject = JSON.parse(cardStr);

  {/*
  const cardObj = {
    cType: "Character",
    cImage: `dolphin.png`,
    cTitle: "Agent Squeaker",
    cText: "Agent Squeaker started training very young - as a jazz musician. Now that the music club cabal have swept that career off the deck, she's joined up with the task force bent on taking them down - with the help of some friends... "
  };
  return cardObj;
  */}
  return cardObject;
}