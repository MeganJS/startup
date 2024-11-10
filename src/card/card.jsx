import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import "./card.css";

export function Card() {
  return (
    <main>
      <div className="all">
        <button type="submit" className="return-to-project">
            <NavLink className='nav-link' to='/project'>Return to Project</NavLink>
        </button>
        <div className="card-content">
        <section id="card-data">
          
          <div id="card-type">
            Character Card
          </div>
          <div id="card-image">
            <img alt="dolphin" src="images/dolphin.png" />
          </div>
          <div id="card-name">
            <h3>Agent Squeaker</h3>
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
                          Agent Squeaker started training very young - as a jazz musician. Now that the music club cabal have swept that career off the deck, 
                          she's joined up with the task force bent on taking them down - with the help of some friends... 
                      </p>
                  </div>
              </section>
        </div>
      </div>
    </main>
  );
}