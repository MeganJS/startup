import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import "../card/card.css";

export function CardEdit() {
  return (
    <main>
        <section id="card-data">
            <button type="submit">
                <NavLink className='nav-link' to='/card'>save</NavLink>
            </button>

            <div className="dropdown">
                Card Type:
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Character
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Character</a></li>
                    <li><a className="dropdown-item" href="#">Object</a></li>
                    <li><a className="dropdown-item" href="#">Setting</a></li>
                </ul>
            </div>   
            <div id="card-image">
                <img alt="dolphin" src="images/dolphin.png" />
            </div>
            <div>
                <input type="text" id="card-name" name="card-name" value="Agent Squeaker" />
            </div>
            {/*
            <div id="card-tags">
                <b>tags:</b>
                <ul className="list-group" id="tag-list">
                    <li className="list-group-item" style="max-height: 50px; padding: 4px">
                        Samosed Maat
                        <button type="submit">x</button>
                    </li>
                            
                    <li className="list-group-item" style="max-height: 50px; padding: 4px">
                        Tree Place Hollow Ground Sea
                        <button type="submit">x</button>
                    </li>
                    <li className="list-group-item" style="max-height: 50px; padding: 4px">
                        The Evil Overlords - musical piece
                        <button type="submit">x</button>
                    </li>
                    <li className="list-group-item" id="add-tag" style="display:inline; padding: 4px;">
                        <p>Add:</p>
                        <div className="dropdown">
                            <a className="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ____________
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Button of Doom</a></li>
                                <li><a className="dropdown-item" href="#">The Arctic Sea</a></li>
                            </ul>
                            <button type="submit" style="display:inline;">submit</button>
                            </div>
                    </li>
                </ul>
            </div>
            */}
        </section>

        <section>
            <div className="mb-3" id="card-text-edit">
                <span className="textarea" id="textarea-card-edit" role="textbox" contenteditable>
                    Agent Squeaker started training very young - as a jazz musician. Now that the music club cabal have swept that career off the deck, 
                    she's joined up with the task force bent on taking them down - with the help of some friends... 
                </span>
            </div>
        </section>
    </main>
  );
}