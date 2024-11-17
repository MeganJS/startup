import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import "./card.css";

//components on this page: card type, card image, card name, card text (all loaded from database)
//TODO need a way to load certain card based on what was clicked - talk to TA
export function Card() {
  const [cardType, setType] = React.useState('Card');
  const [cardImage, setImage] = React.useState('images/Question.png');
  const [cardTitle, setTitle] = React.useState('Loading...');
  const [cardText, setText] = React.useState('Loading...');
  useEffect(() => {
    let cardObj = getCardInfo();
    console.log(cardObj);
    setType(cardObj.cType);
    setImage(cardObj.cImage);
    setTitle(cardObj.cTitle);
    setText(cardObj.cText); 
  }, []);

  return (
    <main>
      <div className="all">
        <button type="submit" className="return-to-project">
            <NavLink className='nav-link' to='/project'>Return to Project</NavLink>
        </button>
        <div className="card-content">
        <section id="card-data">
          
          <div id="card-type">
            {cardType}
          </div>
          <div id="card-image">
            <img alt={cardImage} src={cardImage} />
          </div>
          <div id="card-name">
            <h3>{cardTitle}</h3>
          </div>
          {/*
          <div id="card-tags">
              Tags:
              <span>Samosed Maat --</span>
              <span>Tree Place Hollow Ground (Sea) --</span>
              <span>The Evil Overlords (musical piece) --</span>
              
          </div>
          */}
          <button type="submit">
                <NavLink className='nav-link' to='/card-edit'>edit</NavLink>
          </button>
        </section>
  
        <section id="card-text">
                  <div>
                      <p>
                         { cardText }
                      </p>
                  </div>
              </section>
        </div>
      </div>
    </main>
  );
}

function getCardInfo(){
  return JSON.parse(localStorage.getItem('currentCard'));
  const cardObj = {
    cType: "Character",
    cImage: `dolphin.png`,
    cTitle: "Agent Squeaker",
    cText: "Agent Squeaker started training very young - as a jazz musician. Now that the music club cabal have swept that career off the deck, she's joined up with the task force bent on taking them down - with the help of some friends... "
  };
  return cardObj;
}