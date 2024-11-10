import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import "../card/card.css";

export function CardEdit() {
  return (
    <main>
      <div className="all">
        <button type="submit" className="return-to-project">
            <NavLink className='nav-link' to='/project'>Return to Project</NavLink>
        </button>
        <div className="card-content">
        <section id="card-data">
                <button type="submit">
                    <NavLink className='nav-link' to='/card'>save</NavLink>
                </button>

                <div class="dropdown">
                    Card Type:
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Character
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Character</a></li>
                      <li><a class="dropdown-item" href="#">Object</a></li>
                      <li><a class="dropdown-item" href="#">Setting</a></li>
                    </ul>
                </div>
                
                <div id="card-image"><img alt="dolphin" src="images/dolphin.png" /></div>

                <div>
                    <input type="text" id="card-name" name="card-name" value="Agent Squeaker" />
                </div>
                
                
                <div id="card-tags">
                    <b>tags:</b>
                        <ul class="list-group" id="tag-list">
                            <li class="list-group-item" style="max-height: 50px; padding: 4px">
                                Samosed Maat
                                <button type="submit">x</button>
                            </li>
                            
                            <li class="list-group-item" style="max-height: 50px; padding: 4px">
                                Tree Place Hollow Ground (Sea)
                                <button type="submit">x</button>
                            </li>
                            <li class="list-group-item" style="max-height: 50px; padding: 4px">
                                The Evil Overlords (musical piece)
                                <button type="submit">x</button>
                            </li>
                            <li class="list-group-item" id="add-tag" style="display:inline; padding: 4px;">
                                <p>Add:</p>
                                <div class="dropdown">
                                    <a class="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ____________
                                    </a>
                                    <ul class="dropdown-menu">
                                      <li><a class="dropdown-item" href="#">Button of Doom</a></li>
                                      <li><a class="dropdown-item" href="#">The Arctic Sea</a></li>
                                    </ul>
                                    <button type="submit" style="display:inline;">submit</button>
                                  </div>
                            </li>
                        </ul>
                </div>
            </section>

            <section>
                <div class="mb-3" id="card-text-edit">
                    <span class="textarea" id="textarea-card-edit" role="textbox" contenteditable>
                        Agent Squeaker started training very young - as a jazz musician. Now that the music club cabal have swept that career off the deck, 
                        she's joined up with the task force bent on taking them down - with the help of some friends... 
                    </span>
                </div>
            </section>
        </div>
      </div>
    </main>
  );
}