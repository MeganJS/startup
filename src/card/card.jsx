import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import "./card.css";
import { CardObj, ProjectObj} from '../project/projectAndCard.js';

//components on this page: card type, card image, card name, card text (all loaded from database)
//TODO need a way to load certain card based on what was clicked - talk to TA
export function Card(props) {
  let curCard = getCardInfo().cardObj;
  const [card, setCard] = React.useState(curCard);
  {/*
  const [cardType, setType] = React.useState(card.type);
  const [cardImage, setImage] = React.useState(card.image);
  const [cardTitle, setTitle] = React.useState(card.title);
  const [cardText, setText] = React.useState(card.text);
  */}

  {/*
  useEffect(() => {
    let cardObj = getCardInfo();
    console.log(cardObj);
    setType(cardObj.type);
    console.log(cardObj.type);
    setImage(cardObj.image);
    setTitle(cardObj.title);
    setText(cardObj.text); 
  }, []);
  */}
  return (
    <main>
      <div className="all">
        <button type="submit" className="return-to-project">
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
              <button id="delete-button" type="button" className="btn btn-outline-danger btn-sm">delete card</button>
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