import React from 'react';
import "./project.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export function Project() {
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
              <div className="card" id="project-card">
                        <div className="card-body">
                            <img id = "card-img" alt="smile icon" src="images/smile icon.png" />
                          <h5 className="card-title">Agent Squeaker</h5>
                          <h6 className="card-subtitle mb-2 text-body-secondary">Character</h6>
                          <p className="card-text">Agent Squeaker started training very young - as a jazz musician. Now that the music club cabal have swept that career off the deck, 
                            she's joined up with the task force bent on taking them down - with the help of some friends... </p>
                          <div id="card-footer">
                            <NavLink className='nav-link' to='/Card'>view card</NavLink>
                          </div>
                        </div>
                    </div>
                    <div className="card" id="project-card">
                        <div className="card-body">
                            <img alt="button icon" src="images/button icon.png" />
                          <h5 className="card-title">Button of DOOM</h5>
                          <h6 className="card-subtitle mb-2 text-body-secondary">Item</h6>
                          <p className="card-text"></p>
                          <div id="card-footer">
                            <NavLink className='nav-link' to='/card'>view card</NavLink>
                          </div>
                        </div>
                    </div>
                    <div className="card" id="project-card">
                        <div className="card-body">
                            <img alt="setting icon" src="images/setting icon.png" />
                          <h5 className="card-title">The Arctic Sea</h5>
                          <h6 className="card-subtitle mb-2 text-body-secondary">Setting</h6>
                          <p className="card-text"></p>
                          <div id="card-footer">
                            <NavLink className='nav-link' to='/card'>view card</NavLink>
                          </div>
                        </div>
                    </div>
                    <div className="card" id="project-card-new">
                        <div className="card-body">
                            <img id = "card-img" alt="plus icon" src="images/plus-circle.svg" />
                          <h5 className="card-title">New Card</h5>
                          <h6 className="card-subtitle mb-2 text-body-secondary">---</h6>
                          <p className="card-text"></p>
                          <div id="card-footer">
                            <NavLink className='nav-link' to='/card'>view card</NavLink>
                          </div>
                        </div>
                    </div>
          </section>
          </section>
          <div id="project-controls">
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
                </div>
    </main>
  );
}